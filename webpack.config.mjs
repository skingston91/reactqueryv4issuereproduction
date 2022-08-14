import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html'
});

export default {
  mode: 'development',
  target: 'web',
  devtool: 'eval-source-map',
  output: {
    publicPath: '/'
  },
  devServer: {
    port: 8080,
    static: 'dist',
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                localIdentHashSalt: 'inschematic'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  },
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /core-js/,
        use: [
          {
            loader: 'swc-loader'
          }
        ]
      },
      {
        test: /\.(ts(x?))$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'swc-loader'
          },
          { loader: 'ts-loader', options: { onlyCompileBundledFiles: true } }
        ]
      }
    ],
    noParse: /\.test\.(ts(x?))$/
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  plugins: [
    new webpack.ProgressPlugin(),
    htmlPlugin,
  ]
};
