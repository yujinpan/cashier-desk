/**
 * store
 * @description
 * 状态管理入口
 */

import Vue from 'vue';
import Vuex, { createLogger } from 'vuex';

import app from './modules/app';
import root from './root';

Vue.use(Vuex);

// 开发模式 debug
const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  ...root,
  getters: {
    device: (state) => state.app.device,
  },
  modules: {
    app,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});

export default store;
