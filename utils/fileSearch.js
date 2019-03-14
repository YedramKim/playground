const fse = require('fs-extra');
const path = require('path');

const fileSearch = async (directoryPath = '', fileRegExp = /\.js$/) => {
	const fileList = await fse.readdir(directoryPath);
	// console.info(fileList);

	const resultPromises = fileList.map(async file => {
		const filePath = path.resolve(directoryPath, file);
		const stat = await fse.stat(filePath);

		if (stat.isDirectory()) {
			return fileSearch(filePath, fileRegExp);
		} else if (fileRegExp.test(file)) {
			return [filePath];
		}
	});

	const results = await Promise.all(resultPromises);

	return results.reduce((fileStack, result) => fileStack.concat(result), []);
};

module.exports = fileSearch;
