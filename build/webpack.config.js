let path = require('path')
// 插件都是一个类
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// multiple extract instances
let extractCSS = new ExtractTextPlugin('./css/reset.css');
let extractLESS = new ExtractTextPlugin('./css/style.css');

module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 出口文件
    output: {
        // 可以添加hash防止文件缓存，每次都会生成4位hash
        filename: "bundle.js",
        // 打包后的路径，需要提供绝对路径
        path: path.resolve('dist')
    },
    // 处理对应的模块
    module: {
        rules: [
            {
                test: /\.css$/i, loader: extractCSS.extract({
                use: 'css-loader'
            })
            },
            {
                test: /\.less$/i, loader: extractLESS.extract({
                use: 'less-loader'
            })
            },
        ]
    },
    // 对应的插件
    plugins: [
        new HtmlWebpackPlugin({
            // 使用哪个模板html
            //
            template: './src/index.html',
            filename: 'index.html',
            hash: true
        }),
        // 拆分后会将css放到html页面，输出到dist的css
        extractCSS,
        extractLESS

    ],
    // 开发服务器配置
    devServer: {},
    // 模式配置
    mode: 'development'
}