import { createRequest } from '@greatmap/common-modules';

// 创建一个请求实例
const request = createRequest({
  // 是否为请求报错
  isError: (data) =>
    data.success === false || data.code === 400 || data.code === 1,

  // 是否为请求警告
  isWarn: (data) => data.status === 'NOT_FOUND',

  // 请求配置格式化
  requestFormatter: (config) => {
    return config;
  },

  // 响应数据格式化
  responseFormatter: (response) => {
    return response.data;
  },
});

export default request;
