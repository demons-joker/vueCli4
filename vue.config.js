const webpack = require('webpack');
const path = require('path');
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);

module.exports = {
  publicPath: IS_PROD ? process.env.VUE_APP_PUBLIC_PATH : "./", // 默认'/'，部署应用包时的基本 URL
  // outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  // assetsDir: "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, //是否在保存的时候使用 `eslint-loader` 进行检查
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1, //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  devServer: {
    host: '0.0.0.0',
    port: process.env.PROXY_PORT || '8080',
    proxy: {
      '/api': {
        target: process.env.PROXY_URL || 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('html')
      .test(/\.html$/)
      .use('vue-html-loader')
      .loader('vue-html-loader')
      .end();
  },
  configureWebpack: {
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.vue', '.json'],
      alias: {
        static: path.join(__dirname, 'static'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        cloneDeep: ['lodash', 'cloneDeep'],
      }),
    ],
  },
};