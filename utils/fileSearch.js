const fse = require('fs-extra');
const path = require('path');

const fileSearch = async (directoryPath = '', fileRegExp = /\.js$/) => {
	const fileList = await fse.readdir(directoryPath);

	const resultPromises = fileList.map(async file => {
		const filePath = path.resolve(directoryPath, file);
		const stat = await fse.stat(filePath);

		return stat.isDirectory() ? fileSearch(filePath, fileRegExp) : [filePath];
	});

	const results = await Promise.all(resultPromises);

	return results.filter(result => fileRegExp.test(result)).reduce((fileStack, result) => fileStack.concat(result), []);
};

module.exports = fileSearch;
