const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
const isProd = mode === 'production';

const plugins = isProd
    ? [new VueLoaderPlugin(), new webpack.optimize.ModuleConcatenationPlugin()]
    : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()];

plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

module.exports = {
    mode,
    devtool: isProd ? false : 'source-map',
    output: {
        path: path.resolve(__dirname, '../../public/assets'),
        publicPath: '/assets/',
        filename: isProd ? '[name].[chunkhash].js' : '[name].js',
        globalObject: 'self'
    },
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, '../src/components'),
            '@controls': path.resolve(__dirname, '../src/components/controls'),

            '@images': path.resolve(__dirname, '../src/assets/images'),
            '@videos': path.resolve(__dirname, '../src/assets/videos'),
            '@files': path.resolve(__dirname, '../src/assets/files'),
            '@styles': path.resolve(__dirname, '../src/assets/styles'),

            '@scripts': path.resolve(__dirname, '../src/assets/scripts'),
            '@polyfills': path.resolve(__dirname, '../src/assets/scripts/polyfills'),
            '@regex': path.resolve(__dirname, '../src/assets/scripts/regex'),
            '@enums': path.resolve(__dirname, '../src/assets/scripts/enums'),
            '@constants': path.resolve(__dirname, '../src/assets/scripts/constants'),
            '@settings': path.resolve(__dirname, '../src/assets/scripts/settings'),

            '@util': path.resolve(__dirname, '../src/util'),
            '@services': path.resolve(__dirname, '../src/services'),
            '@store': path.resolve(__dirname, '../src/store'),
            '@router': path.resolve(__dirname, '../src/router'),
            '@plugins': path.resolve(__dirname, '../src/plugins'),
            '@api': path.resolve(__dirname, '../src/api'),
        },
    },
    module: {
        noParse: /es6-promise/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, '../src/'),
                    path.resolve(__dirname, '../node_modules/proxy-polyfill'),
                    path.resolve(__dirname, '../node_modules/resize-detector'),
                    path.resolve(__dirname, '../node_modules/body-scroll-lock'),
                    path.resolve(__dirname, '../node_modules/vue-clamp'),
                    path.resolve(__dirname, '../node_modules/lru-cache'),
                    path.resolve(__dirname, '../node_modules/axios-extensions'),
                ],
            },
            {
                test: /\.critical\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(jpe?g|png|svg|gif)$/,
                include: path.resolve(__dirname, '../src/assets/images'),
                exclude: [path.resolve(__dirname, '../src/assets/images/sprites')],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: isProd ? 'images/[name].[hash:20].[ext]' : 'images/[name].[ext]',
                            limit: 1024,
                        },
                    },
                ],
            },
            {
                test: /\.(mov|mp4)$/,
                include: path.resolve(__dirname, '../src/assets/videos'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: isProd ? 'videos/[name].[hash:20].[ext]' : 'videos/[name].[ext]',
                            limit: 1024,
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, '../src/assets/images/sprites'),
                loader: 'svg-sprite-loader',
                options: {
                    symbolId: 'icon-[name]',
                },
            },
            {
                test: /\.(ttf|woff|woff2)$/,
                include: path.resolve(__dirname, '../src/assets/fonts'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: isProd ? 'fonts/[name].[hash:20].[ext]' : 'fonts/[name].[ext]',
                            limit: 10 * 1024,
                        },
                    },
                ],
            },
            {
                test: /\.pdf$/,
                include: path.resolve(__dirname, '../src/assets/file'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'files/[name].[ext]',
                            limit: 0,
                        },
                    },
                ],
            },
        ],
    },
    performance: {
        hints: false,
    },
    stats: isProd
        ? {
              children: false,
              chunks: false,
              chunkModules: false,
              modules: false,
          }
        : 'minimal',
    plugins: plugins,
};
