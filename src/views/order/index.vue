<template>
  <CMList
    ref="list"
    :get-list-method="getListMethod"
    :columns="columns"
    :table-props="{
      showOverflowTooltip: false,
      order: false,
      showSummary: true,
    }"
    :pagination="false"
    :filter-params="filterParams"
    :filter-fields="filterFields"
    filter-realtime
  >
    <template #header>
      <CMButton type="primary" @click="exportTable">导出</CMButton>
    </template>
  </CMList>
</template>

<script lang="ts" setup>
import {
  getDateTimeStr,
  getTimeStampByDay,
  writeSheetFile,
  CMList,
  CMButton,
} from '@greatmap/common-modules';
import { onActivated, ref } from 'vue';

import { getOrderList, orderTotal } from '@/api/order';

const data = ref([]);
const columns = ref([
  { prop: 'time', label: '日期', width: '300px' },
  { prop: 'total', label: '金额(元)', width: '150px' },
  { prop: 'detail', label: '详情' },
]);
const filterParams = ref({
  date: 0,
});
const filterFields = ref([
  {
    prop: 'date',
    type: 'radio_button',
    options: [
      { value: 0, label: '全部' },
      { value: -1, label: '1天内' },
      { value: -7, label: '1周内' },
      { value: -30, label: '1月内' },
      { value: -90, label: '3月内' },
      { value: -180, label: '6月内' },
      { value: -365, label: '12月内' },
    ],
  },
]);

const list = ref<typeof CMList>();
onActivated(() => {
  list.value.getList();
});

const exportTable = () => {
  writeSheetFile(
    list.value.data,
    columns.value.map((item) => ({
      ...item,
      width: undefined,
    })),
  );
};

const getListMethod = () => {
  let startTime;
  let endTime;
  if (filterParams.value.date) {
    startTime = getTimeStampByDay(filterParams.value.date);
    endTime = Date.now();
  }

  return getOrderList({
    startTime,
    endTime,
  }).then((res) => {
    return {
      total: res.length,
      data: (data.value = res.map((item) => ({
        time: getDateTimeStr(item.time),
        total: orderTotal(item.orders),
        detail: item.orders
          .map((item) => `${item.name}（${item.count}个）`)
          .join(','),
      }))),
    };
  });
};
</script>

<!--<style lang="scss" scoped>-->
<!--@import '@/styles/common-variables.scss';-->
<!--</style>-->
