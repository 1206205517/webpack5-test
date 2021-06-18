class CopyrightWebpackPlugin {
    constructor(options) {
      console.log('插件被使用了')
    }
    apply(compiler) {
      compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
        console.log('compiler')
      })

      compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin',(compilation, cb) => {
        debugger
        compilation.assets['copyright.txt'] = {
          source: function() {
            return 'copyright by xyx'
          },
          size: function() {
            return 14
          }
        }
        cb() // 一定要调用下
      })
    }
}

module.exports = CopyrightWebpackPlugin