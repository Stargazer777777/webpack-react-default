import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default (): webpack.Configuration => {
  return {
    extends: ['webpack.common.ts'],
    mode: 'production',
    plugins: [
      new BundleAnalyzerPlugin(),
      // 抽离css
      new MiniCssExtractPlugin({ filename: 'css/[contenthash].css' }),
    ],
    optimization: {
      runtimeChunk: 'single',
      // 代码分离（打包成多个文件）
      splitChunks: {
        chunks: 'all',
      },
      usedExports: true,
      minimizer: [
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
        new TerserPlugin(),
      ],
    },
    module: {
      rules: [
        // sass/css
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [
            // 将 JS 字符串生成为 style 节点
            MiniCssExtractPlugin.loader,
            // 将 CSS 转化成 CommonJS 模块,
            {
              loader: 'css-loader',
              options: {
                // 开启 CSS Modules
                // modules: {
                //   localIdentName: '[hash:base64]',
                // },
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
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
          sideEffects: true,
        },
        {
          test: /\.[jt]sx?$/,
          use: 'babel-loader',
        },
      ],
    },
  };
};
