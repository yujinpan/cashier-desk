<template>
  <div class="cm-flex-wrap cm-flex-center">
    {{ locale.order.totalPrice }}：
    <span class="cm-color-primary" style="font-size: 50px">{{ value }}</span>
    &nbsp;&nbsp;{{ locale.currency.name }}
  </div>
</template>

<script lang="ts" setup>
import { useLocale } from '@/utils/locale';

const { locale } = useLocale();

defineProps({
  value: Number,
});
</script>

<!--<style lang="scss" scoped>-->
<!--// @import '~@/styles/common-variables.scss';-->
<!--</style>-->
