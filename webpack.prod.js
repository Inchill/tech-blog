const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    // 方便追踪源代码错误
    devtool: '#source-map'
});