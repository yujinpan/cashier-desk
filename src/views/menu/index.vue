<template>
  <CMList
    class="menu"
    ref="list"
    :get-list-method="getListMethod"
    :columns="columns"
    :filter-fields="filterField"
    :filter-params="filterParams"
    :pagination="false"
    :table-props="{ order: false, showOverflowTooltip: false }"
    filter-realtime
  >
    <template #header>
      <el-button @click="createMenu()" type="primary" icon="el-icon-plus"
        >创建</el-button
      >
    </template>
  </CMList>
</template>

<script lang="ts" setup>
import { promptForm, showMessage, CMList } from '@greatmap/common-modules';
import { MessageBox } from 'element-ui';
import { ref } from 'vue';

import type { MenuType } from '@/api/menu';

import { addMenu, deleteMenu, getMenuList, updateMenu } from '@/api/menu';
import { DICT } from '@/config/dictionary';

const columns = ref([
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
        handler: (row) => updateMenu(row),
      },
      {
        label: '删除',
        text: false,
        type: 'warning',
        handler: (row) => {
          return MessageBox.confirm('确认删除吗？').then(() => {
            return deleteMenu(row.id).then(() => {
              handleSuccess();
            });
          });
        },
      },
    ],
  },
]);
const filterField = ref([
  {
    prop: 'type',
    type: 'radio_button',
    label: '类型',
    options: [{ value: '', label: '全部' }, ...DICT.getSync('menu_type')],
  },
]);
const filterParams = ref({
  type: '',
  name: '',
});

const handleSuccess = () => {
  showMessage('操作成功', 'success');
  refresh();
};

const list = ref<typeof CMList>();
const refresh = () => {
  list.value.getList();
};

const createMenu = (row: Partial<MenuType> = {}) => {
  return promptForm({
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
        handleSuccess();
      }),
  });
};

const getListMethod = () => {
  return getMenuList(filterParams.value).then((res) => ({
    total: res.length,
    data: res.map((item, index) => ({
      order: index + 1,
      ...item,
    })),
  }));
};
</script>

<style lang="scss" scoped>
@import '@/styles/common-variables.scss';

.menu {
}
</style>
