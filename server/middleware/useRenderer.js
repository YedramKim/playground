const ServerRenderer = require('../../serverRenderer');

module.exports = data => ((req, res, next) => {
	res.renderer = new ServerRenderer(data);
	next();
});
