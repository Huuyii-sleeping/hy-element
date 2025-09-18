<template>
    <div class="hy-switch" :class="{
        [`hy-switch--${size}`]: size,
        'is-disabled': isDisabled,
        'is-checked': checked,
    }" @click="handleChange">
        <input class="hy-switch__input" type="checkbox" role="switch" ref="inputRef" :id="inputId" :name="name"
            :disabled="isDisabled" :checked="checked" @keydown.enter="handleChange" />
        <div class="hy-switch__core">
            <div class="hy-switch__core-inner">
                <span v-if="activeText || inactiveText" class="hy-switch__core-inner-text">
                    {{ checked ? activeText : inactiveText }}
                </span>
            </div>
            <div class="hy-switch__core-action"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { SwitchProps, SwitchEmits, SwitchInstance } from './types'
import { useId } from '@hy-element/hooks';
defineOptions({
    name: 'hySwitch',
    inheritAttrs: false
})

const props = withDefaults(defineProps<SwitchProps>(), {
    activeValue: true,
    inactiveValue: false
})
const emits = defineEmits<SwitchEmits>()
const isDisabled = computed(() => props.disabled)
const innerValue = ref(props.modelValue)
const inputId = useId().value
const inputRef = ref<HTMLInputElement>()
const checked = computed(() => innerValue.value === props.activeValue)
const focus: SwitchInstance['focus'] = function () {
    inputRef.value?.focus()
}

const handleChange = () => {
    if (isDisabled.value) return
    const newVal = checked.value ? props.inactiveValue : props.activeValue
    innerValue.value = newVal
    emits('update:modelValue', newVal)
    emits('change', newVal)
}
onMounted(() => {
    inputRef.value!.checked = checked.value

})
watch(checked, (val) => {
    inputRef.value!.checked = val
    // todo form校验的逻辑
})
defineExpose({
    checked,
    focus,
})
</script>

<style scoped>
@import './style.css'
</style>