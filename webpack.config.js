const BabelMinifyPlugin = require('babel-minify-webpack-plugin')
const path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  optimization: {
    minimizer: [
      new BabelMinifyPlugin()
    ]
  }
}
