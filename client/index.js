import './style/style.less';

import Vue from 'vue';

import App from './components/App.vue';
import router from './js/router/index.js';
import store from './js/store/index.js';

new Vue({
	el: '#app',
	render: h => h(App),
});
