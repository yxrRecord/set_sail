const webpack = require("webpack");

module.exports = {
  // assetsSubDirectory: 'public',
  assetsDir: "public",
  //->生产及上线环境路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  //->打包后是否生成map文件
  productionSourceMap: false,
  //->全局引用jquery
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  },
  //->全局使用的主题色文件
  css: {
    loaderOptions: {
      sass: {
        // data:
        prependData: `@import "@/assets/theme/index.scss";`
      }
    }
  },
  devServer: {
    port: 8000,         // 端口
    host: 'localhost',  //ip
    https: false,       // https:{type:Boolean}
    open: true,         //配置自动启动浏览器
    proxy: {
      '/dev': {
          target: 'http://a2dc.cn:8080',
          pathRewrite: {'^/dev': ''},
          changeOrigin: true,
      },
    },
  },
}