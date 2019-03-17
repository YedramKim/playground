const Server = require('./server');

(async () => {
	try {
		const server = new Server();
		await server.startServer();
	} catch (e) {
		console.info('에러 ㅠㅠ');
		console.error(e);
	}
})();
