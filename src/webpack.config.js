import fse from 'fs-extra'
import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import webpackIsomorphicToolsConfiguration from './webpack-isomorphic-tools-configuration'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfiguration)
const staticDirs = [ 'fonts', 'images', 'stylesheets' ]

staticDirs.
  map((item) => {
    fse.copySync(
      path.resolve(__dirname, '..', 'src', item),
      path.resolve(__dirname, '..', 'dist', item)
    )
  })

export default {
  devtool: 'cheap-module-source-map',
  entry: [
    path.join(__dirname, 'client.js')
  ],
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, '..', 'public'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: [ '', '.js', '.json', '.jsx' ],
    modulesDirectories: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    webpackIsomorphicToolsPlugin,
    new ExtractTextPlugin('[hash].css', {
      allChucks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,      
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style', [
        'css?modules&importLoaders=2&sourceMap',
        'autoprefixer?browsers=last 2 version',
        'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      ].join('!'))
    }, { 
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, { 
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, { 
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, { 
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'file' 
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url?limit=10000&name=[hash].[ext]'
    }]
  }
}