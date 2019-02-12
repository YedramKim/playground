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

	async routerPush(context) {
		const routerPushPromise = new Promise((resolve, reject) => {
			this.router.push(context, resolve, reject);
		});

		await routerPushPromise;

		return new Promise((resolve, reject) => {
			this.router.onReady(resolve, reject);
		});
	}

	async commitStore(commitDataList) {
		commitDataList = Array.isArray(commitDataList) ? commitDataList : [commitDataList];

		for (const { type, payload } of commitDataList) {
			this.store.commit(type, payload);
		}

		return this.app.$nextTick();
	}
}

export default async ({
	location = {},
	commitDataList = [],
} = {}) => {
	const app = new SingleWebApplication();

	await app.routerPush(location);
	await app.commitStore(commitDataList);

	return app.app;
};
