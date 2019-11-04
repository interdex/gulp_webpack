const isDev  = process.env.NODE_ENV !== 'production';
const isProd = !isDev;

const webpackConfig = {
  output: {
      filename: 'bundle.js'
  },
  resolve : {
      extensions: ['.js', '.ts']
  },
module: {
  rules: [
    {
      test: /\.(js|ts)$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }
  ]
},
  mode: isDev ? 'development' : 'production',
  devtool: isProd ? false : 'cheap-module-eval-source-map'
}

module.exports = webpackConfig;