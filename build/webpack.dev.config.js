const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
let path = require('path')
let webpack = require('webpack')

// 使用静态服务器的方式，打包的文件仅仅存在于内存中，不会出现的dist文件夹中
let baseConfig = require('./webpack.config')

module.exports = merge(baseConfig, {
    plugins:[
      new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: '../dist',
        host: 'localhost',
        port: 3000,
        open: true,
        hot: true
    }
})