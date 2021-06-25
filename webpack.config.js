const path = require('path');
var glob = require('glob');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');
var assetFunctions = require('node-sass-asset-functions');
const json = require('./package.json');

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
module.exports = {
  context: path.resolve(__dirname),
  entry: {
    main: './src/js/global.js',
    home: './src/views/templates/home/home.js',
    team: './src/views/templates/team/team.js',
    forstudent: './src/views/templates/forstudent/forstudent.js',
    contact: './src/views/templates/contact/contact.js',
    projects: './src/views/templates/projects/projects.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js',
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
            options: {},
          },
        ],
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
                path.join(
                  __dirname,
                  './node_modules/handlebars-helpers'
                ),
              ],
              partialDirs: [
                path.join(__dirname, 'src'),
                path.join(__dirname, 'src', 'views'),
                path.join(__dirname, 'src', 'views', 'layouts'),
                path.join(__dirname, 'src', 'views', 'templates'),
                path.join(__dirname, 'src', 'views', 'partials'),
              ].concat(
                glob.sync('**/', {
                  cwd: path.resolve(
                    __dirname,
                    'src',
                    'views',
                    'partials'
                  ),
                  realpath: true,
                })
              ),
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {},
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        include: [path.resolve(__dirname, './src/img/projects')],
        use: [
          {
            loader: 'responsive-loader',
            options: {
              adapter: require('responsive-loader/sharp'),
              outputPath: 'static',
              publicPath: '/static',
              format: 'jpg',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        exclude: [path.resolve(__dirname, './src/img/projects')],
        use: [
          {
            loader: 'responsive-loader',
            options: {
              adapter: require('responsive-loader/sharp'),
              outputPath: 'static',
              publicPath: '/static',
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './scss',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              functions: assetFunctions({
                images_path: 'src/img',
                http_images_path: '/img',
              }),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebPackPlugin({
      title: 'Wiśniowa SU | Samorząd Uczniowski',
      desc:
        'Poznaj samorząd uczniowski z Technikum Mechatronicznego nr 1 w Warszawie, którego połączyła chęć zmian. Zobacz jaki jest samorząd na Wiśniowej 56!',
      template: './src/views/templates/home/home.hbs',
      filename: './index.html',
      chunks: ['main', 'home'],
      version: json.version,
      minify: htmlMinifyOptions,
    }),
    new HtmlWebPackPlugin({
      title: 'Zespoł - Wiśniowa SU | Samorząd Uczniowski',
      desc: 'Aktualny skład zespołu SU',
      template: './src/views/templates/team/team.hbs',
      filename: './team/index.html',
      chunks: ['main', 'team'],
      version: json.version,
      minify: htmlMinifyOptions,
    }),
    new HtmlWebPackPlugin({
      title: 'Zespoł 2019/2020 - Wiśniowa SU | Samorząd Uczniowski',
      desc: 'Skład zespołu SU w roku 2019/20',
      template: './src/views/templates/team/team_2019_2020.hbs',
      filename: './team_2019_2020/index.html',
      chunks: ['main', 'team'],
      version: json.version,
      minify: htmlMinifyOptions,
    }),
    new HtmlWebPackPlugin({
      title: 'Zespoł 2020/2021 - Wiśniowa SU | Samorząd Uczniowski',
      desc: 'Skład zespołu SU w roku 2019/20',
      template: './src/views/templates/team/team_2020_2021.hbs',
      filename: './team_2020_2021/index.html',
      chunks: ['main', 'team'],
      version: json.version,
      minify: htmlMinifyOptions,
    }),
    new HtmlWebPackPlugin({
      title: 'Dla ucznia - Wiśniowa SU | Samorząd Uczniowski',
      desc:
        'Materiały oraz usługi przeznaczone dla uczniów Wiśniowej',
      template: './src/views/templates/forstudent/forstudent.hbs',
      filename: './forstudent/index.html',
      chunks: ['main', 'forstudent'],
      version: json.version,
      minify: htmlMinifyOptions,
    }),
    new HtmlWebPackPlugin({
      title: 'Projekty - Wiśniowa SU | Samorząd Uczniowski',
      desc: 'Zbiór ukończonych projektów SU Wiśniowej',
      template: './src/views/templates/projects/projects.hbs',
      filename: './projects/index.html',
      chunks: ['main', 'projects'],
      version: json.version,
      minify: htmlMinifyOptions,
    }),
    new HtmlWebPackPlugin({
      title: 'Kontakt - Wiśniowa SU | Samorząd Uczniowski',
      desc: 'Dane kontakowe',
      template: './src/views/templates/contact/contact.hbs',
      filename: './contact/index.html',
      chunks: ['main', 'contact'],
      version: json.version,
      minify: htmlMinifyOptions,
    }),
    new CopyPlugin([{ from: './src/static' }]),
    new MinifyPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};
