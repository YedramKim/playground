import './style/style.less';

import Vue from 'vue';

import App from './components/App.vue';
import router from './js/router/index.js';
import store from './js/store/index.js';

if (global.__INITIAL_STATE__) {
	store.replaceState(global.__INITIAL_STATE__);
}

const vm = new Vue({
	router,
	store,
	mounted() {
		if (global.__INITIAL_STATE__) {
			global.__INITIAL_STATE__ = null;
		}
	},
	render: h => h(App),
});

vm.$mount('#app', true);

export default vm;
