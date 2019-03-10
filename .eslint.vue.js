module.exports = {
	globals: {
		Vue: true,
		vue: true,
		gapi: true
	},
	'rules': {
		'vue/max-attributes-per-line': ['error', {
			singleline: 3,
			multiline: {
				max: 1,
				allowFirstLine: false
			}
		}],
		'vue/html-indent': ['error', 'tab', {}],
		'vue/component-name-in-template-casing': ['error', 'kebab-case']
	},
	plugins: [
		'vue'
	],
	env: {
		browser: true
	},
	extends: [
		'plugin:vue/recommended',
		'./.eslintrc.js',
	]
}
