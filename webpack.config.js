const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devEnviroment = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    index: './frontend/index.js',
    startGame: './frontend/start-game.js'
  },
  output: {
    path: path.join(__dirname, 'backend/public'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          devEnviroment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/createGame.html',
      filename: 'createGame.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './frontend/index.html',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: './frontend/startGame.html',
      filename: 'startGame.html',
      chunks: ['index', 'startGame']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/bundle.css',
    })
  ],
  devtool: 'source-map',
  mode: devEnviroment ? 'development' : 'production'
}