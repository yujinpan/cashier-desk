<template>
  <div class="layout cm-flex-auto">
    <Navbar class="cm-flex-auto__fixed cm-scroll-y" style="padding-right: 0" />
    <div class="cm-flex-auto__content main-body">
      <div class="main-view cm-scrollbar-default cm-full-height">
        <transition name="el-fade-in" mode="out-in">
          <!-- 增加 key 解决嵌套路由的页面渲染错误问题 -->
          <keep-alive>
            <router-view :key="$route.path" max="10" />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from './navbar.vue';
</script>

<style lang="scss" scoped>
@import '@/styles/common-variables';

.main-view {
  padding: $spacing-medium;
  overflow: auto;
}
</style>
