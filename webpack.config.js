const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main: '/static/src/main/js/index',
        diagnostic: '/static/src/main/js/index-diagnostic'
    },
    output: {
        path: path.resolve(__dirname, "static", "dist"),
        filename: 'js/[name].[contenthash].js',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: 'main',
            filename: path.resolve(__dirname,'templates', 'dist','index.html'),
            template: path.resolve(__dirname,'templates','main','index.html'),
            cache: false,
            chunks: ['main']
        }),
        new HTMLWebpackPlugin({
            title: 'diagnostic',
            filename: path.resolve(__dirname,'templates', 'dist','diagnostic.html'),
            template: path.resolve(__dirname,'templates','main','diagnostic.html'),
            cache: true,
            chunks: ['diagnostic'],
            inject: 'body',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/, // определяем тип файлов
                exclude: /(node_modules)/,  // исключаем из обработки папку node_modules
                loader: "babel-loader",   // определяем загрузчик
                options:{
                    presets:["@babel/preset-env", "@babel/preset-react"]    // используемые плагины
                }
            },
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
            },
            {
                test: /\.json/,
                type: 'javascript/auto',
                use: ['json-loader'],
              },
        ]
    },
}