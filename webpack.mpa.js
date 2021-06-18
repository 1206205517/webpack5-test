const path = require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
// npm install --save-dev mini-css-extract-plugin
// 将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件
const minicssExtractPlugin = require('mini-css-extract-plugin')
// 打包前把dist目录做一次清空
// npm install clean-webpack-plugin -D
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// npm install glob -D
const glob = require('glob')

const setMPA = () => {
  const entry = {}
  const htmlwebpackplugins = []
  
  const entryFiles = glob.sync(path.join(__dirname, './src/*/*.js'))
  console.log(entryFiles)
  entryFiles.map(item=> {
    const entryFile = item
    const match = entryFile.match(/src\/(.*)\/index\.js$/)
    // console.log(match)
    const pageName = match[1]
    entry[pageName] = entryFile
    htmlwebpackplugins.push(new htmlwebpackplugin({
      template: path.join(__dirname, `./src/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [pageName]
    }))
  })

  return {
    entry,
    htmlwebpackplugins
  }
}

const { entry, htmlwebpackplugins } = setMPA()

// 默认配置
module.exports = {
  entry,
  output: {
    path: path.resolve(__dirname, './mpa'), //输出的文件存放的目录 绝对路径
    filename: '[name]-[chunkhash:6].js' // 输出的文件名称 js推荐使用chunkhash
  },
  mode: 'development', // none development production
  resolveLoader: {
    modules: ['node_modules', './myloaders'] // 默认去node_modules中找 找不到则去myloader中找
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // minicssExtractPlugin.loader,
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            pubicPath: '../images',
            outputPath: 'images'
          }
        }
      },
      {
        test: /\.js$/,
        // use: path.resolve(__dirname, './myloaders/replace-loader.js')
        use: [
          path.resolve(__dirname, './myloaders/replace-loader.js'),
          {
            loader: 'replace-async-loader',
            options: {
              info: 'hello'
            }
          }
        ]
      },
      {
        test: /.less$/,
        use: [
          'xyx-style-loader',
          'xyx-css-loader',
          'xyx-less-loader'
        ]
      },
      {
        test: /.scss$/,
        use: ['style-loader', 'css-loader', ' postcss-loader', 'scss-loader']
      }
    ]
  },
  plugins: [
    ...htmlwebpackplugins,
    new CleanWebpackPlugin()
    // new minicssExtractPlugin({
      // filename: 'css/[name]-[contenthash:6].css' // css推荐使用contenthash
    // })
  ]
}
