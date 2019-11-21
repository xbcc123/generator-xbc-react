var path = require("path");
var webpack = require("webpack");
var merge = require("webpack-merge");
var common = require("./webpack.base.conf.js");
//  引入环境变量
var config = require("../config");

module.exports = merge(common, {
  mode: "development",

  devtool: "cheap-module-eval-source-map",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"]
      }
    ]
  },
  devServer: {
    contentBase: [path.join(__dirname, "../dist")],
    hot: true,
    host: "0.0.0.0",
    useLocalIp: true,
    port: 8888,
    clientLogLevel: "warning",
    open: true,
    overlay: {
      warnings: true,
      errors: false
    },
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 100,
      poll: 1000
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": config.development.envObj
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});
