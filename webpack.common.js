const path = require('path');

module.exports = {
    // entry chinh de bundle
    entry: ['./src/index.js', './src/sass/index.scss'],
    output: {
        filename: 'js/index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/, // các file .js or .jsx được loader bởi 'babel-loader'
            loader: 'babel-loader', //https://stackoverflow.com/questions/41750715/when-do-i-use-use-and-loader-in-webpack-2-module-rules
            exclude: [/node_modules/] // không tìm trong folder /node_modules
        }]
    }
}