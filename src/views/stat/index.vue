<template>
  <CMList
    :get-list-method="getListMethod"
    :columns="columns"
    :filter-fields="filterField"
    :filter-params="filterParams"
  >
    <template #header>
      <el-button type="primary" icon="el-icon-plus">创建</el-button>
    </template>
    <template #column-end>
      <el-table-column label="操作">
        <el-button>编辑</el-button>
        <el-button>删除</el-button>
      </el-table-column>
    </template>
  </CMList>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Dashboard extends Vue {
  columns = [
    { prop: 'name', label: '名称' },
    { prop: 'type', label: '类型' },
  ];
  filterField = [
    { prop: 'name', type: 'INPUT', label: '名称' },
    {
      prop: 'type',
      type: 'SELECT',
      label: '类型',
      options: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
      ],
    },
  ];
  filterParams = {
    name: '',
    type: '',
  };

  getListMethod() {
    return Promise.resolve({
      data: [{ name: 1 }, { name: 2 }, { name: 3 }],
      total: 3,
    });
  }
}
</script>

<!--<style lang="scss" scoped>-->
<!--@import '@/styles/common-variables.scss';-->
<!--</style>-->
