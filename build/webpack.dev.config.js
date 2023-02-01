/**
 * @author Jay
 * @date 2019-4-1
 * @description webpack dev config
 */

const webpack = require("webpack");
const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.base.config.js");
const theme = require("../theme.json");

module.exports = merge(common, {
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        // ant-design
        test: /\.less|css$/,
        include: [/node_modules/],
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader",
            options: {
              // modules: true
              importLoaders: 1
            } // translates CSS into CommonJS
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: theme,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        // components styles
        test: /\.less|css$/,
        include: [
          path.resolve(__dirname, "..", "src/components/"),
          path.resolve(__dirname, "..", "src/styles/")
        ],
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader",
            options: {
              // modules: true
              importLoaders: 1
            } // translates CSS into CommonJS
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: theme,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        // container
        test: /\.less$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, "..", "src/components/"),
          path.resolve(__dirname, "..", "src/styles/")
        ],
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader",
            options: {
              // modules: true,
              modules: {
                localIdentName: "[local]-[hash:base64:5]"
              }
            } // translates CSS into CommonJS
          },
          {
            loader: "less-loader",
            options: {
              modifyVars: theme,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(ttf|woff)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [new webpack.ProgressPlugin()],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "0.0.0.0",
    port: 9200,
    useLocalIp: true,
    hot: true,
    hotOnly: true,
    open: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  externals: {
    BMap: "BMap"
  }
});
