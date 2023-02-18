import Vue from 'vue';

import App from './App.vue';
import router from './router';
import store from './store';
import './config';

// 全局组件
import './components';

// 全局混入
import './mixins';

// 插件
import './plugins';

// 样式
import './styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  // // mock 请求配置（如果需要就去掉注释）
  // require('./mock');
}

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  router,
  render: (h) => h(App),
});
