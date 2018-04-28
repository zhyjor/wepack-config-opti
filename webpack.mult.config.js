let path = require('path')

module.exports = {
    // 1，写成数组的方式就可以打包多入口文件，不过这里打包后的文件都合成了一个
    // entry: ['./src/index.js','./src/login.js'],
    // 2,真正实现多入口多出口需要写成对象的方式
    entry: {
        index:'./src/index.js',
        login:'./src/login.js'
    },
    output: {
        // 1.filename:'bundle.js'
        // 2.[name]就可以将出口文件和文件名一一对应
        filename: '[name].js',// 打包后生成index.js和login.js文件
        path:path.resolve('dist')
    }
}