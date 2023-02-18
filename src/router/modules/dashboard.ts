export default {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    label: '主界面',
    icon: 's-home',
  },
};
