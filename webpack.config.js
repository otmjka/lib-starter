const path = require('path')
const webpack = require('webpack')
const Clean = require('clean-webpack-plugin')

const webpackConfig = require('./webpack-base-config')

webpackConfig.output = {
  path: path.resolve(__dirname, 'dist/'),
  filename: '[name].js',
  library: 'LibraryName',
  libraryTarget: 'umd',
}

webpackConfig.entry = {
  'LibraryName': [path.resolve(__dirname, 'src/index.js')],
}

if (process.env.npm_lifecycle_event === 'build-min') {
  webpackConfig.entry = {
    'LibraryName.min': [path.resolve(__dirname, 'src/LibraryName.js')],
  }
  webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }))
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: true,
      sourceMap: true,
      comments: false,
      output: {comments: false}
    })
  )
} else if (process.env.npm_lifecycle_event === 'build') {
  webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: false, debug: false }))
} else if (process.env.npm_lifecycle_event !== 'start') {
  webpackConfig.plugins.push(new Clean(['dist'], {verbose: false}))
}

module.exports = webpackConfig
