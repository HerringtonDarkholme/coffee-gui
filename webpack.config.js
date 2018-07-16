var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {test: /\.ts$/, use: 'ts-loader'}
    ]
  },
  target: 'node'
}
