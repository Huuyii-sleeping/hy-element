<template>
    <div class="hy-dropdown" :class="{ 'is-disabled': props.disabled }">
        <hy-tooltip ref="tooltipRef" v-bind="tooltipProps" :virtual-triggering="splitButton" :virtual-ref="virtualRef?.value"
            @visible-change="$emit('visible-change', $event)">
            <!-- 按钮组触发相对应的事件 -->
            <hy-button-group v-if="splitButton" :type="type" :size="size" :disabled="disabled">
                <hy-button @click="$emit('click', $event)">
                    <slot name="default"></slot>
                </hy-button>
                <hy-button ref="triggerRef" icon="angle-down"></hy-button>
            </hy-button-group>
            <slot name="default" v-else></slot>
            <template #content>
                <div class="hy-dropdown__menu">
                    <slot name="dropdown">
                        <template v-for="item in items" :key="item.command">
                            <dropdown-item v-bind="item"></dropdown-item>
                        </template>
                    </slot>
                </div>
            </template>
        </hy-tooltip>
    </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue';
import type { TooltipInstance } from '../Tooltip/index';
import type { ButtonInstance } from '../Button/index';
import { hyButtonGroup, hyButton } from '../Button/index';
import type { DropdownProps, DropdownItemProps, DropdownEmits, DropdownInstance, DropdownContent } from './types';
import { isNil, omit } from 'lodash-es';
import DropdownItem from './DropdownItem.vue';
import hyTooltip from '../Tooltip/Tooltip.vue';
import { DROPDOWN_CTX_KEY } from './constants';
import { useDisabledStyle } from '@hy-element/hooks';

defineOptions({
    name: 'hyDropdown',
    inheritAttrs: false
})
const props = withDefaults(defineProps<DropdownProps>(), {
    hideOnclick: true,
    items: () => [] as DropdownItemProps[]
})
const emits = defineEmits<DropdownEmits>()
const slots = defineSlots()
const tooltipRef = ref<TooltipInstance>()
const triggerRef = ref<ButtonInstance>()
const virtualRef = computed(() => triggerRef.value?.ref ?? void 0)
const tooltipProps = computed(() => omit(props, ['items', 'hideOnclick', 'size', 'type', 'splitButton']))

function handleItemClick(e: DropdownItemProps) {
    props.hideOnclick && tooltipRef.value?.hide()
    !isNil(e.command) && emits('command', e.command)
}
!TEST && useDisabledStyle()
provide<DropdownContent>(DROPDOWN_CTX_KEY, {
    handleItemClick,
    size: computed(() => props.size)
})
defineExpose<DropdownInstance>({
    open: () => tooltipRef.value?.show(),
    close: () => tooltipRef.value?.hide()
})
</script>

<style scoped>
@import './style.css';

:deep(.hy-button-group){
    & > :last-child {
        padding: 5px 7px;
    }
}
</style>