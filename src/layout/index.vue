<template>
  <div class="layout cm-full-height">
    <div class="cm-flex cm-full-height">
      <Navbar class="cm-flex-none cm-scroll-y" style="padding-right: 0" />
      <div class="cm-flex-1 cm-full-height main-body cm-flex-column">
        <div class="main-view cm-flex-1 cm-scrollbar-default cm-full-height">
          <transition name="el-fade-in" mode="out-in">
            <keep-alive>
              <!-- 增加 key 解决嵌套路由的页面渲染错误问题 -->
              <router-view :key="$route.path" max="10" />
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Navbar from './navbar.vue';
</script>

<style lang="scss" scoped>
@import '@/styles/common-variables';

.layout {
}

.main-body {
  overflow: hidden;
}

.main-view {
  padding: $spacing-medium;
  overflow: auto;
}
</style>
