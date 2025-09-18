<template>
    <transition name="fade-in-linear" @after-leave="destroy">
        <hy-overlay v-show="(visible as Ref).value" :z-index="state.zIndex" mask>
            <!-- 点击外层关闭的封装 -->
            <div ref="dialog" class="hy-overlay-message-box" @click="handleWrapperClick">
                <div ref="rootRef" :class="[
                    'hy-message-box',
                    {
                        'is-center': state.center
                    }
                ]" @click.stop>

                    <div v-if="!isNil(state.title)" ref="headerRef" class="hy-message-box__header"
                        :class="{ 'show-close': state.showClose }">
                        <div class="hy-message-box__title">
                            <hy-icon v-if="iconComponent && state.center"
                                :class="{ [`hy-icon-${state.type}`]: state.type }" :icon="iconComponent"></hy-icon>
                            {{ state.title }}
                        </div>
                        <button v-if="showClose" class="hy-message-box__header-btn" @click.stop="handleClose">
                            <hy-icon icon="xmark"></hy-icon>
                        </button>
                    </div>

                    <div class="hy-message-box__content">
                        <hy-icon :class="{ [`hy-icon-${state.type}`]: state.type }"
                            v-if="iconComponent && !state.center && hasMessage" :icon="iconComponent">
                        </hy-icon>
                        <div v-if="hasMessage" class="hy-message-box__message">
                            <slot>
                                <component :is="state.showInput ? 'label' : 'p'"
                                    :for="state.showInput ? inputId : void 0">
                                    {{ state.message }}
                                </component>
                            </slot>
                        </div>
                    </div>

                    <div v-show="state.showInput" class="hy-message-box__input">
                        <hy-input v-model="state.inputPlaceholder" ref="inputRef" :placeholder="state.inputPlaceholder"
                            :type="state.inputType" @keyup.enter="handleInputEnter"></hy-input>
                    </div>
                    <div class="hy-message-box__footer">
                        <hy-button v-if="state.showCancelButton"
                            class="hy-message-box__footer-btn hy-message-box__cancel-btn" :type="state.cancelButtonType"
                            :round="state.roundButton" :loading="state.cancelButtonLoading"
                            @click="handleAction('cancel')" @keydown.prevent.enter="handleAction('cancel')">
                            {{ state.cancelButtonText }}
                        </hy-button>
                        <hy-button v-show="state.showConfirmButton"
                            class="hy-message-box__footer-btn hy-message-box__confirm-btn"
                            :type="state.confirmButtonType ?? 'primary'" :round="state.roundButton"
                            :loading="state.confirmButtonLoading" @click="handleAction('confirm')"
                            @keydown.prevent.enter="handleAction('confirm')">
                            {{ state.confirmButtonText }}
                        </hy-button>
                    </div>
                </div>
            </div>
        </hy-overlay>
    </transition>
</template>

<script setup lang="ts">
import type { InputInstance } from '../Input/types';
import type { MessageBoxAction, MessageBoxProps } from './types';
import { useZindex, useId } from '@hy-element/hooks';
import { reactive, computed, ref, watch, nextTick, type Ref } from 'vue';
import { typeIconMap } from '@hy-element/utils';
import hyOverlay from '../Overlay/Overlay.vue'
import hyIcon from '../Icon/Icon.vue'
import hyButton from '../Button/Button.vue';
import hyInput from '../Input/Input.vue';
import { isFunction, isNil } from 'lodash-es';

defineOptions({
    name: 'hyMessageBox',
    inheritAttrs: false
})
const props = withDefaults(defineProps<MessageBoxProps>(), {
    lockScroll: true,
    showClose: true,
    closeOnClickModal: true,
    confirmButtonType: "primary",
    roundButton: false,
    boxType: "",
    inputValue: "",
    inputPlaceholder: 'Please input...',
    confirmButtonText: "Ok",
    cancelButtonText: "Cancel",
    showConfirmButton: true,
})

const { doAction } = props
const { nextZindex } = useZindex()
const headerRef = ref<HTMLElement>()
const inputRef = ref<InputInstance>()
const inputId = useId()
const state = reactive({
    ...props,
    zIndex: nextZindex()
})
const hasMessage = computed(() => !!state.message)
const iconComponent = computed(() => state.icon ?? typeIconMap.get(state.type ?? ''))

watch(() => props.visible?.value, (val) => {
    if (val) state.zIndex = nextZindex()
    if (props.boxType !== 'prompt') return
    if (!val) return
    // 执行聚焦
    nextTick(() => {
        inputRef.value && inputRef.value.focus
    })
})

function handleWrapperClick() {
    props.closeOnClickModal && handleAction('close')
}

function handleInputEnter(e: KeyboardEvent) {
    if (state.inputType === 'textarea') return
    e.preventDefault() // 阻止默认行为 就像阻止浏览器的提交行为一样,(提交会导致页面刷新)
    return handleAction('confirm')
}

function handleAction(action: MessageBoxAction) {
    isFunction(props.beforeClose)
        ? props.beforeClose(action, state, () => doAction(action, state.inputValue))
        : doAction(action, state.inputValue);
}

function handleClose() {
    handleAction('close')
}
</script>

<style scoped>
@import './style.css'
</style>