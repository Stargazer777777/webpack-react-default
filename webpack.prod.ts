import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import YAML from 'yamljs';
import path from 'path';
export default (): webpack.Configuration => {
	const devConfig = YAML.load(path.resolve('./.env.prod.yaml'))||{};
	devConfig.mode = 'production';
	return {
		extends: ['webpack.common.ts'],
		mode: 'production',
		plugins: [
			new BundleAnalyzerPlugin(),
			new webpack.DefinePlugin({
				'import.meta.env': JSON.stringify(devConfig),
			}),
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
	};
};
