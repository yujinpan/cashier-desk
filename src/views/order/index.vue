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
    :filter-props="{
      showQueryButton: false,
      showResetButton: false,
    }"
    filter-realtime
  >
    <template #header>
      <CMButton type="primary" @click="exportTable">{{
        locale.order.export
      }}</CMButton>
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
import { computed, onActivated, ref } from 'vue';

import { getOrderList, orderTotal } from '@/api/order';
import { useLocale } from '@/utils/locale';

const { locale } = useLocale();

const data = ref([]);
const columns = computed(() => [
  { prop: 'time', label: locale.value.order.time, minWidth: '300px' },
  {
    prop: 'total',
    label: `${locale.value.order.totalPrice}(${locale.value.currency.name})`,
    minWidth: '160px',
  },
  { prop: 'detail', label: locale.value.order.details, minWidth: '150px' },
]);
const filterParams = ref({
  date: 0,
});
const filterFields = computed(() => [
  {
    prop: 'date',
    type: 'radio_button',
    options: [
      { value: 0, label: locale.value.order.dateAll },
      { value: -1, label: locale.value.order.date1d },
      { value: -7, label: locale.value.order.date1w },
      { value: -30, label: locale.value.order.date1m },
      { value: -90, label: locale.value.order.date3m },
      { value: -180, label: locale.value.order.date6m },
      { value: -365, label: locale.value.order.date12m },
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
          .map(
            (item) => `${item.name}（${item.count}${locale.value.order.per}）`,
          )
          .join(','),
      }))),
    };
  });
};
</script>

<style lang="scss" scoped>
@import '@/styles/common-variables.scss';

:deep(.cm-filter .el-radio-group) {
  white-space: nowrap;
}
</style>
