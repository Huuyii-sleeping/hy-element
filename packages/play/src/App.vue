<template>
    <button @click="changeLang">切换语言</button>
    <hyConfigProvider :locale="locale">
        <hy-popconfirm title="remove">
            <button>delete</button>
        </hy-popconfirm>
    </hyConfigProvider>
</template>

<script setup lang="ts">
import { ja, ko, en, zhCn, zhTw } from 'hy-element';
import { get } from 'lodash-es';
import { computed, ref } from 'vue';

const language = ref('')
const langMap = {
    ja,
    ko,
    en,
    zhCn,
    zhTw,
} as const
const locale = computed(() => get(langMap, language.value))
const changeLang = computed(() => {
    const l = ['zhCn', 'zhTw', 'ko', 'en', 'ja']
    language.value = l[(l.indexOf(language.value) + 1) % l.length]
    console.log(language.value)
}) as any

</script>

<style scoped>
</style>