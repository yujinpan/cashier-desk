export default {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    label: '收银台',
    icon: 's-home',
  },
};
