const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './main.js',
   output: {
      path: path.join(__dirname, '/pages'),
      filename: 'index_bundle.js',
      publicPath: '/interactive'
   },
   devServer: {
      inline: true,
      port: 8001
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          }
      ]
   },
   plugins:[
      new HtmlWebpackPlugin({
         template: '/pages/interactive.html'
      })
   ]
}