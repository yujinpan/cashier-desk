<template>
  <div class="dashboard cm-flex-auto">
    <div
      class="order cm-flex-auto__fixed cm-flex-auto cm-flex-column"
      style="width: 400px"
    >
      <CMTable
        class="order-list cm-flex-auto__content"
        :columns="columns"
        :data="data"
        :border="false"
        :order="false"
        :show-overflow-tooltip="false"
        :empty-text="locale.order.emptyMsg"
        height="100%"
      />
      <div class="order-submit cm-flex-auto__fixed cm-flex-space-between">
        <CMButton @click="submit" type="success">{{
          locale.order.submit
        }}</CMButton>
        <Settle @submit="reset()" ref="settle" />

        <Total :value="total" />
      </div>
    </div>
    <div class="menu cm-flex-auto__content cm-scroll">
      <div v-for="item in menuGroup" :key="item.type">
        <CMLabel
          class="cm-margin-bottom-base"
          :label="typeMap[item.type]"
          title
        />
        <ul class="menu__list cm-flex-wrap cm-list-unstyled">
          <li v-for="item in item.data" :key="item.id" class="menu__list-item">
            <CMButton
              v-move-to="[300, 330]"
              @click="add(item)"
              column
              :type="item.type === 'meat' ? 'primary' : 'success'"
            >
              <span class="menu__item-name cm-text-ellipsis-2">
                {{ item.name }}
              </span>
              <span class="menu__item-symbol" style="font-size: 16px"
                >{{ locale.currency.symbol }}&nbsp;</span
              >
              <span class="menu__item-price">{{ item.price }}</span>
            </CMButton>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CMButton, CMLabel, CMTable } from '@greatmap/common-modules';
import { computed, onActivated, onMounted, ref, watch } from 'vue';

import { MoveTo as vMoveTo } from './move-to';
import Settle from './settle.vue';
import Total from './total.vue';
import type { MenuType } from '@/api/menu';
import type { OrderItem } from '@/api/order';

import { getMenuList } from '@/api/menu';
import { orderTotal } from '@/api/order';
import { DICT } from '@/config/dictionary';
import { useLocale } from '@/utils/locale';

const { locale } = useLocale();

const menus = ref<MenuType[]>([]);
const data = ref<OrderItem[]>([]);
const columns = computed(() => [
  { prop: 'name', label: locale.value.order.name },
  {
    prop: 'count',
    label: locale.value.order.count,
    width: '170px',
    type: 'form-control',
    formControlProps: {
      type: 'input_number',
    },
  },
  {
    label: locale.value.handle.handle,
    type: 'handle',
    width: '85px',
    handleButtons: [
      {
        icon: 'el-icon-delete',
        type: 'danger',
        handler: (row) => deleteItem(row),
      },
    ],
  },
]);
const typeMap = ref({});
watch(
  () => locale.value,
  () => {
    typeMap.value = ref(DICT.getMapSync('menu_type'));
  },
  { immediate: true },
);

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

const add = (data1) => {
  const find = data.value.find((item) => item.id === data1.id);
  if (find) {
    find.count++;
  } else {
    data.value.push({
      ...data1,
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
        @media screen and (max-width: 1023px) {
          height: 50px;
        }
      }
    }
  }
  .menu {
    :deep(.cm-label__label-text) {
      font-size: $--font-size-large;
      @media screen and (max-width: 1023px) {
        font-size: $--font-size-extra-small;
      }
    }
    &__list {
      margin-left: -$spacing-base;
      &-item {
        width: 33.33%;
        min-width: 200px;
        padding: 0 0 $spacing-base $spacing-base;
        .cm-button {
          height: 120px;
          padding: 0 $spacing-base;
          width: 100%;
          line-height: 1.3em;
        }

        @media screen and (max-width: 1023px) {
          min-width: 140px;
          .cm-button {
            height: 80px;
          }
        }
      }
    }
    &__item-name {
      font-size: $--font-size-extra-large;
      white-space: normal;
      margin-bottom: $spacing-base;

      @media screen and (max-width: 1023px) {
        font-size: $--font-size-extra-small;
      }
    }
    &__item-symbol,
    &__item-price {
      font-size: 1.35em;
    }
  }
}
</style>
