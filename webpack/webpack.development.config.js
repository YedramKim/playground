const {
	HotModuleReplacementPlugin,
} = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const developmentConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		https: true,
		hot: true,
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, '..', 'dist'),
		stats: {
			color: true,
		},
		overlay: {
			warnings: true,
			errors: true
		}
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				enforce: 'post',
				loader: 'vue-style-loader',
			},
		],
	},
	plugins: [
		new HotModuleReplacementPlugin(),
	],
};

const config = merge(baseConfig, developmentConfig);

module.exports = config;
