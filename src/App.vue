<template>
  <div id="app" class="cm-full-height">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>

<!--<style lang="scss" scoped></style>-->
