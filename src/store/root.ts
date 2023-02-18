import type { AppState } from '@/store/modules/app';

export type RootState = {
  name: string;

  app: AppState;
};

const state: RootState = {
  name: 'vue-integrate',
} as RootState;

export default {
  state,
};
