const path = require('path');
const htmlMinifier = require('html-minifier');
const fse = require('fs-extra');
const {
	createBundleRenderer,
} = require('vue-server-renderer');

const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest  = require('../dist/vue-ssr-client-manifest.json');
const templates = require('./templates/index.js');

const rendererMap = {};
for (const [templateName, template] of Object.entries(templates)) {
	rendererMap[templateName] = createBundleRenderer(serverBundle, {
		runInNewContext: false,
		clientManifest,
		template,
	});
}

class ServerRenderer {
	constructor({
		title = '플레이그라운드',
		template = 'index',
		location = {},
		...context
	} = {}) {
		this.title = title;
		this.template = template;
		this.location = location;
		this.context = context;
	}

	setTitle(title) {
		this.defaultContext.title = title;
	}

	computeMetaList(metaList) {
		return metaList.map(meta => {
			const metaStr = Object.entries(meta).map(([key, value]) => `${key}="${value}"`).join(' ');

			return `<meta ${metaStr}>`;
		}).join('');
	}

	async render({
			metaList = [],
			storeCommitList = [],
			...otherContext
		}) {

		const html = await rendererMap[this.template].renderToString({
			title: this.title,
			meta: this.computeMetaList(metaList),
			location: this.location,
			storeCommitList,
			...this.context,
			...otherContext,
		});

		return htmlMinifier.minify(html, {
			collapseWhitespace: true,
		});
	}
}

module.exports = ServerRenderer;
