var merge = require('webpack-merge');

// 提取css
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

// webpack打包依赖
var common = require('./webpack.base.conf.js');

// 统计打包时间
var SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
var smp = new SpeedMeasurePlugin();

var TerserPlugin = require('terser-webpack-plugin');

module.exports = smp.wrap(
    merge(common, {
        performance: {
            hints: 'warning',
            maxEntrypointSize: 250000,
            maxAssetSize: 250000,
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js')
            }
        },

        optimization: {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true
                })
            ]
        },
        mode: 'production',

        devtool: false,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.scss$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash].css'
            })
        ]
    })
)

