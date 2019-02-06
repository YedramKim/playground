module.exports = {
	parserOptions: {
		'ecmaVersion': 2019,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended',
	],
	rules: {
		'no-console': [
			'error',
			{
				allow: ['info', 'warn', 'error'],
			},
		],
	},
	plugins: [
		'vue',
	],
	env: {
		browser: true,
	},
};
