import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base.config';

const developmentConfig: webpack.Configuration = {};
const config = merge(
	baseConfig,
	developmentConfig
);

export default config;
