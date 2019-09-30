const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config();

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
//const CopyWebpackPlugin = require('copy-webpack-plugin');

const processEnv = process.env.NODE_ENV || 'development';
console.info('Running in mode: ', processEnv);

// Env plugin
const EnvPlugin = new webpack.DefinePlugin({
    'process.env': JSON.stringify({
        NODE_ENV: processEnv,
        ...dotenv.parsed
    })
})

// HTML plugins - add entry for each application entry point for code splitting.
const HTMLPlugins = [
    new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['index']
    })
]

// const CopyPlugin = [
//     new CopyWebpackPlugin([
//         {
//             from: './src/assets',
//             to: 'assets'
//         }
//     ])
// ]
// build plugins
const plugins = [
    new CleanWebpackPlugin(),
    EnvPlugin,
    ...HTMLPlugins,
    // ...CopyPlugin
]

// loaders
const loaders = [
    {
        test: /\.(tsx?)|(jsx?)$/,
        exclude: [
            /node_modules/
        ],
        loader: 'ts-loader'
    },
    {
        test: /\.html$/,
        use: [
            {
                loader: 'html-loader',
                options: { minimize: true }
            }
        ]
    },
    {
        test: /\.scss$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
            },
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        require('autoprefixer')(),
                    ]
                }
            },
            {
                loader: 'sass-loader'
            }
        ]
    },
    {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader'
    },
    {
      test: /\.svg$/,
      use: [
        {
            loader: 'url-loader?limit=1&mimetype=image/svg+xml'
        },
        {
          loader: 'svgo-loader',
          options: {
            plugins: [
              {removeTitle: true},
              {convertColors: {shorthex: false}},
              {convertPathData: false}
            ]
          }
        }
      ]
    }
];

module.exports = {
    entry: {
        'index': './src/index.tsx'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss', '.html', '.svg']
    },
    module: {
        rules: loaders
    },
    plugins
}
