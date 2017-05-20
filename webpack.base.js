const webpack = require('webpack');
const path = require('path');

module.exports = function() {
  return {
    entry: {
      main: './main.js',
    },
    output: {
      path: path.resolve(__dirname, '.'),
      filename: '[name].min.js'
    },
    cache: true,
    watchOptions: {
      poll: 250
    },
    module: {
      noParse: [
        /(node_modules|~)\/(jquery)\//gi
      ],
      loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader?presets[]=es2015' ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader"
      }
      ]
    },
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ],
    stats: { colors: true },
    resolve: {
      extensions: ['.js', '.json']
    }
  }
}
