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
        <Settle @submit="reset()" ref="Settle" />

        <Total :value="total" />
      </div>
    </div>
    <div class="menu cm-flex-auto__content cm-scroll-y">
      <div v-for="item in menuGroup" :key="item.type">
        <CMLabel
          class="cm-margin-bottom-base"
          :label="typeMap[item.type]"
          title
        />
        <CMButton
          v-for="item in item.data"
          :key="item.id"
          @click="add(item)"
          class="menu-item"
          column
          :type="item.type === 'meat' ? 'primary' : 'success'"
        >
          <p>
            {{ item.name }}<br />
            <span style="font-size: 16px">¥&nbsp;</span>
            <span>{{ item.price }}</span>
          </p>
        </CMButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { getMenuList } from '../../api/menu';
import type { MenuType } from '../../api/menu';
import type { OrderItem } from '../../api/order';
import { orderTotal } from '../../api/order';
import { DICT } from '../../config/dictionary';
import Settle from './settle.vue';
import Total from './total.vue';

@Component({
  components: {
    Total,
    Settle,
  },
})
export default class Dashboard extends Vue {
  menus: MenuType[] = [];

  data: OrderItem[] = [];
  columns = [
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
          handler: (row) => {
            this.delete(row);
          },
        },
      ],
    },
  ];

  typeMap = DICT.getMapSync('menu_type');

  get menuGroup(): { type: string; data: MenuType[] }[] {
    return this.menus.reduce((a, b) => {
      const find = a.find((item) => item.type === b.type);
      if (find) {
        find.data.push(b);
        return a;
      } else {
        return a.concat([{ type: b.type, data: [b] }]);
      }
    }, []);
  }

  get total() {
    return orderTotal(this.data);
  }

  delete(row) {
    const index = this.data.indexOf(row);
    this.data.splice(index, 1);
  }

  add(data) {
    const find = this.data.find((item) => item.id === data.id);
    if (find) {
      find.count++;
    } else {
      this.data.push({
        ...data,
        count: 1,
      });
    }
  }

  submit() {
    if (!this.data.length) return;

    (this.$refs.Settle as Settle).open(this.data);
  }

  reset() {
    this.data = [];
  }

  update() {
    getMenuList().then((res) => {
      this.menus = res;
    });
  }

  activated() {
    this.update();
  }

  mounted() {
    this.update();
  }
}
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
    &-item {
      height: 100px;
      padding: $spacing-large;
      margin: 0 $spacing-medium $spacing-medium 0;
      line-height: 35px;
    }
  }
}
</style>
