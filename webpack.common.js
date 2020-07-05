const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
    // 入口
    entry: {
        index: './client/index.ts'
    },
    // 编译输出配置
    output: {
        // js生成到dist/js，[name]表示保留原js文件名，并跟随生成的chunkhash
        filename: '[name]-[hash:6].js',
        // 输出到server/public，输出路径为dist，一定要绝对路径
        path: path.resolve(__dirname, './server/public/dist')
    },
    // 插件
    plugins: [
        new CleanWebpackPlugin(),
        // 设置html模板生成路径
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './server/views/index.html',
            chunks: ['index']
        }),
        // vue-loader必须和VueLoaderPlugin一起使用，否则报错
        new VueLoaderPlugin(),
        // 将样式抽离使用link方式引入
        new MiniCssExtractPlugin({
            filename: '[name]-[hash:6].css'
        }),
        // 前端开启gzip压缩
        new CompressionWebpackPlugin({
            test: /\.(js|css)$/,
            threshold: 10240   // 对大于10k的js和css文件进行压缩
        })
    ],
    // 配置各个模块规则
    module: {
        rules: [
            // 处理ts文件
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // 处理ES6转ES5
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-transform-modules-commonjs'
                        ]
                    }
                },
                exclude: /node_modules/
            },
            // 处理vue
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            // 处理CSS(类似管道，优先使用css-loader处理，最后是style-loader)
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            // 处理stylus
            {
                test: /\.styl(us)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader']
            },
            // 处理图片
            {
                test: /\.(png|jpg|gif|eot|woff|ttf|svg|webp|PNG)(\?\S*)?$/,
                loader: 'url-loader',
                options: {
                    name: '[name]-[hash:6].[ext]',
                    esModule: false,    // 否则图片加载src显示为object module
                    limit: 10240,  // 小于10kb的特殊处理，转成base64
                    puplicPath: './server/public'
                },
                exclude: /node_modules/
            }
        ]
    },
    // 配置文件扩展名
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json']
    },
    // 配置process.env.NODE_ENV
    mode: process.env.NODE_ENV === 'production' ? 'production':'development'
}