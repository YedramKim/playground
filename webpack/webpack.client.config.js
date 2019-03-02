const path = require('path');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const clientConfig = {
	entry: {
		app: [
			'@babel/polyfill',
			path.resolve(__dirname, '..', 'client', 'index.js'),
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
