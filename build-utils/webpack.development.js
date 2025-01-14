const proxyTarget = process.env.PROXY_TARGET || "http://localhost:3000"
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.less/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
  ],
  devServer: {
    open: true,
    port: 3111,
    contentBase: '.',
    hot: true,
    stats: {
      warnings: false
    },
    proxy: {
      "/odata/**": {
        changeOrigin: true,
        target: proxyTarget,
        secure: false,
        logLevel: "debug"
      },
      "/api/**": {
        changeOrigin: true,
        target: proxyTarget,
        secure: false,
        logLevel: "debug"
      }
    }
  },
});
