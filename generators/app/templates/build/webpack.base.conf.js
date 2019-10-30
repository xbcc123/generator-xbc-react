var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, "../"),

    entry: {
        app: './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'static/js/[name].[hash].bundle.js',
        chunkFilename: 'static/js/[name].[chunkhash].bundle.js',
        pathinfo: false,
        publicPath: '/',
    },

    externals: {
        // jquery: 'jQuery',
    },

    resolve: {
        extensions: ['.', '.ts', '.js', 'jsx', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
        },
        mainFiles: ["index"],
        modules: ["node_modules"],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node-modules/],
                use: [
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                            compact: false
                        },
                    }
                ]
            },
            {
                test: /\.jsx$/,
                loaders: ['babel-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: 'static/img/[name].[hash:7].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: 'static/fonts/[name].[hash:7].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: 'static/media/[name].[hash:7].[ext]',
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../dist/index.html'),
            template: 'index.html',
            inject: true,
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }]),
    ],

    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    }
};