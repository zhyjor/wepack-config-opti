let path = require('path')

module.exports = {
    // 入口文件
    entry: './src/index.js',
    // 出口文件
    output: {
        // 打包后的文件名称
        filename: "bundle.js",
        // 打包后的路径，需要提供绝对路径
        path: path.resolve('dist')
    },
    // 处理对应的模块
    module: {},
    // 对应的插件
    plugins: [],
    // 开发服务器配置
    devServer: {},
    // 模式配置
    mode: 'development'
}