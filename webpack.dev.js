const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    optimization: {
        minimize: false
    },
    devServer: {
        contentBase: './build',
        watchContentBase: true,
        open: true,
        historyApiFallback: true
    },
    plugins: [
        ...common.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});
