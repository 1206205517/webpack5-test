const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    // another: './src/another-module.js'

    // chunk之间共享模块
    // index: {
    //   import: './src/index.js',
    //   dependOn: 'shared'
    // },
    // another: {
    //   import: './src/another-module.js',
    //   dependOn: 'shared'
    // },
    // shared: 'lodash'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      }
    }
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  // 将公共模块提取到已有的入口chunk中
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  // optimization: {
    // moduleIds: 'deterministic',
    // runtimeChunk: 'single',
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendor',
    //       chunks: 'all'
    //     }
    //   }
    // }
  // },
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'out management'
    }),
    new CopyrightWebpackPlugin()
  ]
}