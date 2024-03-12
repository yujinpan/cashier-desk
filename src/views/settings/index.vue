<template>
  <div class="settings">
    <CMLabel
      class="cm-margin-bottom-large"
      :label="locale.settings.settings"
      label-weight="bold"
      font-size="16px"
    />
    <CMForm :model="model" :fields="fields" label-width="auto" />
  </div>
</template>

<script lang="ts" setup>
import { CMForm, CMLabel } from '@greatmap/common-modules';
import { computed, reactive, watch } from 'vue';

import { useLocale } from '@/utils/locale';

const { locale, lang, langs, setLang } = useLocale();

const model = reactive({
  lang: lang.value,
});

watch(
  () => lang.value,
  (val) => (model.lang = val),
  { immediate: true },
);

const fields = computed(() => [
  {
    prop: 'lang',
    label: locale.value.language.language,
    type: 'radio_button',
    options: langs.map((item) => ({
      value: item,
      label: locale.value.language[item],
    })),
    onChange: (val) => setLang(val),
  },
]);
</script>

<!--<style lang="scss" scoped>-->
<!--@import '@/styles/common-variables.scss';-->
<!--</style>-->
