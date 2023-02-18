export default {
  path: '/stat',
  name: 'stat',
  component: () => import('@/views/stat/index.vue'),
  meta: {
    label: '统计',
    icon: 's-home',
  },
};
