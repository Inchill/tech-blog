const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    // 热监测服务器，动态监测并实时更新页面
    devServer: {
        contentBase: './server/public/dist',
        // 默认端口为8080
        port: 8081,
        // 开启热更新
        hot: true,
        // 前端解决跨域，配置代理服务器
        proxy: {
            '/api': {
                target: 'http://localhost:3001',  // 目标服务器
                changeOrigin: true,  // 开启代理服务器
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
});