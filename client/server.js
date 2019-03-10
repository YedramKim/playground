import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import Router from 'vue-router';

Vue.use(Vuex);
Vue.use(Router);

import App from './components/App.vue';
import { routerOption } from './js/router/index.js';
import { storeOption } from './js/store/index.js';

import './style/style.less';


class SingleWebApplication {
	constructor() {
		const router = new Router(routerOption);
		const store = new Store(storeOption);

		this.router = router;
		this.store = store;

		this.app = new Vue({
			render: h => h(App),
			router,
			store,
		});
	}

	async routerPush(location) {
		const routerPushPromise = new Promise((resolve, reject) => {
			this.router.push(location, resolve, reject);
		});

		await routerPushPromise;

		return new Promise((resolve, reject) => {
			this.router.onReady(resolve, reject);
		});
	}

	async commitStore(storeCommitList) {
		storeCommitList = Array.isArray(storeCommitList) ? storeCommitList : [storeCommitList];

		for (const { type, payload } of storeCommitList) {
			this.store.commit(type, payload);
		}

		return this.app.$nextTick();
	}
}

export default async (context = {}) => {
	const {
		location = {},
		storeCommitList = [],
	} = context;
	const app = new SingleWebApplication();

	await app.routerPush(location);
	await app.commitStore(storeCommitList);
	context.state = app.app.$store.state;

	return app.app;
};
