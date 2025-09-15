<script setup lang="ts">
import hyTooltip from '../Tooltip/Tooltip.vue';
import { computed, ref } from 'vue';
import type { TooltipInstance } from '../Tooltip';
import type { PopconfirmEmits, PopconfirmProps } from './types';
import { hyButton } from '../Button';
import { hyIcon } from '../Icon';
import { addUnit } from '@hy-element/utils';
import { useLocale } from '@hy-element/hooks';
defineOptions({
    name: 'hyPopconfirm'
})
const props = withDefaults(defineProps<PopconfirmProps>(), {
    title: '',
    confirmButtonType: 'primary',   
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    icon: 'question-circle',
    iconColor: '#f90',
    hideAfter: 200,
    width: 150,
})
const tooltipRef = ref<TooltipInstance>()
const style = computed(() => ({
    width: addUnit(props.width)
}))
const { t } = useLocale()
const emits = defineEmits<PopconfirmEmits>()
function hidePopper() {
    tooltipRef.value?.hide()
}
function confirm(e: MouseEvent) {
    emits('confirm', e)
    hidePopper()
}
function cancel(e: MouseEvent) {
    emits('cancel', e)
    hidePopper()
}
</script>

<template>
    <hy-tooltip ref="tooltipRef" trigger="click" :hide-timeout="hideAfter">
        <template #content>
            <div class="hy-popconfirm" :style="style">
                <div class="hy-popconfirm__main">
                    <hy-icon v-if="!hideIcon && icon" :icon="icon" :color="iconColor"></hy-icon>
                    {{ title }}
                </div>
                <div class="hy-popconfirm__action">
                    <hy-button class="hy-popconfirm__cancel" :type="cancelButtonType" size="small" @click="cancel">
                        {{ cancelButtonText || t('popconfirm.confirmButtonText') }}
                    </hy-button>
                    <hy-button class="hy-popconfirm__confirm" :type="confirmButtonType" size="small" @click="confirm">
                        {{ confirmButtonText || t('popconfirm.cancelButtonText') }}
                    </hy-button>
                </div>
            </div>
        </template>

        <template v-if="$slots.default" #default>
            <slot name="default"></slot>
        </template>
        <template v-if="$slots.reference" #default>
            <slot name="reference"></slot>
        </template>
    </hy-tooltip>
</template>

<style scoped>
@import './style.css'
</style>
