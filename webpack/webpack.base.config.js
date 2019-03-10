const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
	optimization: {
		minimizer: [
			new TerserWebpackPlugin(),
			new OptimizeCssAssetsWebpackPlugin(),
		],
	},
	output: {
		filename: '[name].bundle.js',
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
				options: {
					configFile: path.resolve(__dirname, '..', '.eslint.vue.js'),
				},
			},
			{
				test: /.vue$/,
				loader: 'vue-loader',
				options: {
					compilerOptions: {
						whitespace: 'condense',
					},
				},
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
	],
};

module.exports = config;
