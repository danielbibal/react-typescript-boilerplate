const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const cssnano = require('cssnano');

// plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const optimizeCssPlugin = new OptimizeCssAssetsWebpackPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: cssnano,
    cssProcessorPluginOptions: {
        preset: [
            'default'
        ]
    },
    canPrint: true
});

const prodPlugins = [
    new MiniCssExtractPlugin({
        filename: "[name].[hash].css",
        chunkFilename: "[id].[hash].css"
    }),
    optimizeCssPlugin
];

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'build'),
        publicPath: '/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [new TerserWebpackPlugin({}), optimizeCssPlugin],
    },
    plugins: [
        ...common.plugins,
        ...prodPlugins
    ]
});
