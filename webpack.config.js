const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const config = {
    mode: 'development',
    entry: './src/index.tsx',
    devtool: argv.mode === 'production' ? false : 'eval-source-map',
    output: {
      path: argv.mode === 'production' ? path.resolve('dist') : path.resolve('tmp'),
      filename: 'app.bundle.js',
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      modules: ['node_modules']
    },
    module: {
      rules: [
        {
          test: /\.(js(x?)|ts(x?))$/,
          include: /src/,
          loader: 'babel-loader'
        },
        {
          test: /\.css?$/,
          loader: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'file-loader'
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader'
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, 'assets'),
      compress: true,
      historyApiFallback: true,
      hot: true,
      port: 3031,
      open: true
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve('dist/**/*'), path.resolve('tmp/**/*')]
      }),
      new HtmlWebpackPlugin({
        template: path.resolve('src/index.html')
      })
    ]
  };

  if (argv.mode === 'development') {
    config.plugins.concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.HotModuleReplacementPlugin()
    ]);
    config.optimization = { noEmitOnErrors: true };
  }

  return config;
};
