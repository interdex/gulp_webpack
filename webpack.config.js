const path = require('path')

const isDev  = process.env.NODE_ENV !== 'production';
const isProd = !isDev;

const webpackConfig = {
  output: {
    filename: '[name].bundle.js'
  },
  resolve : {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts']
  },
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: '/node_modules/',
      loader: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties'
          ]
        }
      }
    },
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript'
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties'
          ]
        }
      }
    }
  ]
},
  mode: isDev ? 'development' : 'production',
  devtool: isProd ? false : 'cheap-module-eval-source-map'
}

module.exports = webpackConfig;
