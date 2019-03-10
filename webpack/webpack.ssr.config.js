const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const baseConfig = require('./webpack.base.config');

const clientConfig = {
	mode: 'production',
	entry: {
		app: [
			'@babel/polyfill',
			path.resolve(__dirname, '..', 'client', 'server.js'),
		],
	},
	output: {
		libraryTarget: 'commonjs2',
	},
	externals: nodeExternals({
		whitelist: /\.(css|less)$/,
	}),
	target: 'node',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /.ts$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/],
				},
			},
		],
	},
	plugins: [
		new VueSSRServerPlugin({}),
	]
};

const config = merge(
	baseConfig,
	clientConfig,
);

module.exports = config;
