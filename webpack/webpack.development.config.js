const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const developmentConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				enforce: 'post',
				use: 'vue-style-loader',
			},
		],
	},
	plugins: [
		new HotModuleReplacementPlugin(),
	],
};

const config = merge(baseConfig, developmentConfig);

module.exports = config;
