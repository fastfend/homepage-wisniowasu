const path = require('path');
var glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');
var assetFunctions = require('node-sass-asset-functions');

const htmlMinifyOptions = {
  collapseWhitespace: true,
  collapseInlineTagWhitespace: false,
  conservativeCollapse: false,
  preserveLineBreaks: true,
  removeAttributeQuotes: false,
  removeComments: false,
  useShortDoctype: false,
  html5: true,
};
console.log(path.join( __dirname, './node_modules/handlebars-helpers/lib' ))
module.exports = {
  context: path.resolve(__dirname),
  entry: {
    main: './src/js/global.js',
    home: './src/views/templates/home/home.js',
    team: './src/views/templates/team/team.js',
    forstudent: './src/views/templates/forstudent/forstudent.js',
    contact: './src/views/templates/contact/contact.js',
    projects: './src/views/templates/projects/projects.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(handlebars|hbs)$/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              inlineRequires: '/img/',
              precompileOptions: {
                knownHelpersOnly: false,
              },
              helperDirs: [
                path.join( __dirname, './node_modules/handlebars-helpers' )
              ],
              partialDirs: [
                path.join(__dirname, 'src'),
                path.join(__dirname, 'src', 'views'),
                path.join(__dirname, 'src', 'views', 'layouts'),
                path.join(__dirname, 'src', 'views', 'templates'),
                path.join(__dirname, 'src', 'views', 'partials')
              ].concat(
                glob.sync('**/', {
                  cwd: path.resolve(__dirname, 'src', 'views', 'partials'),
                  realpath: true
                })
              )
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.svg/,
        use: {
            loader: 'svg-url-loader',
            options: {}
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'responsive-loader',
            options: {
             adapter: require('responsive-loader/sharp'),
             outputPath: 'static',
             publicPath: '/static'
                //      loader: 'file-loader',
                //      options:
                //      {
                //        name: 'images/[hash].[ext]',
                //        outputPath: 'static',
                //        publicPath: '/static'
                //      }
                //  },
                //  {
                //    loader: 'image-webpack-loader',
                //    options: {
                //      mozjpeg: {
                //        progressive: true,
                //        quality: 65
                //      },
                //      // optipng.enabled: false will disable optipng
                //      optipng: {
                //        enabled: true,
                //      },
                //      pngquant: {
                //        quality: [0.65, 0.90],
                //        speed: 4
                //      },
                //      gifsicle: {
                //        interlaced: false,
                //      }
                //    }
                //  }
            }
          }
        ]

      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './scss',
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options:
            {
              keepQuery: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
                sourceMap: true,
                functions: assetFunctions({
                  images_path: 'src/img',
                  http_images_path: '/img'
                })
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebPackPlugin({
      title: `Strona główna | Wiśniowa SU`,
      desc: "Jesteśmy grupą osób, które połączyła chęć zmian. Mimo różnych kompetencji i spojrzenia na świat, każdy z nas chce osiągnąć ten sam cel. Poznaj jaki jest samorząd na Wiśniowej 56!",
      template: './src/views/templates/home/home.hbs',
      filename: './index.html',
      chunks: ['main', 'home'],
      minify: htmlMinifyOptions
    }),
    new HtmlWebPackPlugin({
      title: `Zespoł | Wiśniowa SU`,
      desc: "Aktualny skład zespołu SU",
      template: './src/views/templates/team/team.hbs',
      filename: './team/index.html',
      chunks: ['main', 'team'],
      minify: htmlMinifyOptions
    }),
    new HtmlWebPackPlugin({
      title: `Dla ucznia | Wiśniowa SU`,
      desc: "Materiały oraz usługi przeznaczone dla uczniów Wiśniowej",
      template: './src/views/templates/forstudent/forstudent.hbs',
      filename: './forstudent/index.html',
      chunks: ['main', 'forstudent'],
      minify: htmlMinifyOptions
    }),
    new HtmlWebPackPlugin({
      title: `Ukończone projekty | Wiśniowa SU`,
      desc: "Zbiór ukończonych projektów SU Wiśniowej",
      template: './src/views/templates/projects/projects.hbs',
      filename: './projects/index.html',
      chunks: ['main', 'projects'],
      minify: htmlMinifyOptions
    }),
    new HtmlWebPackPlugin({
      title: `Kontakt | Wiśniowa SU`,
      desc: "Dane kontakowe",
      template: './src/views/templates/contact/contact.hbs',
      filename: './contact/index.html',
      chunks: ['main', 'contact'],
      minify: htmlMinifyOptions
    }),
    new CopyPlugin([{ from: './src/static' }]),
    new MinifyPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  }
};
