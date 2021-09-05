const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    entry: {
        main: ['babel-polyfill', '/static/src/main/js/index'],
        diagnostic: ['babel-polyfill','/static/src/main/js/index-diagnostic']
    },
    output: {
        path: path.resolve(__dirname, "static", "dist"),
        filename: 'js/[name].[contenthash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: 'main',
            filename: path.resolve(__dirname, 'templates', 'dist', 'index.html'),
            template: path.resolve(__dirname, 'templates', 'main', 'index.html'),
            cache: false,
            chunks: ['main']
        }),
        new HTMLWebpackPlugin({
            title: 'diagnostic',
            filename: path.resolve(__dirname, 'templates', 'dist', 'diagnostic.html'),
            template: path.resolve(__dirname, 'templates', 'main', 'diagnostic.html'),
            cache: true,
            chunks: ['diagnostic'],
            inject: 'head',
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.json/,
                type: 'javascript/auto',
                use: ['json-loader'],
            },
        ]
    },
}