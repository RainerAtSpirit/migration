const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");

module.exports = ({mode, presets} = {mode: "production", presets: []}) => {
  return webpackMerge(
    {
      mode,
      entry: path.resolve(__dirname, 'src/index.ts'),
      output: {
        path: path.join(__dirname, "_bundles"),
        filename: mode === 'production' ? '[name]-[chunkhash:6].js' : '[name][hash:6].js',
      },
      resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          '../../theme.config$': path.join(__dirname, 'my-semantic-theme/theme.config')
        }
      },
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: 'awesome-typescript-loader',
            exclude: /node_modules/,
            query: {
              silent: true,
              // we don't want any declaration file in the bundles
              // folder since it wouldn't be of any use ans the source
              // map already include everything for debugging
              declaration: false,
            }
          },
          {
            test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
            use: 'file-loader?name=[name].[ext]?[hash]'
          },
          {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
          }
        ]
      },
      plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new webpack.ProgressPlugin(),
        new CopyWebpackPlugin([
          {from: 'static'}
        ])
      ],
      externals: {
      }
    },
    modeConfig(mode),
    presetConfig({mode, presets})
  );
};
