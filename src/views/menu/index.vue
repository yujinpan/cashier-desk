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
    :filter-props="{
      showQueryButton: false,
      showResetButton: false,
    }"
    filter-realtime
  >
    <template #header>
      <el-button @click="createMenu()" type="primary" icon="el-icon-plus">{{
        locale.menu.create
      }}</el-button>
    </template>
  </CMList>
</template>

<script lang="ts" setup>
import { promptForm, CMList, createValidator } from '@greatmap/common-modules';
import { MessageBox } from 'element-ui';
import { computed, ref } from 'vue';

import type { MenuType } from '@/api/menu';

import { addMenu, deleteMenu, getMenuList, updateMenu } from '@/api/menu';
import { DICT } from '@/config/dictionary';
import { useLocale } from '@/utils/locale';

const { locale } = useLocale();

const columns = computed(() => [
  { label: locale.value.menu.number, prop: 'order', minWidth: '80px' },
  {
    prop: 'type',
    label: locale.value.menu.type,
    dictionary: DICT.get('menu_type'),
    type: 'tag',
    tagType: (val) =>
      val === DICT.getSync('menu_type')[0].label ? 'primary' : 'success',
    minWidth: '100px',
  },
  { prop: 'name', label: locale.value.menu.name, minWidth: '100px' },
  {
    prop: 'price',
    label: `${locale.value.order.unitPrice}(${locale.value.currency.name})`,
    minWidth: '160px',
  },
  {
    type: 'handle',
    label: locale.value.handle.handle,
    width: '260px',
    handleButtons: [
      {
        label: locale.value.handle.edit,
        text: false,
        type: 'primary',
        handler: (row) => createMenu(row),
      },
      {
        label: locale.value.handle.delete,
        text: false,
        type: 'warning',
        handler: (row) => {
          return MessageBox.confirm(locale.value.handle.confirmDeleteMsg).then(
            () => {
              return deleteMenu(row.id).then(() => {
                handleSuccess();
              });
            },
          );
        },
      },
    ],
  },
]);
const filterField = computed(() => [
  {
    prop: 'type',
    type: 'radio_button',
    label: locale.value.menu.type,
    options: [
      { value: '', label: locale.value.menu.all },
      ...DICT.getSync('menu_type'),
    ],
  },
]);
const filterParams = ref({
  type: '',
  name: '',
});

const handleSuccess = () => {
  MessageBox.alert(locale.value.handle.successMsg, {
    type: 'success',
  });
  refresh();
};

const list = ref<typeof CMList>();
const refresh = () => {
  list.value.getList();
};

const createMenu = (row: Partial<MenuType> = {}) => {
  const requireValidator = createValidator(
    locale.value.validate.required,
    (val) => !!val,
  );
  const numberValidator = createValidator(locale.value.validate.number, (val) =>
    /\d/g.test(val),
  );

  return promptForm({
    model: {
      ...row,
    },
    fields: [
      {
        label: locale.value.menu.type,
        prop: 'type',
        type: 'radio_button',
        options: DICT.get('menu_type'),
        rules: [requireValidator],
        value: DICT.getSync('menu_type')[0].value,
      },
      {
        label: locale.value.menu.name,
        prop: 'name',
        rules: [requireValidator],
      },
      {
        label: `${locale.value.order.unitPrice}(${locale.value.currency.name})`,
        prop: 'price',
        rules: [requireValidator, numberValidator],
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
  :deep(.cm-filter .el-radio-group) {
    white-space: nowrap;
  }
}
</style>
