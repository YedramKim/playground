const path = require('path');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

const baseConfig = require('./webpack.base.config');

const clientConfig = {
	mode: 'production',
	entry: {
		app: path.resolve(__dirname, '..', 'client', 'serverRenderer', 'serverRenderer.js'),
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
				test: /\.(css|less)$/,
				enforce: 'post',
				loader: 'vue-style-loader',
			},
		],
	},
	plugins: [
		new VueSSRServerPlugin({
			// filename: 'server',
		}),
	]
};

const config = merge(
	baseConfig,
	clientConfig,
);

module.exports = config;
