const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	optimization: {
		minimizer: [
			new TerserWebpackPlugin(),
			new OptimizeCssAssetsWebpackPlugin(),
		],
	},
	output: {
		filename: '[name].[hash:8].bundle.js',
		path: path.resolve(__dirname, '..', 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					'css-loader',
					'postcss-loader',
					'less-loader',
				],
			},
			{
				test: /\.css$/,
				use: [
					'css-loader',
					'postcss-loader',
				],
			},
			{
				test: /.js$/,
				enforce: 'pre',
				loader: 'eslint-loader',
			},
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
			{
				test: /.vue$/,
				loader: 'vue-loader',
			},
		],
	},
	resolve: {
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		},
		extensions: ['.js', '.vue', '.json'],
	},
	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '..', 'client', 'html', 'index.html'),
		}),
	],
};

module.exports = config;
