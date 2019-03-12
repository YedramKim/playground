const http = require('http');
const path = require('path');
const fse = require('fs-extra');
const express = require('express');

class Server {
	constructor() {
		this.app = express();
		this.httpServer = http.createServer(this.app);
		this.context = {};
	}

	async _getAllModule(searchDir, returnArray = false, currentPath = __dirname) {
		const searchPath = path.resolve(currentPath, searchDir);
		const javascriptRegExp = /\.js/;
		let result = returnArray ? [] : {};

		const fileList = await fse.readdir(searchPath);
		const taskList = fileList.map(async file => {
			const filePath = path.resolve(searchPath, file);
			const stat = await fse.stat(filePath);

			if (stat.isDirectory()) {
				return this._getAllModule(file, returnArray, searchPath);
			} else if (javascriptRegExp.test(file)) {
				const fileModule = require(filePath);

				return returnArray ? [fileModule] : { [file.replace(javascriptRegExp, '')]: fileModule };
			}
		});

		const taskResults = await Promise.all(taskList);

		for (const task of taskResults) {
			if (returnArray) {
				result.push(...task);
			} else {
				result = {
					...result,
					...task,
				};
			}
		}

		return result;
	}

	async _setUpServer() {
		await this._setUpMiddleware();
		await this._setUpRoutes();
	}

	async _setUpMiddleware() {}

	async _setUpRoutes() {}

	async listen() {
		await this._setUpServer();

		const httpServerPromise = new Promise(resolve => {
			this.httpServer.listen(80, () => {
				console.info('Server running');
				resolve();
			});
		});

		return httpServerPromise;
	}
}

module.exports = Server;
