<script setup lang="ts">
import {
    assign,
    find,
    get,
    each,
    noop,
    isFunction,
    filter,
    isNil,
    isBoolean,
    map,
    size,
    eq,
    includes,
    debounce,
} from "lodash-es"
import {
    ref,
    reactive,
    computed,
    onMounted,
    provide,
    useSlots,
    watch,
    h,
    nextTick,
    type Ref,
    type VNode,
} from "vue"
import type {
    SelectProps,
    SelectEmits,
    SelectOptionProps,
    SelectContext,
    SelectInstance,
    SelectStates,
} from "./types"
import type { TooltipInstance } from "../Tooltip/types"
import type { InputInstance } from "../Input/types"
import { useFocusController, useClickOutside, useId } from "@hy-element/hooks"
import { SELECT_CTX_KEY, POPPER_OPTIIONS } from "./constants"

import hyTooltip from "../Tooltip/Tooltip.vue"
import hyIcon from "../Icon/Icon.vue"
import hyInput from "../Input/Input.vue"
import hyOption from "./Options.vue"
import { debugWarn, RenderVnode } from "@hy-element/utils"
import useKeyMap from "./useKeyMap"

const COMPONENT_NAME = 'hySelect' as const

defineOptions({
    name: COMPONENT_NAME,
})
const props = withDefaults(defineProps<SelectProps>(), {
    options: () => [],
})
const emits = defineEmits<SelectEmits>()

const initialOption = findOption(props.modelValue)

const selectRef = ref<HTMLElement>()
const tooltipRef = ref<TooltipInstance>()
const inputRef = ref<InputInstance>()

const isDropdownVisible = ref(false)
const filteredOptions = ref(props.options ?? [])
const filteredChilds: Ref<Map<VNode, SelectOptionProps>> = ref(new Map())

const selectStates = reactive<SelectStates>({
    inputValue: initialOption?.label ?? "",
    selectedOption: initialOption,
    mouseHover: false,
    loading: false,
    highlightedIndex: -1,
})

const slots = useSlots()
const {
    wrapperRef: inputWrapperRef,
    isFocus,
    handleBlur,
    handleFocus,
} = useFocusController(inputRef)

const hasData = computed(
    () =>
        (hasChildren.value && filteredChilds.value.size > 0) ||
        (!hasChildren.value && size(filteredOptions.value) > 0)
)

// 最大长度
const lastIndex = computed(() =>
    hasChildren.value
        ? filteredChilds.value.size - 1
        : size(filteredOptions.value) - 1
)

// 对对应的点击值进行操作
const highlightedLine = computed(() => {
    let result: SelectOptionProps | void
    if (hasChildren.value) {
        const node = [...filteredChilds.value][selectStates.highlightedIndex]?.[0]
        result = filteredChilds.value.get(node)
    } else {
        result = filteredOptions.value[selectStates.highlightedIndex]
    }
    return result
})

// 键盘事件触发
const keyMap = useKeyMap({
    isDropdownVisible,
    controlVisible,
    selectStates,
    highlightedLine,
    handleSelect,
    hasData,
    lastIndex,
})

useClickOutside(selectRef, (e) => handleClickOutsie(e))

const children = computed(() =>
    filter(slots?.default?.(), (child) => eq(child.type, hyOption))
)

const hasChildren = computed(() => size(children.value) > 0)

const childrenOptsions = computed(() => {
    if (!hasChildren.value) return []
    return map(children.value, (item) => ({
        vNode: h(item),
        props: assign(item.props, {
            disabled:
                // 应对disabled没有进行值的传递的问题
                item.props?.disabled === true ||
                (!isNil(item.props?.disabled) && !isBoolean(item.props?.disabled)),
        }),
    }))
})

const filterPlaceholder = computed(() => {
    return props.filterable &&
        selectStates.selectedOption &&
        isDropdownVisible.value
        ? selectStates.selectedOption.label
        : props.placeholder
})

const isNoData = computed(() => {
    if (!props.filterable) return false
    if (!hasData.value) return true
    return false
})

const timeout = computed(() => props.remote ? 300 : 100)

const handleFilterDebounce = debounce(handleFilter, timeout.value)

const showClear = computed(
    () =>
        props.clearable && selectStates.mouseHover && selectStates.inputValue !== ""
)

const isDisabled = computed(() => props.disabled)

const focus: SelectInstance["focus"] = function () {
    inputRef.value?.focus()
}

const blur: SelectInstance["blur"] = function () {
    handleClickOutsie()
}

const inputId = useId().value

function renderLabel(opt: SelectOptionProps): VNode | string {
    if (isFunction(props.renderLabel)) {
        return props.renderLabel(opt)
    }
    return opt.label
}

function controlVisible(visible: boolean) {
    if (!tooltipRef.value) return
    get(tooltipRef, ["value", visible ? "show" : "hide"])?.()
    props.filterable && controlInputVal(visible)
    isDropdownVisible.value = visible
    emits("visible-change", visible)
    selectStates.highlightedIndex = -1
}

function controlInputVal(visible: boolean) {
    if (!props.filterable) return
    if (visible) {
        if (selectStates.selectedOption) selectStates.inputValue = ''
        handleFilterDebounce()
    } else {
        selectStates.inputValue = selectStates.selectedOption?.label || ''
    }
}

function toggleVisible() {
    if (isDisabled.value) return
    controlVisible(!isDropdownVisible.value)
}

function findOption(value: string) {
    return find(props.options, (option) => option.value === value)
}

