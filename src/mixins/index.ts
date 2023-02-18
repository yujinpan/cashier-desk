import Vue from 'vue';

// 开发模式调试方法
if (process.env.NODE_ENV === 'development') {
  Vue.mixin({
    methods: {
      // eslint-disable-next-line no-console
      log: console.log,
    },
  });
}

Vue.mixin({
  methods: {},
});
