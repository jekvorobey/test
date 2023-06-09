const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozJpeg = require('imagemin-mozjpeg');
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
    resolve: {
        alias: {
            HttpServiceEntry: './ClientHttpService.js',
        },
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
                    test: /[\\/]node_modules[\\/].*\.js$/,
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
              new CopyWebpackPlugin({
                  patterns: [
                      {
                          from: path.resolve(__dirname, '../src/assets/images/icons'),
                          to: path.resolve(__dirname, '../../public/assets/images/icons'),
                      },
                      {
                          from: path.resolve(__dirname, '../src/assets/favicon.ico'),
                          to: path.resolve(__dirname, '../../public/assets/favicon.ico'),
                      },
                      {
                          from: path.resolve(__dirname, '../site.webmanifest'),
                          to: path.resolve(__dirname, '../../public/assets/site.webmanifest'),
                      },
                  ],
              }),
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
              /* imagemin-webpack-plugin выполняет все работы по сжатию изображений. */
              new ImageminPlugin({
                  test: /\.(jpe?g|png|gif)$/i,
                  /* Для jpeg используется lossy сжатие через mozJpeg. */
                  jpegtran: null,
                  /* Для png используется lossy сжатие через pngQuant. */
                  optipng: null,
                  /* gif не обрабатывается. Используйте WebM с фолбеком в mp4 (только придётся прописать лоадер). */
                  gifsicle: null,
                  /* Под web нет смысла задавать высокое качество, но если будет слишком низко, то можно поднять. */
                  pngquant: {
                      quality: '65-80',
                      /* Выставлено максимальное качество сжатия, т.к. на проде мы никуда не спешим. */
                      speed: 1,
                  },
                  plugins: [
                      imageminMozJpeg({
                          quality: 100,
                      }),
                  ],
              }),
              new ImageminWebpPlugin({
                  config: [
                      {
                          test: /\.(jpe?g|png)$/i,
                          options: {
                              quality: 65,
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
              new CopyWebpackPlugin({
                  patterns: [
                      {
                          from: path.resolve(__dirname, '../src/assets/images/icons'),
                          to: path.resolve(__dirname, '../public/assets/images/icons'),
                      },
                      {
                          from: path.resolve(__dirname, '../src/assets/favicon.ico'),
                          to: path.resolve(__dirname, '../public/assets/favicon.ico'),
                      },
                      {
                          from: path.resolve(__dirname, '../site.webmanifest'),
                          to: path.resolve(__dirname, '../public/assets/site.webmanifest'),
                      },
                  ],
              }),
              new ImageminWebpPlugin({
                  config: [
                      {
                          test: /\.(jpe?g|png)$/,
                      },
                  ],
              }),
              // strip dev-only code in Vue source
              new webpack.DefinePlugin({
                  'process.env.NODE_ENV': JSON.stringify(mode),
                  'process.env.VUE_ENV': '"client"',
              }),
              new VueSSRClientPlugin(),
          ],
});
