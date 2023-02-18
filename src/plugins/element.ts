/**
 * 按需加载 element-ui 组件
 * @description
 * [参考官网 - 按需加载](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)
 */
import ElementUI from 'element-ui';
import Vue from 'vue';

// 方式一：按需加载
// import { Button, Loading, Message } from 'element-ui';
//
// Vue.use(Button);
// Vue.use(Loading.directive);
//
// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$message = Message;

// 方式二：完整加载方式，已在 src/styles/index.scss 中使用自定义样式
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
