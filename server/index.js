const http = require('http');
const path = require('path');
const express = require('express');

const {
	fileSearch,
} = require('../utils');

const config = {
	port: 80,
	middlewares: {
		pre: [],
		post: [],
	},
};

class Server {
	constructor(context = {}) {
		this.app = express();
		this.router = express.Router();
		this.httpServer = http.createServer(this.app);

		this.context = context;
		this.middlewares = {};
	}

	async _setServer() {
		await this._setMiddleware();
		this._setGlobalPreMiddlewares();
		await this._setRoutes();
		this._setErrorHandler();
		this._setGlobalPostMiddleware();
	}

	async _setMiddleware() {
		const middlewarePath = path.resolve(__dirname, 'middleware');

		const middlewarePaths = await fileSearch(middlewarePath);

		this.middlewares = middlewarePaths.reduce((middlewares, middlewarePath) => {
			const middleware = require(middlewarePath);

			return {
				...middlewares,
				[path.basename(middlewarePath, '.js')]: middleware,
			};
		}, {});
	}

	_setGlobalPreMiddlewares() {
		for (const preMiddlewareInfo of config.middlewares.pre) {
			const preMiddleware = this._getMiddleware(preMiddlewareInfo);
			this.app.use(preMiddleware);
		}
	}

	async _setRoutes() {
		const routePath = path.resolve(__dirname, 'routes');
		const routePaths = await fileSearch(routePath);

		const routeObjects = routePaths.map(routePath => require(routePath));

		for (const routeObject of routeObjects) {
			this._setRoute(routeObject);
		}
		this.app.use(this.router);
	}

	_setRoute({
		path = '',
		methods,
		pre = [],
		handler,
		post = [],
	} = {}) {
		const methodList = ['get', 'post', 'head', 'put', 'delete', 'connect', 'options', 'trace'];
		methods = Array.isArray(methods) ? methods : [methods];

		if (typeof handler !== 'function') {
			throw new Error(`${path}의 라우터의 메인 핸들러가 존재하지 않습니다.`);
		}

		const preMiddlewares = pre.map(middlewareInfo => this._getMiddleware(middlewareInfo));
		const postMiddlewares = post.map(middlewareInfo => this._getMiddleware(middlewareInfo));
		const mainHandler = async (req, res, next) => {
			try {
				await handler(this.context, req, res);
			} catch (error) {
				next(error);
			}
		};

		const routeTasks = [
			...preMiddlewares,
			mainHandler,
			...postMiddlewares,
		];

		for (let method of methods) {
			method = method.toLowerCase();

			if (methodList.includes(method)) {
				this.router[method](path, ...routeTasks);
			} else {
				throw new Error(`${path}의 라우터에서 올바르지 않은 method를 사용하려고 했습니다.`);
			}
		}
	}

	_setErrorHandler() {
		this.app.use((error, req, res, next) => {
			console.info('에러 발생....');
			console.error(error);
			next();
		});
	}

	_setGlobalPostMiddleware() {
		for (const postMiddlewareInfo of config.middlewares.post) {
			const postMiddleware = this._getMiddleware(postMiddlewareInfo);
			this.app.use(postMiddleware);
		}
	}

	_getMiddleware(middlewareInfo) {
		const middlewareData = typeof middlewareInfo === 'string' ? {
			name: middlewareInfo,
			data: {},
		} : middlewareInfo;

		const middlewareConstructor = this.middlewares[middlewareData.name];
		if (middlewareConstructor) {
			return middlewareConstructor(middlewareData.data);
		} else {
			throw new Error(`${middlewareData.name}은 존재하지 않은 미들웨어 입니다.`);
		}
	}

	async startServer() {
		await this._setServer();

		const httpServerPromise = new Promise(resolve => {
			this.httpServer.listen(config, () => {
				console.info('Server running');
				resolve();
			});
		});

		return httpServerPromise;
	}
}

module.exports = Server;
