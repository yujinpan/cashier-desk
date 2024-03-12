<template>
  <div class="dashboard cm-flex-auto">
    <div
      class="order cm-flex-auto__fixed cm-flex-auto cm-flex-column"
      style="width: 400px"
    >
      <CMTable
        ref="CMTable"
        class="order-list cm-flex-auto__content"
        :columns="columns"
        :data="data"
        :border="false"
        :order="false"
        :show-overflow-tooltip="false"
        empty-text="购物车为空"
        height="100%"
      />
      <div class="order-submit cm-flex-auto__fixed cm-flex-space-between">
        <CMButton @click="submit" type="success">下单</CMButton>
        <Settle @submit="reset()" ref="settle" />

        <Total :value="total" />
      </div>
    </div>
    <div class="menu cm-flex-auto__content cm-scroll-y">
      <div v-for="item in menuGroup" :key="item.type">
        <CMLabel
          class="cm-margin-bottom-base"
          :label="typeMap[item.type]"
          label-size="26px"
          title
        />
        <ul class="menu__list cm-flex-wrap cm-list-unstyled">
          <li v-for="item in item.data" :key="item.id" class="menu__list-item">
            <CMButton
              v-move-to="[300, 330]"
              @click="add(item)"
              column
              style="line-height: 35px"
              :type="item.type === 'meat' ? 'primary' : 'success'"
            >
              <span
                class="cm-text-ellipsis-2"
                style="font-size: 30px; white-space: normal"
              >
                {{ item.name }}
              </span>
              <span style="font-size: 16px">¥&nbsp;</span>
              <span>{{ item.price }}</span>
            </CMButton>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CMButton, CMLabel, CMTable } from '@greatmap/common-modules';
import { computed, onActivated, onMounted, ref } from 'vue';

import { MoveTo as vMoveTo } from './move-to';
import Settle from './settle.vue';
import Total from './total.vue';
import type { MenuType } from '@/api/menu';
import type { OrderItem } from '@/api/order';

import { getMenuList } from '@/api/menu';
import { orderTotal } from '@/api/order';
import { DICT } from '@/config/dictionary';

const menus = ref<MenuType[]>([]);
const data = ref<OrderItem[]>([]);
const columns = ref([
  { prop: 'name', label: '名称' },
  {
    prop: 'count',
    label: '数量',
    width: '170px',
    type: 'form-control',
    formControlProps: {
      type: 'input_number',
    },
  },
  {
    label: '删除',
    type: 'handle',
    width: '80px',
    handleButtons: [
      {
        icon: 'el-icon-delete',
        type: 'danger',
        handler: (row) => deleteItem(row),
      },
    ],
  },
]);
const typeMap = DICT.getMapSync('menu_type');

const menuGroup = computed<{ type: string; data: MenuType[] }[]>(() => {
  return menus.value.reduce((a, b) => {
    const find = a.find((item) => item.type === b.type);
    if (find) {
      find.data.push(b);
      return a;
    } else {
      return a.concat([{ type: b.type, data: [b] }]);
    }
  }, []);
});
const total = computed(() => {
  return orderTotal(data.value);
});

const deleteItem = (row) => {
  const index = data.value.indexOf(row);
  data.value.splice(index, 1);
};

const add = (data) => {
  const find = data.value.find((item) => item.id === data.id);
  if (find) {
    find.count++;
  } else {
    data.value.push({
      ...data,
      count: 1,
    });
  }
};

const settle = ref<Settle>();
const submit = () => {
  if (!data.value.length) return;

  settle.value.open(data.value);
};

const update = () => {
  getMenuList().then((res) => {
    menus.value = res;
  });
};

const reset = () => {
  data.value = [];
};

onActivated(() => {
  update();
});

onMounted(() => {
  update();
});
</script>

<style lang="scss" scoped>
@import '@/styles/common-variables.scss';

.dashboard {
  .order {
    border-right: $--border-base;
    margin-right: $spacing-medium;
    padding-right: $spacing-medium;
    &-list {
      :deep(.el-input-number) {
        width: 150px;
      }
    }
    &-submit {
      padding-top: $spacing-medium;
      .cm-button {
        width: 40%;
        height: 80px;
      }
    }
  }
  .menu {
    &__list {
      margin-left: -$spacing-base;
      &-item {
        width: 33.33%;
        padding: 0 0 $spacing-base $spacing-base;
        .cm-button {
          height: 120px;
          padding: $spacing-medium $spacing-base;
          width: 100%;
        }
      }
    }
  }
}
</style>
