const webpack = require('webpack');
var HappyPack = require('happypack');
const path = require('path');

module.exports = function() {
  return {
    entry: {
      main: path.resolve(__dirname, './main.js')
    },
    output: {
      path: path.resolve(__dirname, '.'),
      publicPath: '/',
      filename: '[name].min.js'
    },
    context: __dirname,

    cache: true,
    watchOptions: {
      poll: 250
    },

    module: {
      noParse: [
        /(node_modules|~)\/(jquery)\//gi
      ],
      loaders: [
        { test: /\.js$/, loader: 'happypack/loader?id=js', exclude: [/node_modules/, /scaffold/, /dist/] },
        { test: /\.html$/, loader: "html-loader" },
        { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader: 'url-loader' },
        { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
        { test: /\.(png|jpg)$/, loader: "url-loader" }
      ]
    },
    plugins: [
      new HappyPack({ id: 'js', loaders: ['babel-loader?presets[]=es2015&cacheDirectory=true'] }),
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
