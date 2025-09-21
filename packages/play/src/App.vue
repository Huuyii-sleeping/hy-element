<template>
    <hy-button @click="drawer=true">test Drawer</hy-button>

    <hy-drawer v-model="drawer" title="test Drawer" direction="top-to-bottom">
        <span> Hi! </span>
    </hy-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const drawer = ref(false)

</script>