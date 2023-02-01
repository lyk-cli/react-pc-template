/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack dll config
 */

const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: {
    react: [
      "react",
      "react-dom",
      "redux",
      "react-redux",
      "redux-thunk",
      "react-router-dom"
    ]
  },
  output: {
    path: path.join(__dirname, "../dll"),
    filename: "[name].dll.js",
    library: "[name]_[hash]"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      // context: __dirname,
      name: "[name]_[hash]",
      path: path.join(__dirname, "../dll", "[name].manifest.json")
    })
  ],
  optimization: {
    minimizer: [
      // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
      new TerserPlugin({
        terserOptions: {
          parallel: true,
          cache: true,
          compress: { warnings: false, drop_console: true },
          output: {
            // comments: false
            comments: /Build in/i
          }
        }
      })
    ]
  }
};
