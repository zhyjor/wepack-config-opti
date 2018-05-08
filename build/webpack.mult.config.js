let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// multiple extract instances
// 正常写入的less
let styleLess = new ExtractTextWebpackPlugin('css/style.css');
// reset
let resetCss = new ExtractTextWebpackPlugin('css/reset.css');
module.exports = {
    // 1，写成数组的方式就可以打包多入口文件，不过这里打包后的文件都合成了一个
    // entry: ['./src/index.js','./src/login.js'],
    // 2,真正实现多入口多出口需要写成对象的方式
    context: path.resolve(__dirname, '../'),
    entry: {
        index: './src/index.js',
        login: './src/login.js'
    },
    output: {
        // 1.filename:'bundle.js'
        // 2.[name]就可以将出口文件和文件名一一对应
        filename: '[name].js',// 打包后生成index.js和login.js文件
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10
                },
                utils:{
                    chunks:'initial',
                    name:'utils',
                    minSize:0
                }
            }
        }
    },
    // 对应的插件
    plugins: [
        new HtmlWebpackPlugin({
            // 使用哪个模板html
            //
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['vendor', 'a'],
            hash: true,

        }),
        new HtmlWebpackPlugin({
            template: './src/login.html',
            filename: 'login.html',
            chunks: ['vendor', 'b']
        }),
        styleLess,
        resetCss
    ],
    // 开发服务器配置
    devServer: {},
    // 模式配置
    mode: 'development'
}