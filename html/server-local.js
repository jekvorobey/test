const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');
const Config = require('merge-config');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const httpProxy = require('express-http-proxy');
const gracefulShutdown = require('http-graceful-shutdown');

const LRUCache = require('lru-cache');
const favicon = require('serve-favicon');
const compression = require('compression');
const routeCache = require('route-cache');

const expressVersion = require('express/package.json').version;
const serverRendererVersion = require('vue-server-renderer/package.json').version;
const { createBundleRenderer } = require('./build/custom-vue-server-renderer');

const isProd = process.env.NODE_ENV === 'production';
const serverInfo = `express/${expressVersion} vue-server-renderer/${serverRendererVersion}`;
const ServerLogger = require('./src/services/LogService/ServerLogger');

const logger = new ServerLogger();
const setupDevServer = require('./build/setup-dev-server');

const resolve = (file) => path.resolve(__dirname, file);
const urlRegex = /\/$/;

const os = require('os');
const cluster = require('cluster');

const serve = (resourcePath, cache) =>
    express.static(resolve(resourcePath), {
        maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 365 : 0,
    });

const proxy = (proxyConfig) => {
    let rewriteRules = [];

    if (typeof proxyConfig.rewrite !== 'undefined' && isValidRewriteConfig(proxyConfig.rewrite)) {
        rewriteRules = parsePathRewriteRules(proxyConfig.rewrite);
    }

    if (typeof proxyConfig.originalPath !== 'undefined') {
        logger.warn('"originalPath" is deprecated. Use "rewrite" instead');
    }

    return httpProxy(proxyConfig.host, {
        proxyReqPathResolver: (req) => {
            if (typeof proxyConfig.originalPath !== 'undefined') {
                const parts = req.url.split('?');
                const queryString = parts[1];

                return `${proxyConfig.originalPath}?${queryString}`;
            }

            if (rewriteRules.length > 0) {
                let result = null;

                for (const rule of rewriteRules) {
                    if (rule.regex.test(req.originalUrl)) {
                        result = req.originalUrl.replace(rule.regex, rule.value);
                        break;
                    }
                }

                if (result !== null) {
                    logger.info('Rewriting path from "%s" to "%s"', req.originalUrl, result);
                    return result;
                }
            }

            return req.originalUrl;
        },
    });
};

function isValidRewriteConfig(rewriteConfig) {
    if (typeof rewriteConfig === 'function') {
        return false;
    } else if (Object.prototype.toString.call(rewriteConfig) == '[object Object]') {
        return Object.keys(rewriteConfig).length !== 0;
    } else if (rewriteConfig === undefined || rewriteConfig === null) {
        return false;
    } else {
        throw new Error('Wrong rewrite config');
    }
}

function parsePathRewriteRules(rewriteConfig) {
    const rules = [];

    if (Object.prototype.toString.call(rewriteConfig) == '[object Object]') {
        for (const [key] of Object.entries(rewriteConfig)) {
            rules.push({
                regex: new RegExp(key),
                value: rewriteConfig[key],
            });

            logger.info('Proxy rewrite rule created: "%s" ~> "%s"', key, rewriteConfig[key]);
        }
    }

    return rules;
}

const app = express();

if (serverRendererVersion !== '2.6.11')
    logger.warn(
        'В файле custom-vue-server-renderer изменен порядок применения тегов стилей для <link> и <style> в методе renderStyles. Необходимо обновить код в файле custom-vue-server-renderer, ибо версия vue-server-renderer изменилась и надо добавить правки'
    );

function createRenderer(bundle, options) {
    logger.info('creating bundle renderer...');
    // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer

    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            // for component caching
            cache: new LRUCache({
                max: 1000,
                maxAge: 1000 * 60 * 15,
            }),
            // this is only needed when vue-server-renderer is npm-linked
            basedir: path.resolve(__dirname),
            // recommended for performance
            runInNewContext: false,
        })
    );
}

let renderer;
let readyPromise;
const templatePath = resolve('./src/index.template.html');
const page502 = fs.readFileSync(resolve('../public/page502.html'), 'utf-8');

if (isProd) {
    // In production: create server renderer using template and built server bundle.
    // The server bundle is generated by vue-ssr-webpack-plugin.
    // The client manifests are optional, but it allows the renderer
    // to automatically infer preload/prefetch links and directly add <script>
    // tags for any async chunks used during render, avoiding waterfall requests.

    const template = fs.readFileSync(templatePath, 'utf-8');
    const bundle = require('../public/assets/vue-ssr-server-bundle.json');
    const clientManifest = require('../public/assets/vue-ssr-client-manifest.json');

    renderer = createRenderer(bundle, {
        template,
        clientManifest,
        inject: false,
        shouldPreload(file, type) {
            // type is inferred based on the file extension.
            // https://fetch.spec.whatwg.org/#concept-request-destination
            if (type === 'script' || type === 'style') return true;
            if (type === 'font') return /\.woff2$/.test(file);
            return false;
        },
    });
} else {
    // In development: setup the dev server with watch and hot-reload,
    // and create a new renderer on bundle / index template update.
    readyPromise = setupDevServer(app, templatePath, (bundle, options) => {
        logger.info('setup dev server...');
        renderer = createRenderer(bundle, options);
    });
}

