const fs = require('fs');
const path = require('path');
const Config = require('merge-config');
const LRUCache = require('lru-cache');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const httpProxy = require('express-http-proxy');
const request = require('superagent');
const gracefulShutdown = require('http-graceful-shutdown');

const favicon = require('serve-favicon');
const compression = require('compression');
const routeCache = require('route-cache');
const expressVersion = require('express/package.json').version;
const serverRendererVersion = require('vue-server-renderer/package.json').version;
const { createBundleRenderer } = require('./build/custom-vue-server-renderer');

const serverInfo = `express/${expressVersion} vue-server-renderer/${serverRendererVersion}`;
const ServerLogger = require('./src/services/LogService/ServerLogger');

const logger = new ServerLogger();

const resolve = (file) => path.resolve(__dirname, file);

const serve = (resourcePath, cache) =>
    express.static(resolve(resourcePath), {
        maxAge: cache ? 1000 * 60 * 60 * 24 * 365 : 0,
    });

const proxy = (hostname) =>
    httpProxy(hostname, {
        proxyReqPathResolver: (req) => req.originalUrl,
    });

const app = express();
const sites_folder = path.resolve(__dirname, '../../');

if (serverRendererVersion !== '2.6.11')
    logger.warn(
        'В файле custom-vue-server-renderer изменен порядок применения тегов стилей для <link> и <style> в методе renderStyles. Необходимо обновить код в файле custom-vue-server-renderer, ибо версия vue-server-renderer изменилась и надо добавить правки'
    );

function createRenderer(bundle, options) {
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

function render(req, res, env) {
    try {
        let app_root = null;
        const matches = /([^.]+)_front\.ibt-mas\.greensight\.ru/.exec(req.hostname);
        if (!matches || typeof matches[1] === 'undefined') throw new Error('Hostname is not matches by regex');
        app_root = path.resolve(sites_folder, `${matches[1]}_front.ibt-mas.greensight.ru`);

        const handleError = (err) => {
            if (err.url) {
                logger.warn(`redirect: ${err.url}`);
                res.redirect(err.code || 302, err.url);
            } else {
                const page502 = fs.readFileSync(path.resolve(app_root, 'public/page502.html'), 'utf-8');
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
        };

        // In production: create server renderer using template and built server bundle.
        // The server bundle is generated by vue-ssr-webpack-plugin.
        // The client manifests are optional, but it allows the renderer
        // to automatically infer preload/prefetch links and directly add <script>
        // tags for any async chunks used during render, avoiding waterfall requests.

        const bundle_path = path.resolve(app_root, 'public/assets/vue-ssr-server-bundle.json');
        const manifest_path = path.resolve(app_root, 'public/assets/vue-ssr-client-manifest.json');
        const template_path = path.resolve(app_root, 'html/src/index.template.html');

        const clientManifest = JSON.parse(fs.readFileSync(manifest_path).toString());
        const bundle = JSON.parse(fs.readFileSync(bundle_path).toString());
        const template = fs.readFileSync(template_path, 'utf-8');

        const renderer = createRenderer(bundle, {
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

        renderer.renderToString(context, (err, html) => {
            if (err) return handleError(err);

            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            res.setHeader('Content-Type', 'text/html');
            res.setHeader('Content-Length', html.length);
            res.setHeader('Server', serverInfo);
            res.send(html);
        });
    } catch (error) {
        logger.error(error);
    }
}

let env = new Config();
const config = new Config();
let port = 3000;
let publicPath = '/';
let outputPath = '../public/assets';

let faviconConf = null;
let serviceWorkerConf = null;
let manifestConf = null;
let corsConf = null;
let compressionConf = null;

let proxies = [];
let cacheRoutes = [];
let enable = [];
const baseConfig = '.env.json';
const configFileName = process.env.CONFIG || '.env.stage.json';

try {
    env.file(resolve(baseConfig));
    if (configFileName) {
        config.file(resolve(configFileName));
        env.merge(config.get());
    }

    env = env.get();
    port = process.env.PORT || env.PORT;
    publicPath = env.PUBLIC_PATH;
    outputPath = env.OUTPUT_PATH;

    faviconConf = env.FAVICON;
    manifestConf = env.MANIFEST;
    serviceWorkerConf = env.SERVICE_WORKER;
    corsConf = env.CORS;
    compressionConf = env.COMPRESSION;

    enable = env.ENABLE || [];
    proxies = env.PROXIES || [];
    cacheRoutes = env.CACHE_ROUTES || [];
} catch (error) {
    logger.error(error);
}

if (corsConf) app.use(cors(corsConf));
if (compressionConf) app.use(compression(compressionConf));
if (faviconConf) app.use(favicon(faviconConf.outputPath));
if (manifestConf) app.use(manifestConf.publicPath, serve(manifestConf.outputPath, true));
if (serviceWorkerConf) app.use(serviceWorkerConf.publicPath, serve(serviceWorkerConf.outputPath));

for (let i = 0; i < enable.length; i++) {
    const entry = enable[i];
    app.enable(entry);
}

for (let i = 0; i < proxies.length; i++) {
    const entry = proxies[i];
    logger.info('proxy', `path: ${entry.path}, host: ${entry.host}`);
    app.use(entry.path, proxy(entry.host));
}

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

app.use(publicPath, serve(outputPath, true));
app.use(cookieParser());
app.use('/catalog/export', async (req, res, next) => {
    try {
        const baseURL = `${req.protocol}://${req.get('host')}`;
        const {
            body: { file_id, type },
        } = await request.get(`${baseURL}/v1/catalog/export`).query({ ...req.query });
        res.redirect(`${baseURL}/files/original/${file_id}`);
    } catch (error) {
        res.status(error.status).send(error.response && error.response.text);
    }
});

app.get('*', (req, res) => render(req, res, env));
app.listen(port, () => logger.success(`server started at port ${port}`));

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
    development: false,
    onShutdown: onCleanup,
    finally: onFinally,
});
