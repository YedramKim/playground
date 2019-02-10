const merge = require('webpack-merge');
const baseConfig = require('./webpack.client.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const developmentConfig = {
	mode: 'production',
	optimization: {
		minimize: true,
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				enforce: 'post',
				loader: MiniCssExtractPlugin.loader,
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new CleanWebpackPlugin([
			path.resolve(__dirname, '..', 'dist')
		], {
			root: path.resolve(__dirname, '..'),
		}),
	],
};

const config = merge(
	baseConfig,
	developmentConfig
);

module.exports = config;
