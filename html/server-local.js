const fs = require('fs');
const path = require('path');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const httpProxy = require('express-http-proxy');

const LRUCache = require('lru-cache');
const favicon = require('serve-favicon');
const compression = require('compression');
const microcache = require('route-cache');

const expressVersion = require('express/package.json').version;
const serverRendererVersion = require('vue-server-renderer/package.json').version;
const { createBundleRenderer } = require('./build/custom-vue-server-renderer');

const resolve = file => path.resolve(__dirname, file);

const isProd = process.env.NODE_ENV === 'production';
const useMicroCache = process.env.MICRO_CACHE !== 'false';
const serverInfo = `express/${expressVersion} vue-server-renderer/${serverRendererVersion}`;
const ServerLogger = require('./src/services/LogService/ServerLogger');

const logger = new ServerLogger();
const setupDevServer = require('./build/setup-dev-server');

const app = express();

if (serverRendererVersion !== '2.6.10')
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

const serve = (resourcePath, cache) =>
    express.static(resolve(resourcePath), {
        maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 365 : 0,
    });

// Проксирование удаленного сервера Api
// https://localhost:8080/v1/... -> https://master-front.ibt-mas.greensight.ru/v1/...
const apiProxy = httpProxy('https://master-front.ibt-mas.greensight.ru', {
    proxyReqPathResolver: req => req.originalUrl,
});

const dadataProxy = httpProxy('https://suggestions.dadata.ru', {
    proxyReqPathResolver: req => req.originalUrl,
});

app.use('/suggestions/api/4_1/rs*', dadataProxy);
app.use('/content/*', apiProxy);
app.use('/v1/*', apiProxy);

app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(compression({ threshold: 0 }));
app.use(favicon('../public/assets/favicon.ico'));
app.use('/', serve('../public', true));
app.use('/manifest.json', serve('./manifest.json', true));
app.use('/service-worker.js', serve('../public/assets/service-worker.js'));

// since this app has no user-specific content, every page is micro-cacheable.
// if your app involves user-specific content, you need to implement custom
// logic to determine whether a request is cacheable based on its url and
// headers.
// 1-second microcache.
// https://www.nginx.com/blog/benefits-of-microcaching-nginx/
// if (isProd) app.use(microcache.cacheSeconds(1, req => useMicroCache && req.originalUrl));

function render(req, res) {
    const s = Date.now();

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Server', serverInfo);

    const handleError = err => {
        if (err.url) {
            logger.warn(`redirect: ${err.url}`);
            res.redirect(err.url);
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found');
            logger.warn(`page not found: ${req.url}`);
        } else {
            // Render Error Page or Redirect
            res.status(500).send('500 | Internal Server Error');
            logger.error(`error during render: ${req.url}`, err.stack);
        }
    };

    const context = {
        title: 'IBT',
        url: req.url,
        req,
        res,
    };

    renderer.renderToString(context, (err, html) => {
        if (err) return handleError(err);

        res.send(html);
        if (!isProd) logger.success(`whole request: ${Date.now() - s}ms`, req.url);
    });
}

let port = process.env.PORT || 8080;
let host = process.env.HOST || 'localhost';

if (process.env.CONFIG) {
    try {
        const env = require(path.resolve(__dirname, process.env.CONFIG));
        port = env.PORT;
        host = env.HOST;
    } catch (error) {
        logger.error(error);
    }
}

app.get('*', isProd ? render : (req, res) => readyPromise.then(() => render(req, res)));

app.listen(port, host, () => {
    logger.info(`server started at ${host}:${port}`);
});
