<template>
  <el-dialog
    :visible="visible"
    title="订单确认"
    width="750px"
    append-to-body
    :close-on-click-modal="false"
    :show-close="false"
  >
    <div class="settle">
      <CMTable
        ref="CMTable"
        class="order-list cm-flex-auto__content"
        :columns="columns"
        :data="data"
        :border="false"
        :order="false"
        :show-overflow-tooltip="false"
        max-height="320px"
        size="large"
      />
      <Total class="cm-margin-top-large" :value="total" />
    </div>
    <template #footer>
      <div class="cm-text-center settle-footer">
        <CMButton @click="submit()" type="primary">完成下单</CMButton>
        <CMButton @click="close()">取消</CMButton>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { showMessage, CMTable, CMButton } from '@greatmap/common-modules';
import { computed, ref } from 'vue';

import Total from './total.vue';
import type { MenuType } from '@/api/menu';
import type { OrderItem } from '@/api/order';

import { addOrders, orderTotal } from '@/api/order';

const emits = defineEmits(['submit', 'close']);

const visible = ref(false);
const data = ref<OrderItem[]>([]);
const columns = ref([
  { prop: 'name', label: '名称' },
  {
    prop: 'count',
    label: '数量',
    width: '170px',
  },
  { prop: 'price', label: '单价(元)' },
  {
    prop: 'total',
    label: '总价(元)',
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
    showMessage('操作成功', 'success');
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
    }
  }
}
</style>
