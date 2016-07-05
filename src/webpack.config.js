import autoprefixer from 'autoprefixer'
import fse from 'fs-extra'
import path from 'path'
import precss from 'precss'
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
  entry: {
    main: path.join(__dirname, 'client.js'),
    preload: path.join(__dirname, 'stylesheets', 'Preload.scss'),
    postload: path.join(__dirname, 'stylesheets', 'Main.scss')
  },
  output: {
    filename: '[name]-[hash].js',
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
    new ExtractTextPlugin('[name]-[hash].css', {
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
        'css?sourceMap&modules&importLoaders=1&localIdentName=[local]',
        'postcss',
        'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      ].join('!'))
    }, { 
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&name=[name]-[hash].[ext]&mimetype=application/font-woff'
    }, { 
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&name=[name]-[hash].[ext]&mimetype=application/font-woff'
    }, { 
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&name=[name]-[hash].[ext]&mimetype=application/octet-stream'
    }, { 
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'file?name=[name]-[hash].[ext]' 
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&name=[name]-[hash].[ext]&mimetype=image/svg+xml'
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url?limit=10000&name=[name]-[hash].[ext]'
    }]
  }, 
  postcss: () => {
    return [ 
      precss, 
      autoprefixer({ 
        browsers: ['last 1 version'] 
      }) 
    ]
  }
}