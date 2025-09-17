<script setup lang="ts">
import { ja, ko, en, zhCn, zhTw, hyConfigProvider } from "hy-element";
import { get } from "lodash-es";

import { computed, ref } from "vue";

const language = ref("");
const langMap = {
  ja,
  ko,
  en,
  zhCn,
  zhTw,
} as const;
const locale = computed(() => get(langMap, language.value));
const changelang = () => {
  const l = ["zhCn", "zhTw", "ko", "en", "ja"];
  language.value = l[(l.indexOf(language.value) + 1) % l.length];
};
</script>
<template>
  <hy-button @click="changelang" type="info" style="margin-right: 20px"
    >change language</hy-button
  >
  <hy-config-provider :locale="locale">
    <hy-popconfirm title="Are you shure to delete this item?">
      <hy-button>Delete</hy-button>
    </hy-popconfirm>
  </hy-config-provider>
</template>
