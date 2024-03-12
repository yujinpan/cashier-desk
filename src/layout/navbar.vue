<template>
  <ul class="navbar cm-flex-column">
    <li v-for="item in menus" :key="item.path">
      <CMButton
        @click="$router.push(item.path)"
        :class="{ 'is-active': item.path === activePath }"
        :text="item.path !== activePath"
        column
        :icon="item.icon"
        size="large"
        type="primary"
        >{{ item.label }}</CMButton
      >
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { CMButton } from '@greatmap/common-modules';
import { computed, getCurrentInstance } from 'vue';

const menus = computed(() => [
  { path: '/dashboard', label: '首页', icon: 'el-icon-s-home' },
  { path: '/menu', label: '菜单', icon: 'el-icon-menu' },
  { path: '/order', label: '订单', icon: 'el-icon-menu' },
  { path: '/stat', label: '统计', icon: 'el-icon-menu' },
]);

const currentInstance = getCurrentInstance();

const activePath = computed(
  () => currentInstance.$route.meta?.activePath || currentInstance.$route.path,
);
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
