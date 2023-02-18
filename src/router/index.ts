/**
 * 路由配置
 */
import treeEach from 'operation-tree-node/dist/treeEach';
import Vue from 'vue';
import Router from 'vue-router';

import Layout from '../layout/index.vue';
import dashboardRoute from './modules/dashboard';
import menuRoute from './modules/menu';
import statRoute from './modules/stat';
import type { RouteConfig } from 'vue-router/types/router';

// 子模块的路由注册
export const subRoutes: RouteConfig[] = [dashboardRoute, menuRoute, statRoute];

/**
 * 增加子模块的激活菜单元数据，
 * example: { meta: { activePath: parentPath } }
 * 这个数据会在 layout/Navbar.vue 中进行导航的激活状态判断
 */
treeEach(subRoutes, (item, index, arr, parent) => {
  if (!item.meta) item.meta = {};
  item.meta.activePath =
    item.meta.activePath ||
    item.path ||
    parent?.meta?.activePath ||
    parent?.path;
});

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: subRoutes[0].path,
    children: subRoutes,
  },
  {
    path: '**',
    redirect: '/',
  },
];

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,
});

export default router;
