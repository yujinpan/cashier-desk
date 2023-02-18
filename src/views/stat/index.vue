<template>
  <div class="stat cm-flex-auto cm-flex-column">
    <div ref="statDay" class="stat-day cm-flex-auto__content"></div>
    <div ref="statProds" class="stat-prods cm-flex-auto__content"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts/core';
import { Component, Vue } from 'vue-property-decorator';

import {
  getOrdersTotalByDay,
  getOrdersTotalByDayAndProduction,
} from '../../api/order';
import { totalDay, totalProds } from './data';

@Component
export default class Dashboard extends Vue {
  commonChartOptions = {
    tooltip: {
      show: true,
    },
    grid: {
      left: 30,
      right: 30,
      bottom: 36,
    },
    legend: {
      show: true,
    },
  };

  async initStatDay() {
    const chart = echarts.init(this.$refs.statDay as HTMLElement);
    const data = await getOrdersTotalByDay();

    if (!data.length) {
      data.push(...totalDay);
    }

    chart.setOption({
      ...this.commonChartOptions,
      title: {
        text: '每日营收总额',
      },
      xAxis: {
        data: data.map((item) => item.date),
      },
      yAxis: {},
      series: [
        {
          name: '金额（元）',
          type: 'bar',
          barWidth: 40,
          data: data.map((item) => item.total),
        },
      ],
    });
  }

  async initStatProds() {
    const chart = echarts.init(this.$refs.statProds as HTMLElement);
    const data = await getOrdersTotalByDayAndProduction();

    if (!data.length) {
      data.push(...totalProds);
    }

    chart.setOption({
      ...this.commonChartOptions,
      title: {
        text: '每日各产品营收',
      },
      xAxis: {
        data: data[0].data.map((item) => item.date),
      },
      yAxis: {},
      series: data.map((item) => ({
        name: item.name,
        type: 'line',
        barWidth: 40,
        data: item.data.map((item) => item.total),
      })),
    });
  }

  update() {
    this.initStatDay();
    this.initStatProds();
  }

  activated() {
    this.update();
  }

  mounted() {
    this.update();
  }
}
</script>

<!--<style lang="scss" scoped>-->
<!--@import '@/styles/common-variables.scss';-->
<!--</style>-->
