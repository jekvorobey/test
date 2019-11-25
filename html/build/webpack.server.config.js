const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const base = require('./webpack.base.config');
const CssExtractPlugin = require('./ServerMiniCssExtractPlugin');

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
const isProd = mode === 'production';

module.exports = merge(base, {
    target: 'node',
    entry: './src/entry-server.js',
    resolve: {
        alias: {
            HttpServiceEntry: './ServerHttpService.js',
        },
    },
    output: {
        filename: 'server-bundle.js',
        libraryTarget: 'commonjs2',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: [/\.critical\.css$/],
                use: isProd
                    ? [
                          CssExtractPlugin.loader,
                          {
                              loader: 'css-loader',
                              options: {
                                  importLoaders: 1,
                              },
                          },
                          'postcss-loader',
                      ]
                    : [
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
        ],
    },
    // https://webpack.js.org/configuration/externals/#externals
    // https://github.com/liady/webpack-node-externals
    externals: nodeExternals({
        // do not externalize CSS files in case we need to import it from a dep
        whitelist: /\.css$/,
    }),
    plugins: isProd
        ? [
              new webpack.HashedModuleIdsPlugin(),
              new CssExtractPlugin({
                  filename: isProd ? '[name].[chunkhash].css' : '[name].css',
              }),
              new webpack.DefinePlugin({
                  'process.env.NODE_ENV': JSON.stringify(mode),
                  'process.env.VUE_ENV': '"server"',
              }),
              new VueSSRServerPlugin(),
          ]
        : [
              new webpack.DefinePlugin({
                  'process.env.NODE_ENV': JSON.stringify(mode),
                  'process.env.VUE_ENV': '"server"',
              }),
              new VueSSRServerPlugin(),
          ],
});
