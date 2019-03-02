const path = require('path');
const fse = require('fs-extra');
const {
	createBundleRenderer,
} = require('vue-server-renderer');

const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest  = require('../dist/vue-ssr-client-manifest.json');
const template = fse.readFileSync(path.resolve(__dirname, '..', 'dist', 'index.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template,
	clientManifest,
});

class ServerRender {
	constructor() {}

	render(context = {}) {
		return renderer.renderToString(context);
	}
}

module.exports = ServerRender;
