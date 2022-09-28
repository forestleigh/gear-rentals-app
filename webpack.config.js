const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// Try the environment variable, otherwise use root
const ASSET_PATH = process.env.ASSET_PATH || '/';
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  entry: './client/index.js',
  output: {
    publicPath: ASSET_PATH,
    // path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: NODE_ENV,
  module: {
    rules: [
        {
          test: /\.jsx?/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env','@babel/preset-react']
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /(node_modules)/,
          use: [
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'client'),
    },
    // proxy: {
    //   '/api': 'http://localhost:3000',
    // },
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Surf Club Rentals",
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
  ],
}