<template>
  <CMList
    ref="CMList"
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
  />
</template>

<script lang="ts">
import { getTimeStampByDay } from '@greatmap/common-modules';
import { Component, Vue } from 'vue-property-decorator';

import { getOrderList, orderTotal } from '../../api/order';
import type { CMList } from '@greatmap/common-modules';

@Component
export default class Dashboard extends Vue {
  columns = [
    { prop: 'time', label: '日期', type: 'date', width: '300px' },
    { prop: 'total', label: '金额(元)', width: '150px' },
    { prop: 'detail', label: '详情' },
  ];

  filterParams = {
    date: 0,
  };
  filterFields = [
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
  ];

  activated() {
    (this.$refs.CMList as typeof CMList).getList();
  }

  getListMethod() {
    let startTime;
    let endTime;
    if (this.filterParams.date) {
      startTime = getTimeStampByDay(this.filterParams.date);
      endTime = Date.now();
    }

    return getOrderList({
      startTime,
      endTime,
    }).then((res) => {
      return {
        total: res.length,
        data: res.map((item) => ({
          time: item.time,
          total: orderTotal(item.orders),
          detail: item.orders
            .map((item) => `${item.name}（${item.count}个）`)
            .join(','),
        })),
      };
    });
  }
}
</script>

<!--<style lang="scss" scoped>-->
<!--@import '@/styles/common-variables.scss';-->
<!--</style>-->
