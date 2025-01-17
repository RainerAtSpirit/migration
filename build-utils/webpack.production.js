const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin')
const Critters = require('critters-webpack-plugin')

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
    new HtmlWebpackPlugin({
      filename: 'start.html',
      template: '!!prerender-loader?string!index.html'
    }),
    new MiniCssExtractPlugin(),
    new MomentLocalesPlugin(),
    new GenerateSW(),
    // hit by https://github.com/GoogleChromeLabs/critters/issues/10
    // new Critters()
  ]
});
