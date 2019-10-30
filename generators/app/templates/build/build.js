var webpack = require('webpack');
var config = require('../config')
var configBuild = require('./webpack.prod.conf')
var merge = require('webpack-merge');

var env = process.argv.filter(function (val, index, array) {
    return index >= 2
})[0];

var setEnv = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config[env].envObj
        }),
    ]
}

var obj = merge(configBuild, setEnv)

var compiler = webpack(obj);

compiler.run((err, stats) => {
    console.log(stats.toString({
        colors: true,
        // 不显示模块信息
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }));
});