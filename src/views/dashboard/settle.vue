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

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

import type { MenuType } from '../../api/menu';
import { orderTotal } from './order';
import type { OrderItem } from './order';
import Total from './total.vue';

@Component({
  components: { Total },
})
export default class Settle extends Vue {
  visible = false;
  data: OrderItem[] = [];
  columns = [
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
  ];

  get total() {
    return orderTotal(this.data);
  }

  open(data: (MenuType & { count: number })[]) {
    this.visible = true;
    this.data = [...data];
  }
  submit() {
    this.$emit('submit');
    this.close();
  }
  close() {
    this.$emit('close');
    this.visible = false;
  }
}
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
