const fse = require('fs-extra');
const path = require('path');
const templates = fse.readdirSync(__dirname)
	.filter(templateFileName => /\.html$/.test(templateFileName))
	.map(templateFileName => templateFileName.replace(/\.html$/, ''));

module.exports = templates.reduce((templateMap, templateFileName) => {
	const templateFilePath = path.resolve(__dirname, `${templateFileName}.html`);
	templateMap[templateFileName] = fse.readFileSync(templateFilePath, 'utf-8');

	return templateMap;
}, {});
