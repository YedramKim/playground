const http = require('http');
const path = require('path');
const express = require('express');

const {
	fileSearch,
} = require('../utils');

class Server {
	constructor() {
		this.app = express();
		this.httpServer = http.createServer(this.app);

		this.context = {};
		this.middlewares = {};
		this.routes = [];
	}

	async setupServer() {
		await this._setupMiddleware();
		await this._setupRoutes();
	}

	async _setupMiddleware() {
		const middlewarePath = path.resolve(__dirname, 'middleware');

		const middlewarePaths = await fileSearch(middlewarePath);
		const fileRegExp = /.+\/(.+)\.js$/;

		this.middlewares = middlewarePaths.reduce((middlewares, middlewarePath) => {
			const middleware = require(middlewarePath);

			return {
				...middlewares,
				[path.basename(middlewarePath, '.js')]: middleware,
			};
		}, {});
	}

	async _setupRoutes() {
		const routePath = path.resolve(__dirname, 'routes');
		const routePaths = await fileSearch(routePath);

		this.routes = routePaths.map(routePath => require(routePath));
	}

	async listen() {
		await this._setupServer();

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
