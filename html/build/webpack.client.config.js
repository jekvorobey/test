const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminWebpPlugin = require('imagemin-webp-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const presets = [];
if (process.env.ANALYZE) presets.push(new BundleAnalyzerPlugin());

const base = require('./webpack.base.config');

const mode = process.env.NODE_ENV ? process.env.NODE_ENV : 'production';
const isProd = mode === 'production';

module.exports = merge(base, {
    entry: {
        app: './src/entry-client.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: [/\.critical\.css$/],
                use: isProd
                    ? [
                          MiniCssExtractPlugin.loader,
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
    optimization: {
        /* Настройки Bundle Splitting. */
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    // eslint-disable-next-line
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    minSize: 0,
                    maxAsyncRequests: Infinity,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        runtimeChunk: false,
    },
    plugins: isProd
        ? [
              new webpack.HashedModuleIdsPlugin(),
              new CopyWebpackPlugin([
                  {
                      from: path.resolve(__dirname, '../src/assets/images/icons'),
                      to: path.resolve(__dirname, '../../public/assets/images/icons'),
                  },
                  {
                      from: path.resolve(__dirname, '../src/assets/favicon.ico'),
                      to: path.resolve(__dirname, '../../public/assets/favicon.ico'),
                  },
                  {
                      from: path.resolve(__dirname, '../manifest.json'),
                      to: path.resolve(__dirname, '../../public/assets/manifest.json'),
                  },
              ]),
              new MiniCssExtractPlugin({
                  filename: isProd ? '[name].[chunkhash].css' : '[name].css',
              }),
              /* На финальной сборке под бэк происходит сжатие статических ассетов через GZIP и Brotli. Сервер должен быть настроен таким образом, чтобы тянуть эти файлы вместо генерации своих. Такой подход позволяет не тратить время сервера на обработку заведомо неизменяемых ассетов и применять максимальные уровни сжатия. */
              new CompressionPlugin({
                  test: /\.(js|css|svg|ttf)$/,
                  filename: '[path].gz[query]',
                  threshold: 1024,
                  minRatio: 0.8,
                  /* CompressionPlugin поддерживает кэширование, BrotliPlugin, к сожалению, нет. */
                  cache: true,
                  compressionOptions: {
                      level: 9,
                  },
              }),
              new BrotliPlugin({
                  test: /\.(js|css|svg|ttf)$/,
                  asset: '[path].br[query]',
                  threshold: 1024,
                  minRatio: 0.8,
                  quality: 11,
              }),
              new ImageminWebpPlugin({
                  config: [
                      {
                          test: /\.(jpe?g|png)$/,
                          options: {
                              nearLossless: 0,
                              quality: 45,
                              method: 6,
                          },
                      },
                  ],
              }),
              // strip dev-only code in Vue source
              new webpack.DefinePlugin({
                  'process.env.NODE_ENV': JSON.stringify(mode),
                  'process.env.VUE_ENV': '"client"',
              }),
              new VueSSRClientPlugin(),
              // auto generate service worker
              new SWPrecachePlugin({
                  cacheId: 'vue-ibt',
                  filename: 'service-worker.js',
                  minify: true,
                  dontCacheBustUrlsMatching: /./,
                  staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
                  runtimeCaching: [
                      {
                          urlPattern: '/',
                          handler: 'networkFirst',
                      },
                      {
                          urlPattern: /\/(top|new|show|ask|job)/,
                          handler: 'networkFirst',
                      },
                      {
                          urlPattern: '/item/:id',
                          handler: 'networkFirst',
                      },
                      {
                          urlPattern: '/user/:id',
                          handler: 'networkFirst',
                      },
                  ],
              }),
              ...presets,
          ]
        : [
              new CopyWebpackPlugin([
                  {
                      from: path.resolve(__dirname, '../src/assets/images/icons'),
                      to: path.resolve(__dirname, '../public/assets/images/icons'),
                  },
                  {
                      from: path.resolve(__dirname, '../src/assets/favicon.ico'),
                      to: path.resolve(__dirname, '../public/assets/favicon.ico'),
                  },
                  {
                      from: path.resolve(__dirname, '../manifest.json'),
                      to: path.resolve(__dirname, '../public/assets/manifest.json'),
                  },
              ]),
              // strip dev-only code in Vue source
              new webpack.DefinePlugin({
                  'process.env.NODE_ENV': JSON.stringify(mode),
                  'process.env.VUE_ENV': '"client"',
              }),
              new VueSSRClientPlugin(),
          ],
});
