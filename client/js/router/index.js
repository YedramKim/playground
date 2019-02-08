import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

export const routerOption = {
	mode: 'history',
};

const router = new Router(routerOption);

export default router;
