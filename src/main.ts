import Vue from 'vue';

import App from './App.vue';
import router from './router';
import './config';

// 全局组件
import './components';

// 全局混入
import './mixins';

// 插件
import './plugins';

// 样式
import './styles/index.scss';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  render: (h) => h(App),
});
