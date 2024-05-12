<template>
  <ul class="navbar cm-flex-column">
    <li v-for="item in menus" :key="item.path">
      <CMButton
        @click="$router.push(item.path)"
        :class="{ 'is-active': item.path === activePath }"
        :text="item.path !== activePath"
        column
        :icon="item.icon"
        icon-size="32px"
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

import { useLocale } from '@/utils/locale';

const { locale } = useLocale();

const menus = computed(() => [
  {
    path: '/dashboard',
    label: locale.value.navbar.dashboard,
    icon: 'el-icon-s-home',
  },
  { path: '/menu', label: locale.value.navbar.menu, icon: 'el-icon-menu' },
  {
    path: '/order',
    label: locale.value.navbar.order,
    icon: 'el-icon-document',
  },
  { path: '/stat', label: locale.value.navbar.stat, icon: 'el-icon-s-data' },
  {
    path: '/settings',
    label: locale.value.settings.settings,
    icon: 'el-icon-setting',
  },
]);

const currentInstance = getCurrentInstance();

const activePath = computed(
  () =>
    currentInstance.proxy.$route.meta?.activePath ||
    currentInstance.proxy.$route.path,
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

  @media screen and (max-width: 1023px) {
    width: 100px;
    .cm-button {
      height: 80px !important;
    }
  }
}
</style>
