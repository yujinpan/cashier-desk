<template>
  <div class="total cm-flex-wrap cm-flex-center">
    {{ locale.order.totalPrice }}：
    <span class="total__number cm-color-primary">{{ value }}</span>
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

<style lang="scss" scoped>
@import '~@/styles/common-variables.scss';

.total__number {
  font-size: 50px;
  @media screen and (max-width: 1023px) {
    font-size: 40px;
  }
}
</style>
