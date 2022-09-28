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
    path: path.resolve(__dirname, 'dist'),
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
            "style-loader", "css-loader", "sass-loader",
          ],
        },
      ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,

    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: ASSET_PATH
    },

    proxy: {
      '/api/**': {
        'target': 'http://[::1]:3000',
        'secure': false,
        'changeOrigin': true
      },
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Alpine Club Rentals',
      template: './client/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
    }),
  ],
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
}