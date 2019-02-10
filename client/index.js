import './style/style.less';

import Vue from 'vue';

import App from './components/App.vue';
import router from './js/router/index.js';
import store from './js/store/index.js';

const vm = new Vue({
	render: h => h(App),
	router,
	store,
});

vm.$mount('#app', true);

export default vm;
