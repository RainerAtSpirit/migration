const proxyTarget = process.env.PROXY_TARGET || "http://localhost:3000"

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
  devServer: {
    open: true,
    port: 3010,
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
      }
    }
  },
});
