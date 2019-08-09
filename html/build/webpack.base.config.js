const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: isProd ? 'source-map' : 'eval',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: isProd ? '[chunkhash].js' : '[name].js',
    },
    resolve: {
        alias: {
            images_path: path.resolve(__dirname, '../src/assets/images'),
        },
    },
    module: {
        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
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
                test: /\.(jpe?g|png)$/,
                include: path.resolve(__dirname, '../src/assets/images'),
                exclude: path.resolve(__dirname, '../src/assets/images/responsive'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: isProd ? 'images/[hash:20].[ext]' : 'images/[name].[ext]',
                            limit: 10 * 1024,
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
                        loader: 'file-loader',
                        options: {
                            name: isProd ? 'fonts/[hash:20].[ext]' : 'fonts/[name].[ext]',
                            limit: 10 * 1024,
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
    plugins: isProd
        ? [new VueLoaderPlugin(), new webpack.optimize.ModuleConcatenationPlugin()]
        : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()],
};
