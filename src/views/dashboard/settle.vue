<template>
  <el-dialog
    :visible="visible"
    :title="locale.order.confirmTitle"
    width="85%"
    append-to-body
    :close-on-click-modal="false"
    :show-close="false"
    top="5vh"
  >
    <div class="settle">
      <CMTable
        class="order-list cm-flex-auto__content"
        :columns="columns"
        :data="data"
        :border="false"
        :order="false"
        :show-overflow-tooltip="false"
        size="large"
      />
      <Total class="cm-margin-top-large" :value="total" />
    </div>
    <template #footer>
      <div class="cm-text-center settle-footer">
        <CMButton @click="submit()" type="primary">{{
          locale.order.completeButtonText
        }}</CMButton>
        <CMButton @click="close()">{{
          locale.order.cancelButtonText
        }}</CMButton>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { CMTable, CMButton } from '@greatmap/common-modules';
import { MessageBox } from 'element-ui';
import { computed, ref } from 'vue';

import Total from './total.vue';
import type { MenuType } from '@/api/menu';
import type { OrderItem } from '@/api/order';

import { addOrders, orderTotal } from '@/api/order';
import { useLocale } from '@/utils/locale';

const emits = defineEmits(['submit', 'close']);

const { locale } = useLocale();

const visible = ref(false);
const data = ref<OrderItem[]>([]);
const columns = computed(() => [
  { prop: 'name', label: locale.value.order.name },
  {
    prop: 'count',
    label: locale.value.order.count,
    width: '170px',
  },
  {
    prop: 'price',
    label: `${locale.value.order.unitPrice}(${locale.value.currency.name})`,
  },
  {
    prop: 'total',
    label: `${locale.value.order.totalPrice}(${locale.value.currency.name})`,
    formatter: (val, row) => row.price * row.count,
  },
]);

const total = computed(() => {
  return orderTotal(data.value);
});

const open = (data1: (MenuType & { count: number })[]) => {
  visible.value = true;
  data.value = [...data1];
};
const submit = () => {
  return addOrders(data.value).then(() => {
    setTimeout(() => {
      MessageBox.alert(locale.value.handle.successMsg, {
        type: 'success',
      });
    }, 300);
    emits('submit');
    close();
  });
};
const close = () => {
  emits('close');
  visible.value = false;
};

defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
@import '~@/styles/common-variables.scss';

.settle {
  &-footer {
    .cm-button {
      width: 40%;
      height: 80px;
      padding: $spacing-medium;

      @media screen and (max-width: 1023px) {
        height: 60px;
        padding: $spacing-base;
      }
    }
  }
}
</style>
