<template>
  <ul class="navbar cm-flex-column">
    <li v-for="item in menus" :key="item.path">
      <CMButton
        @click="$router.push(item.path)"
        :class="{ 'is-active': item.path === activePath }"
        :text="item.path !== activePath"
        column
        icon="el-icon-menu"
        size="large"
        type="primary"
        >{{ item.label }}</CMButton
      >
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { subRoutes } from '../router';
import type { CMMenuItem } from '@greatmap/common-modules';

/**
 * 左侧导航组件
 */
@Component({
  components: {},
})
export default class Navbar extends Vue {
  get menus(): CMMenuItem[] {
    return subRoutes.map((item) => ({
      label: item.meta?.label,
      path: item.path,
    }));
  }

  get activePath() {
    return this.$route.meta?.activePath || this.$route.path;
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common-variables';

.navbar {
  width: 120px;
  background: rgba(0, 0, 0, 0.8);
  .cm-button {
    padding: $spacing-medium !important;
    width: 100%;
    height: 100px !important;
    border-radius: 0;
  }
}
</style>
