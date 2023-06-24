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
	};
};
