module.exports = {
	parserOptions: {
		'ecmaVersion': 2019,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended',
	],
	plugins: [
		'vue',
		'@typescript-eslint/parser',
	],
	env: {
		browser: true,
	},
};
