const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
let path = require('path')

// the path(s) that should be cleaned
let pathsToClean = [
    'dist'
]
let fullPath = path.resolve(__dirname,'../')
// the clean options to use
let cleanOptions = {
    root:     fullPath,
    exclude:  ['shared.js'],
    verbose:  true,
    dry:      false
}

const baseConfig = require('./webpack.config')

module.exports = merge(baseConfig, {
    plugins: [
        // 路径有问题
        new CleanWebpackPlugin(pathsToClean, cleanOptions)
    ]
})