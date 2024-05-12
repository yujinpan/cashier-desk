<template>
  <div class="stat cm-flex-auto cm-flex-column">
    <div ref="statDay" class="stat-day cm-flex-auto__content"></div>
    <div ref="statProds" class="stat-prods cm-flex-auto__content"></div>
  </div>
</template>

<script lang="ts" setup>
import { toMap } from '@greatmap/common-modules';
import * as echarts from 'echarts/core';
import { onActivated, onMounted, ref } from 'vue';

import {
  getOrdersTotalByDay,
  getOrdersTotalByDayAndProduction,
} from '@/api/order';
import { useLocale } from '@/utils/locale';

const { locale } = useLocale();

const commonChartOptions = ref({
  tooltip: {
    show: true,
  },
  grid: {
    top: 40,
    left: 30,
    right: 30,
    bottom: 36,
  },
  legend: {
    show: true,
    right: 0,
    width: '60%',
    type: 'scroll',
  },
});

const statDay = ref<HTMLElement>();
const chartStatDay = ref();
const initStatDay = async () => {
  if (!chartStatDay.value) {
    chartStatDay.value = echarts.init(statDay.value);
  }

  const data = await getOrdersTotalByDay();

  chartStatDay.value.setOption({
    ...commonChartOptions.value,
    title: {
      text: locale.value.stat.totalDailyRevenue,
    },
    xAxis: {
      data: data.map((item) => item.date),
    },
    yAxis: {},
    series: [
      {
        name: `${locale.value.order.totalPrice}(${locale.value.currency.name})`,
        type: 'bar',
        barMaxWidth: 40,
        data: data.map((item) => item.total),
      },
    ],
  });
};

const statProds = ref<HTMLElement>();
const chartStatProds = ref();
const initStatProds = async () => {
  if (!chartStatProds.value) {
    chartStatProds.value = echarts.init(statProds.value);
  }

  const data = await getOrdersTotalByDayAndProduction();

  chartStatProds.value.setOption({
    ...commonChartOptions.value,
    title: {
      text: locale.value.stat.productDailyRevenue,
    },
    xAxis: {
      data: data[0].data.map((item) => item.date),
    },
    yAxis: {},
    series: data.map((item) => ({
      name: item.name,
      type: 'line',
      data: item.data.map((item) => item.total),
      smooth: true,
    })),
  });
  chartStatProds.value.setOption({
    legend: {
      selected: toMap(
        data.map((item, index) => ({ name: item.name, selected: index < 7 })),
        'name',
        'selected',
      ),
    },
  });
};

const update = () => {
  initStatDay();
  initStatProds();
};

onActivated(() => {
  update();
});

onMounted(() => {
  update();
});
</script>

<!--<style lang="scss" scoped>-->
<!--@import '@/styles/common-variables.scss';-->
<!--</style>-->