function render(req, res, env) {
    const s = Date.now();

    const handleError = (err = {}) => {
        if (err.url) {
            logger.warn(`redirect: ${err.url}`);
            res.redirect(err.code || 302, err.url);
        } else {
            // Render Error Page or Redirect
            res.status(500).send(page502);
            logger.error(`error during render: ${req.url}`, err.stack);
        }
    };

    const context = {
        title: 'IBT',
        url: req.url,
        req,
        res,
        env,
        render: {},
    };

    renderer
        .renderToString(context)
        .then((html) => {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Content-Length', html.length);
            res.setHeader('Server', serverInfo);

            res.send(html);
            if (!isProd) logger.success(`whole request: ${Date.now() - s}ms`, req.url);
        })
        .catch(handleError);
}

let env = new Config();
const config = new Config();
let port = 8080;
let host = 'localhost';
let publicPath = '/';
let outputPath = '../public/assets';

let faviconConf = null;
let serviceWorkerConf = null;
let corsConf = null;
let compressionConf = null;

let proxies = [];
let cacheRoutes = [];
let enable = [];
let maxCoreUsage = 8;

const baseConfig = '.env.json';
const configFileName = process.env.CONFIG;
try {
    env.file(resolve(baseConfig));
    if (configFileName) {
        config.file(resolve(configFileName));
        env.merge(config.get());
    }

    env = env.get();
    port = process.env.PORT || env.PORT;
    host = process.env.HOST || env.HOST;
    publicPath = env.PUBLIC_PATH;
    outputPath = env.OUTPUT_PATH;

    faviconConf = env.FAVICON;
    serviceWorkerConf = env.SERVICE_WORKER;
    corsConf = env.CORS;
    compressionConf = env.COMPRESSION;

    enable = env.ENABLE || [];
    proxies = env.PROXIES || [];
    cacheRoutes = env.CACHE_ROUTES || [];

    maxCoreUsage = env.MAX_CORE_USAGE || 8;
} catch (error) {
    logger.error(error);
}

if (corsConf) app.use(cors(corsConf));
if (compressionConf) app.use(compression(compressionConf));
if (faviconConf) app.use(favicon(faviconConf.outputPath));
if (serviceWorkerConf) app.use(serviceWorkerConf.publicPath, serve(serviceWorkerConf.outputPath));

for (let i = 0; i < enable.length; i++) {
    const entry = enable[i];
    app.enable(entry);
}

for (let i = 0; i < proxies.length; i++) {
    const entry = proxies[i];
    logger.info('proxy', `path: ${entry.path}, host: ${entry.host}`);
    app.use(entry.path, proxy(entry));
}

if (isProd) {
    // since this app has no user-specific content, every page is micro-cacheable.
    // if your app involves user-specific content, you need to implement custom
    // logic to determine whether a request is cacheable based on its url and
    // headers.
    // https://www.nginx.com/blog/benefits-of-microcaching-nginx/

    for (let i = 0; i < cacheRoutes.length; i++) {
        const entry = cacheRoutes[i];
        app.use(
            entry.path,
            routeCache.cacheSeconds(entry.time, (req) => req.originalUrl)
        );
    }
}

app.use(publicPath, serve(outputPath, true));
app.use(serve(__dirname, true));
app.use(cookieParser());

app.get('*', (req, res) => {
    let shouldRedirect = false;
    let url = req.path;

    if (!urlRegex.test(url)) {
        url = `${url}/`;
        shouldRedirect = true;
    }

    const params = new URLSearchParams(req.query);
    if (params.has('page')) {
        const value = Number(params.get('page'));

        if (value === 1) {
            params.delete('page');
            shouldRedirect = true;
        }
    }

    if (shouldRedirect) {
        const queryString = params.toString();
        url = queryString ? `${url}?${queryString}` : url;
        return res.redirect(301, url);
    }

    if (isProd) return render(req, res, env);
    return readyPromise.then(() => render(req, res, env));
});

let clusterWorkerSize = os.cpus().length;

if (clusterWorkerSize > maxCoreUsage) {
    clusterWorkerSize = maxCoreUsage;
}

if (clusterWorkerSize > 1) {
    if (cluster.isMaster) {
        for (let i = 0; i < clusterWorkerSize; i++) {
            cluster.fork();
        }

        cluster.on("exit", function(worker) {
            console.log("Worker", worker.id, " has exitted.")
        });
    } else {
        app.listen(port, host, () => logger.success(`server started at ${host}:${port}`));
    }
} else {
    app.listen(port, host, () => logger.success(`server started at ${host}:${port}`));
}
//app.listen(port, host, () => logger.success(`server started at ${host}:${port}`));

function onCleanup(signal) {
    return new Promise((resolve) => {
        logger.info('called signal: ', signal);
        resolve();
    });
}

function onFinally() {
    logger.success('server shutted down');
}

gracefulShutdown(app, {
    signals: 'SIGINT SIGTERM',
    timeout: 30000,
    development: !isProd,
    onShutdown: onCleanup,
    finally: onFinally,
});
