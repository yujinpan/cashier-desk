export default {
  path: '/menu',
  name: 'menu',
  component: () => import('@/views/menu/index.vue'),
  meta: {
    label: '菜单',
    icon: 's-home',
  },
};
