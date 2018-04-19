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
  devServer: {
    port: 9000,
    contentBase: 'public',
    compress: true,
  }
}
