/**
 * app store
 * @description
 * 主模块的状态存储
 */

import type { RootState } from '@/store/root';
import type { Module } from 'vuex';

export type AppState = {
  device: {
    version: number;
  };
};

const state: AppState = {
  device: {
    version: 1,
  },
};

const appStore: Module<AppState, RootState> = {
  namespaced: true,
  state,
  mutations: {},
};

export default appStore;
