const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    watch: false,
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({ 
        template: "./index.html",
        title: "text-editor"
      }),
      new InjectManifest ({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js"
      }),
      new WebpackPwaManifest ({
        inject: true,
        name: "text-editor-lol",
        short_name: "text-editor",
        description: "a simple html text editor",
        background_color: "#000000",
        theme_color: "#000000",
        start_url: "/",
        public_path: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 512],
            destination: path.join("assets", "icons")
          }
        ]
      })
    ],

    module: {
      rules: [

        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },

        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },

      ],
    },
  };
};
