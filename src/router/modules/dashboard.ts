/**
 * 首页路由配置
 */
export default {
  path: '/home/dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    label: '主界面',
    icon: 's-home',
  },
};
