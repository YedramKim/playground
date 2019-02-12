const path = require('path');
const {
	createBundleRenderer,
} = require('vue-server-renderer');

const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest  = require('../dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle);

class ServerRender {
	constructor() {}

	render(context = {}) {
		return renderer.renderToString(context);
	}
}

module.exports = ServerRender;
