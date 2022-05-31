const webpack = require('webpack');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// nó ghép với file webpack`webpack.common.js` đã cấu hình cơ bản để sử dụng.
module.exports = merge(common, {
    // môi trường : development
    mode: 'development',

    //  nó sẽ hiển thị lỗi ở đâu (vì khi lỗi nó sẽ hiển thị ở file đã build trong folder dist
    // mà khi build là cú pháp js5 cái ta cần là chính xác lỗi chỗ nào, 
    // đó là lý do bạn nên để 'inline-source-map'
    devtool: 'inline-source-map',
    devServer: {
        static: './'
    },
    module: {
        // các file scss được loader bởi style-loader, css-loader, sass-loader
        rules: [{
            test: /\.(scss|sass)$/,
            use: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    watch: true,
    plugins: [
        // HotModuleReplacementPlugin: nó giúp tạo ra server riêng tự động reload khi có bất kỳ thay đổi nào từ các file hệ client của project/
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack React Example',
            inject: false,
            template: require('html-webpack-template'),
            meta: [{
                name: 'description',
                content: 'A better default template for html-webpack-plugin.'
            }],
            mobile: true,
            lang: 'en-US',
            bodyHtmlSnippet: '<div id="root">Hello anh Tien dev</div>',
        })
    ]
})