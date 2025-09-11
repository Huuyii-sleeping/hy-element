<template>
    <i class="hy-icon" :class="[`hy-icon-${props.type}`]" :style="customStyles" v-bind="$attrs">
        <font-awesome-icon v-bind="fliterProps" />
    </i>
</template>

<script setup lang="ts">
import type { IconProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { omit } from 'lodash-es';
import { computed } from 'vue';
defineOptions({
    name: 'hyIcon',
    inheritAttrs: false
    // 这个属性是用来将父亲传递的非需要参数舍弃，因为一些没有定义的方式也会传递下来
})
const props = defineProps<IconProps>()
const fliterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => ({ color: props.color ?? void 0 }))
</script>

<style scoped>
@import './style.css'
</style>