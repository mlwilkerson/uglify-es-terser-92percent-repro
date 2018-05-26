const path = require('path')
const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [
      new UglifyWebpackPlugin({
        sourceMap: true,
        uglifyOptions: {
          compress: false
        }
      })
    ]
  }
}
