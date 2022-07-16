const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/': {
        ws: false,
        target: 'http://localhost:8082',
        changeOrigin: true,
        pathRewrite: {
          '/': ''
        }
      }
    }
  }
})
