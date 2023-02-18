<template>
  <div class="cm-flex-wrap cm-flex-center">
    总金额：
    <span class="cm-color-primary" style="font-size: 50px">{{ value }}</span>
    &nbsp;&nbsp;元
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Total extends Vue {
  @Prop() private value!: number;
}
</script>

<!--<style lang="scss" scoped>-->
<!--// @import '~@/styles/common-variables.scss';-->
<!--</style>-->
