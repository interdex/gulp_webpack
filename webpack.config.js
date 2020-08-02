const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const TerserPlugin = require('terser-webpack-plugin')

const isDev  = process.env.NODE_ENV !== 'production'
const isProd = !isDev

const plugins = () => {
  if (isProd) {
    return [
      new BundleAnalyzerPlugin()
    ]
  }

  return []
}

const optimization = () => {
  if (isProd) {
    return {
      minimize: true,
      minimizer: [
        new TerserPlugin()
      ]
    }
  }

  return {
    minimize: false,
    minimizer: []
  }
}

const babelOptions = preset => {
  const options = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      "@babel/plugin-proposal-nullish-coalescing-operator",
		  "@babel/plugin-proposal-optional-chaining",
		  "@babel/plugin-proposal-class-properties"
    ]
  }

  if (preset) options.presets.push(preset)

  return options
}

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
        options: babelOptions()
      }
    },
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: {
        loader: 'babel-loader',
        options: babelOptions('@babel/preset-typescript')
      }
    }
  ]
},
  mode: isDev ? 'development' : 'production',
  devtool: isProd ? false : 'eval-cheap-module-source-map',
  plugins: plugins(),
  optimization: optimization()
}

module.exports = webpackConfig;
