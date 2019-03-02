const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const clientConfig = {
	entry: {
		app: [
			'@babel/polyfill',
			path.resolve(__dirname, '..', 'client', 'app.js'),
		],
	},

	module: {
		rules: [
			{
				test: /.js$/,
				loader: 'babel-loader',
			},
			{
				test: /.ts$/,
				use: [
					'babel-loader',
					{
						loader: 'ts-loader',
						options: {
							appendTsSuffixTo: [/\.vue$/],
						},
					},
				],
			},
		],
	},

	plugins: [
		new VueSSRClientPlugin(),
	],
};

const config = merge(
	baseConfig,
	clientConfig,
);

module.exports = config;
