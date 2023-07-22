import path from 'path';
import * as webpack from 'webpack';
interface DevWebpackConfig extends webpack.Configuration {
  devServer?: any;
}

import YAML from 'yamljs';

export default (): DevWebpackConfig => {
  const devConfig = YAML.load(path.resolve('./.env.dev.yaml')) || {};
  devConfig.mode = 'development';
  return {
    extends: ['webpack.common.ts'],
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      hot: true,
      static: path.resolve('./dist'),
      port: 5173,
      compress: true,
      historyApiFallback: true,
      client: {
        logging: 'info',
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
        reconnect: true,
      },
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
          secure: false,
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'import.meta.env': JSON.stringify(devConfig),
      }),
    ],
    module: {
      rules: [
        // sass/css
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            // 将 JS 字符串生成为 style 节点
            {
              loader: 'style-loader',
            },
            // 将 CSS 转化成 CommonJS 模块,
            {
              loader: 'css-loader',
              options: {
                // 开启 CSS Modules
                // modules: true,
                // modules: {
                //   localIdentName: '[local]_[hash:base64:8]',
                // },
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        // 其他选项
                      },
                    ],
                  ],
                },
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          sideEffects: true,
        },
        {
          test: /\.[jt]sx?$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
  };
};
