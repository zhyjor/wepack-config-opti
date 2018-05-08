module.exports = {
    // 这种方式不生效，改为下面的方式。
    // plugins: [require('autoprefixer')]
    plugins: {
        'autoprefixer': {browsers: 'last 5 version'}
    }
}