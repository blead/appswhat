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
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    child_process: 'empty'
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared')
    },
    extensions: [ '.js', '.vue' ]
  },
  devServer: {
    port: 9000,
    contentBase: 'public',
    compress: true,
  }
}
