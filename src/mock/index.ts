import { getModulesByRequireContext } from '@greatmap/common-modules';
import axios from 'axios';

const CONFIG = {
  timeout: 500,
};

type MockConfig = {
  url: string;
  method: 'get' | 'post';
  response: object;
};

// 获取所有的 mock 数据
const mockList: MockConfig[] = [];
const modules: Record<string, MockConfig[]> = getModulesByRequireContext(
  require.context('./data/', true, /\.ts$/),
);
for (const key in modules) {
  mockList.push(...Object.values(modules[key]));
}

// eslint-disable-next-line
console.log(`生成的 mock 数据有：\n${mockList.map((item) => item.url).join()}`);

axios.interceptors.request.use((config) => {
  const findMock = mockList.find((item) => config.url?.includes(item.url));
  if (findMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(findMock.response);
      }, CONFIG.timeout);
    });
  }
});
