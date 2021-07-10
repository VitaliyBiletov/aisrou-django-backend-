const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: '/static/src/main/js/index',
    },
    output: {
        path: path.resolve(__dirname, "static", "dist"),
        filename: '[name]/js/index.[contenthash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: 'main',
            filename: path.resolve(__dirname,'templates', 'dist-layout','base.html'),
            template: path.resolve(__dirname,'templates','layout','base.html'),
            cache: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
}