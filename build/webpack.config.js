let CleanWebpackPlugin = require('clean-webpack-plugin');
let path = require('path')
// 插件都是一个类
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// multiple extract instances
// 正常写入的less
let styleLess = new ExtractTextWebpackPlugin('css/style.css');
// reset
let resetCss = new ExtractTextWebpackPlugin('css/reset.css');


module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 出口文件
    output: {
        // 可以添加hash防止文件缓存，每次都会生成4位hash
        filename: "bundle_[hash:4].js",
        // 打包后的路径，需要提供绝对路径
        path: path.resolve('dist')
    },
    // 处理对应的模块
    module: {
        rules: [
            // 添加 css3的前缀
            {
                test: /\.css$/,
                use: resetCss.extract({
                    // 这里带上style-loader会报错，不知道原因
                    use: ['css-loader', 'postcss-loader'],
                    // 指定相对路径，引用图片资源
                    publicPath: '../'
                }),
            },
            {
                test: /\.less$/,
                use: styleLess.extract({
                    // 注意这里的配置顺序
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            // css引入了背景图之类的图片，需要指定相对路径，处理图片需要loader
            {
                test: /\.(jpe?g|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            // 图片打包后存放的次序
                            outputPath: 'images/'
                        }
                    }
                ]
            },
            // 页面中经常出现img标签，img引用的图片地址也需要一个loader处理
            {
                test: /\.(htm|html)$/,
                use: 'html-withimg-loader'
            },
            // 引用了图标和svg图片，都可以使用file-loader来解析
            {
                test: /\.(eot|ttf|woff|svg)$/,
                use: 'file-loader'
            },
            // 转码es6
            {
                test: /\.js$/,
                use: 'babel-loader',
                include: /src/,
                exclude: /node_modules/
            }

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
        styleLess,
        resetCss

    ],
    // 开发服务器配置
    devServer: {},

    // 模式配置
    mode: 'development'
}