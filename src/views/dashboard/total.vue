<template>
  <div class="cm-flex-wrap cm-flex-center">
    总金额：
    <span class="cm-color-primary" style="font-size: 50px">{{ value }}</span>
    &nbsp;&nbsp;元
  </div>
</template>

<script lang="ts" setup>
defineProps({
  value: Number,
});
</script>

<!--<style lang="scss" scoped>-->
<!--// @import '~@/styles/common-variables.scss';-->
<!--</style>-->
