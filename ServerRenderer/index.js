const path = require('path');
const htmlMinifier = require('html-minifier');
const fse = require('fs-extra');
const {
	createBundleRenderer,
} = require('vue-server-renderer');

const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest  = require('../dist/vue-ssr-client-manifest.json');
const template = fse.readFileSync(path.resolve(__dirname, '..', 'client', 'html', 'index.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
	runInNewContext: false,
	template,
	clientManifest,
	shouldPreload() {
		return false;
	},
});

class ServerRenderer {
	constructor() {
		this.defaultContext = {
			title: '플레이그라운드',
		};
	}

	async render(context = {}) {
		const html = await renderer.renderToString({
			...this.defaultContext,
			...context
		});

		return htmlMinifier.minify(html, {
			collapseWhitespace: true,
		});
	}
}

module.exports = ServerRenderer;
