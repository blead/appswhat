const path = require('path')

module.exports =  {
  entry: {
    index: './src/index.js'
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared')
    },
    extensions: [ '.js' ]
  },
  devServer: {
    port: 9000,
    contentBase: 'public',
    compress: true,
  }
}
