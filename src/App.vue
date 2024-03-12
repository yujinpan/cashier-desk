<template>
  <div id="app" class="cm-full-height">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';

import { getMenuList, updateLocalData } from '@/api/menu';
import { getMenuData } from '@/api/menu-data';
import { DICT } from '@/config/dictionary';
import { useLocale } from '@/utils/locale';

const { locale } = useLocale();

watch(
  () => locale.value,
  async () => {
    DICT.add('menu_type', [
      { value: 'meat', label: locale.value.menu.meat },
      { value: 'vegetarian', label: locale.value.menu.vegetarian },
    ]);

    const menuList = await getMenuList();
    const localeMenuList = getMenuData();
    localeMenuList.forEach((item) => {
      const find = menuList.find((i) => item.id === i.id);
      if (find) {
        find.name = item.name;
      }
    });
    updateLocalData(menuList);
  },
  { immediate: true },
);
</script>

<!--<style lang="scss" scoped></style>-->
