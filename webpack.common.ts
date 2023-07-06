import * as path from 'path';
import * as webpack from 'webpack';
import yaml from 'yamljs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import WebpackBar from 'webpackbar';
import ESLintPlugin from 'eslint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const config = (env: Record<string, boolean>): webpack.Configuration => {
  const isProd = env.production;

  return {
    entry: './src/main.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].bundle.js',
      clean: true,
    },
    stats: 'minimal', // 设置控制台展示的信息
    plugins: [
      // 生成html
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.DefinePlugin({}),
      new WebpackBar(), // 美化进度条
      // eslint
      new ESLintPlugin({
        context: './src/',
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        fix: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: './public/',
            globOptions: { ignore: ['**/index.html'] }, // 复制public里面的所有内容，除了index.html
          },
        ],
      }),
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.scss', '.sass', '.css'], // 引入这些文件不需要加后缀
      plugins: [
        new TsconfigPathsPlugin({
          configFile: 'tsconfig.json',
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.sass', '.css'], // 这些文件里面可用tsconfig配置的路径别名
        }),
      ],
    },
    module: {
      rules: [
        // 加载图片
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        // 加载字体
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        // 加载yaml
        {
          test: /\.(yaml|yml)$/i,
          type: 'json',
          parser: {
            parse: yaml.parse,
          },
        },
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/, //排除 node_modules 目录
        },
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/, //排除 node_modules 目录
        },
      ],
    },
  };
};

export default config;
