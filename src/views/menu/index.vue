<template>
  <CMList
    class="menu"
    ref="CMList"
    :get-list-method="getListMethod"
    :columns="columns"
    :filter-fields="filterField"
    :filter-params="filterParams"
    :pagination="false"
    :table-props="{ order: false, showOverflowTooltip: false }"
    filter-realtime
  >
    <template #header>
      <el-button @click="updateMenu()" type="primary" icon="el-icon-plus"
        >创建</el-button
      >
    </template>
  </CMList>
</template>

<script lang="ts">
import { promptForm, showMessage } from '@greatmap/common-modules';
import { Component, Vue } from 'vue-property-decorator';

import type { MenuType } from '../../api/menu';
import { addMenu, deleteMenu, getMenuList, updateMenu } from '../../api/menu';
import { DICT } from '../../config/dictionary';
import type { CMList } from '@greatmap/common-modules';

@Component
export default class Dashboard extends Vue {
  columns = [
    { label: '序号', prop: 'order', width: '80px' },
    {
      prop: 'type',
      label: '类型',
      dictionary: DICT.get('menu_type'),
      type: 'tag',
      tagType: (val) => (val === '荤菜' ? 'primary' : 'success'),
    },
    { prop: 'name', label: '名称' },
    { prop: 'price', label: '价格(元)' },
    {
      type: 'handle',
      label: '操作',
      width: '260px',
      handleButtons: [
        {
          label: '编辑',
          text: false,
          type: 'primary',
          handler: this.updateMenu,
        },
        {
          label: '删除',
          text: false,
          type: 'warning',
          handler: (row) => {
            return this.$confirm('确认删除吗？').then(() => {
              return deleteMenu(row.id).then(() => {
                this.handleSuccess();
              });
            });
          },
        },
      ],
    },
  ];
  filterField = [
    {
      prop: 'type',
      type: 'radio_button',
      label: '类型',
      options: [{ value: '', label: '全部' }, ...DICT.getSync('menu_type')],
    },
  ];
  filterParams = {
    type: '',
    name: '',
  };

  handleSuccess() {
    showMessage('操作成功', 'success');
    this.refresh();
  }

  refresh() {
    (this.$refs.CMList as typeof CMList).getList();
  }

  updateMenu(row: Partial<MenuType> = {}) {
    return promptForm(this.$createElement, {
      model: {
        ...row,
      },
      fields: [
        {
          label: '类型',
          prop: 'type',
          type: 'radio_button',
          options: DICT.get('menu_type'),
          rules: ['required'],
          value: DICT.getSync('menu_type')[0].value,
        },
        { label: '名称', prop: 'name', rules: ['required'] },
        {
          label: '价格(元)',
          prop: 'price',
          rules: ['required', 'number'],
          number: true,
        },
      ],
      submit: (model) =>
        (model.id ? updateMenu : addMenu)(model).then(() => {
          this.handleSuccess();
        }),
    });
  }

  getListMethod() {
    return getMenuList(this.filterParams).then((res) => ({
      total: res.length,
      data: res.map((item, index) => ({
        order: index + 1,
        ...item,
      })),
    }));
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/common-variables.scss';

.menu {
}
</style>
