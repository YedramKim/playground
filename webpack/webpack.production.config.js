const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const developmentConfig: Configuration = {
	mode: 'production',
	output: {
		filename: '[name].[hash].bundle.js',
		path: path.resolve(__dirname, '..', 'dist'),
	},
	optimization: {
		minimize: true,
	},
	module: {
		rules: [
			{
				test: /\.(css|less)$/,
				enforce: 'post',
				use: MiniCssExtractPlugin.loader,
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new CleanWebpackPlugin([
			path.resolve(__dirname, '..', 'dist')
		]),
	],
};

const config = merge(
	baseConfig,
	developmentConfig
);

module.exports = config;