function setFilteredChilds(opts: typeof childrenOptsions.value) {
    filteredChilds.value.clear()
    each(opts, (item) => {
        filteredChilds.value.set(item.vNode, item.props as SelectOptionProps)
    })
}

function handleFilter() {
    const selectKey = selectStates.inputValue
    selectStates.highlightedIndex = -1

    // slot
    if (hasChildren.value) {
        genFilterChilds(selectKey)
        return
    }
    // options
    genFilterOptions(selectKey)
}

function handleKeydown(e: KeyboardEvent) {
    keyMap.has(e.key) && keyMap.get(e.key)?.(e)
}

async function genFilterChilds(search: string) {
    if (!props.filterable) return
    if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
        // remote search
        await callRemoteMethod(props.remoteMethod, search)
        setFilteredChilds(childrenOptsions.value)
        return
    }
    if (props.filterMethod && isFunction(props.filterMethod)) {
        // filter search
        const opts = map(props.filterMethod(search), 'value')
        setFilteredChilds(filter(childrenOptsions.value,
            (item) =>
                includes(opts, get(item, ['props', 'value']))))
        return
    }
    // default seatch
    setFilteredChilds(
        filter(childrenOptsions.value,
            (item) =>
                includes(get(item, ['props', 'label']), search))
    )
}

async function genFilterOptions(search: string) {
    if (props.filterable) return
    if (props.remote && props.remoteMethod && isFunction(props.remoteMethod)) {
        // remote search
        filteredOptions.value = await callRemoteMethod(props.remoteMethod, search)
        return
    }
    if (props.filterMethod && isFunction(props.filterMethod)) {
        // filter 
        filteredOptions.value = props.filterMethod(search)
        return
    }
    // 返回筛选之后的options
    filteredOptions.value = filter(props.options, (opt) => includes(opt.label, search))
}

async function callRemoteMethod(method: Function, search: string) {
    if (!method || !isFunction(method)) return
    selectStates.loading = true
    let result
    try {
        result = await method(search)
    } catch (error) {
        debugWarn(error as Error)
        debugWarn(COMPONENT_NAME, 'callRemoteMethod error')
        result = []
        return Promise.reject(error)
    }
    return result
}

function handleClickOutsie(e?: Event) {
    if (isFocus.value) {
        nextTick(() => handleBlur(new FocusEvent("focus", e)))
    }
}

function handleSelect(o: SelectOptionProps) {
    if (o.disabled) return

    selectStates.inputValue = o.label
    selectStates.selectedOption = o
    each(["change", "update:modelValue"], (k) => emits(k as any, o.value))
    controlVisible(false)
    inputRef.value?.focus()
}

function setSelected() {
    const option = findOption(props.modelValue)
    if (!option) return
    selectStates.inputValue = option.label
    selectStates.selectedOption = option
}

function handleClear() {
    inputRef.value?.clear()
    selectStates.inputValue = ""
    selectStates.selectedOption = null

    emits("clear")
    each(["change", "update:modelValue"], (k) => emits(k as any, ""))
}

// 对应的选择进行监听 做到及时的更新 
watch(
    () => props.options,
    (newOpts) => {
        filteredOptions.value = newOpts ?? []
    }
)

watch(
    () => childrenOptsions.value,
    (newOpts) => setFilteredChilds(newOpts),
    { immediate: true }
)

watch(
    () => props.modelValue,
    () => {
        setSelected()
    }
)

onMounted(() => {
    setSelected()
})

provide<SelectContext>(SELECT_CTX_KEY, {
    handleSelect,
    selectStates,
    renderLabel,
    highlightedLine,
})

defineExpose<SelectInstance>({
    focus,
    blur,
})
</script>

<template>
    <div ref="selectRef" class="hy-select" :class="{
        'is-disabled': isDisabled,
    }" @click.stop="toggleVisible" @mouseenter="selectStates.mouseHover = true"
        @mouseleave="selectStates.mouseHover = false">
        <hy-tooltip ref="tooltipRef" placement="bottom-start" :popper-options="POPPER_OPTIIONS"
            @click-outside="controlVisible(false)" manual>
            <template #default>
                <div ref="inputWrapperRef">
                    <hy-input ref="inputRef" v-model="selectStates.inputValue" :id="inputId" :disabled="isDisabled"
                        :placeholder="filterable ? filterPlaceholder : placeholder"
                        :readonly="!filterable || !isDropdownVisible" @focus="handleFocus" @blur="handleBlur"
                        @input="handleFilterDebounce" @keydown="handleKeydown">
                        <template #suffix>
                            <hy-icon v-if="showClear" icon="circle-xmark" class="hy-input__clear"
                                @click.stop="handleClear" @mousedown.prevent="noop" />
                            <hy-icon v-else class="header-angle" icon="angle-down"
                                :class="{ 'is-active': isDropdownVisible }" />
                        </template>
                    </hy-input>
                </div>
            </template>
            <template #content>
                <div class="hy-select__loading" v-if="selectStates.loading">
                    <hy-icon icon="spinner" spin />
                </div>
                <div class="hy-select__nodata" v-else-if="filterable && isNoData">
                    No data
                </div>
                <ul class="hy-select__menu" v-else>
                    <template v-if="!hasChildren">
                        <hy-option v-for="item in filteredOptions" :key="item.value" v-bind="item" />
                    </template>
                    <!-- 展示处理成功的值 -->
                    <template v-else>
                        <template v-for="[_VNode, _props] in filteredChilds" :key="_props.value">
                            <render-vnode :vNode=_VNode></render-vnode>
                        </template>
                    </template>
                </ul>
            </template>
        </hy-tooltip>
    </div>
</template>

<style scoped>
@import "./style.css"
</style>