const { defineConfig } = require('@vue/cli-service')

const proxyObj = {}
proxyObj['/'] = {
  ws: false,
  target: 'http://localhost:8082',
  changeOrigin: true,
  pathRewrite: {
    '^': ''
  }
}

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
})
