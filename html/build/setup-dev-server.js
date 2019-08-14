const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const chokidar = require('chokidar');
const clientConfig = require('./webpack.client.config');
const serverConfig = require('./webpack.server.config');
const ExpressLogger = require('../src/services/LogService/ExpressLogger');

const logger = new ExpressLogger();

const readFile = (fileSystem, file) => {
    try {
        return fileSystem.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
    } catch (e) {
        logger.error(e);
        return null;
    }
};

module.exports = function setupDevServer(app, templatePath, cb) {
    let bundle;
    let template;
    let clientManifest;

    let ready;
    const readyPromise = new Promise(r => {
        ready = r;
    });
    const update = () => {
        if (bundle && clientManifest) {
            ready();
            cb(bundle, {
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
        }
    };

    // read template from disk and watch
    template = fs.readFileSync(templatePath, 'utf-8');
    chokidar.watch(templatePath).on('change', () => {
        template = fs.readFileSync(templatePath, 'utf-8');
        logger.info('index.html template updated.');
        update();
    });

    // modify client config to work with hot middleware
    clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
    clientConfig.output.filename = '[name].js';
    clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin());

    // dev middleware
    const clientCompiler = webpack(clientConfig);
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true,
    });
    app.use(devMiddleware);
    clientCompiler.plugin('done', stats => {
        stats = stats.toJson();
        stats.errors.forEach(err => logger.error(err));
        stats.warnings.forEach(err => logger.warn(err));
        if (stats.errors.length) return;
        clientManifest = JSON.parse(readFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json'));
        update();
    });

    // hot middleware
    app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }));

    // watch and update server renderer
    const serverCompiler = webpack(serverConfig);
    const mfs = new MFS();
    serverCompiler.outputFileSystem = mfs;
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err;
        stats = stats.toJson();
        if (stats.errors.length) return;

        // read bundle generated by vue-ssr-webpack-plugin
        bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'));
        update();
    });

    return readyPromise;
};
