export default {
  path: '/order',
  name: 'order',
  component: () => import('@/views/order/index.vue'),
  meta: {
    label: '订单',
    icon: 's-home',
  },
};
