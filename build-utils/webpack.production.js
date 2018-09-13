const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin')

module.exports = () => ({
  output: {
    filename: '[name]-[chunkhash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.less/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new MomentLocalesPlugin(),
    new GenerateSW()
  ]
});
