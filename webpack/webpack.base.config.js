const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
	entry: {
		app: path.resolve(__dirname, '..', 'client', 'index.js'),
	},
	optimization: {
		minimizer: [
			new TerserWebpackPlugin(),
			new OptimizeCssAssetsWebpackPlugin(),
		],
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				enforce: 'pre',
				use: 'less-loader',
			},
			{
				test: /\.(css|less)$/,
				loaders: ['postcss-loader', 'css-loader'],
			},
			{
				test: /.js$/,
				enforce: 'pre',
				use: 'eslint-loader',
			},
			{
				test: /.js$/,
				use: 'babel-loader',
			},
			{
				test: /.ts$/,
				loaders: [
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
				use: 'vue-loader',
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
			template: path.resolve(__dirname, '..', 'client', 'index.html'),
		}),
	],
};

module.exports = config;
