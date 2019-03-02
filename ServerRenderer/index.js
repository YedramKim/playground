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
	constructor({
		title = '플레이그라운드',
		location = {},
		metaList = [],
		...context
	} = {}) {
		this.title = title;
		this.location = location;
		this.context = context;
		this.metaList = metaList;
	}

	setTitle(title) {
		this.defaultContext.title = title;
	}

	pushMetaList(...metaList) {
		this.metaList.push(...metaList);
	}

	computeMetaList() {
		return this.metaList.map(meta => {
			const metaStr = Object.entries(meta).map(([key, value]) => `${key}="${value}"`).join(' ');

			return `<meta ${metaStr}>`;
		}).join('');
	}

	async render(otherContext = {}) {
		const html = await renderer.renderToString({
			title: this.title,
			location: this.location,
			meta: this.computeMetaList(),
			...this.context,
			...otherContext,
		});

		return htmlMinifier.minify(html, {
			collapseWhitespace: true,
		});
	}
}

module.exports = ServerRenderer;
