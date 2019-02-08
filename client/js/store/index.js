import Vue from 'vue';
import Vuex, { Store } from 'vuex';
Vue.use(Vuex);

export const storeOption = {};

const store = new Store(storeOption);

export default store;
