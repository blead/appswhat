const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports =  {
  entry: {
    index: './src/index.js'
  },
  mode: 'development',
  plugins: [
    new CopyPlugin([{from: 'public'}])
  ],
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
