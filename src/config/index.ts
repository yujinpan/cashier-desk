import { printInfoStyle } from '@greatmap/common-modules';

// public/config.js 的配置
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const GLOBAL_CONFIG = window.CONFIG as {
  // 接口基础地址，例如：/api
  base: string;
};

// 打印打包信息
// eslint-disable-next-line no-undef,@typescript-eslint/ban-ts-comment
// @ts-ignore
const build = __BUILD__;
printInfoStyle(
  'color:orange;font-size:14px;',
  `系统名称：${build.name}`,
  `当前版本：${build.version}`,
  `发布时间：${build.dateTime}`,
);
