<script setup lang="ts">
import { computed, inject, nextTick, onMounted, onUnmounted, provide, reactive, ref, toRefs, type Ref } from 'vue';
import { FORM_CTX_EKY, FORM_ITEM_CTX_KEY } from './constants';
import type { FormItemContext, FormItemInstance, FormItemProps, FormItemRule, FormValidateCallback, FormValidateFailuer, ValidateStatus } from './types';
import { isNil, get, isString, size, filter, map, keys, includes, isArray, cloneDeep, some } from 'lodash-es';
import Schema, { type RuleItem } from 'async-validator';
import { useId } from '@hy-element/hooks';

defineOptions({
    name: 'hyFormItem'
})

const props = withDefaults(defineProps<FormItemProps>(), {
    required: void 0,
    showMessage: true,
})
const slots = defineSlots()
const ctx = inject(FORM_CTX_EKY)

const labelId = useId().value

// 记录表单检验的状态
const validateStatus: Ref<ValidateStatus> = ref('init')

const errMsg = ref('')

const inputIds = ref<string[]>([])

const getValByProp = (target: Record<string, any> | void) => {
    if (target && props.prop && !isNil(get(target, props.prop))) {
        return get(target, props.prop) // 从target当中拿到对应的prop的值
    }
    return null
}

const hasLabel = computed(() => !!(props.label || slots.label))

const labelFor = computed(() => props.for || (inputIds.value.length ? inputIds.value[0] : ''))

const currentLabel = computed(() => `${props.label ?? ''}${ctx?.labelSuffix ?? ''}`)

const isDisabled = computed(() => ctx?.disabled || props.disabled)

const isRequired = computed(() => !ctx?.hideRequiredAsterisk && (some(itemRules.value, 'required')) || props.required)

// 拿到表单项内部的值
const innerVal = computed(() => {
    const model = ctx?.model
    return getValByProp(model)
})

let initialVal: any = null
let isResetting: boolean = false

const propString = computed(() => {
    if (!props.prop) return ''
    return isString(props.prop) ? props.prop : props.prop.join('.')
})


// 用来动态合并和处理表单字段的验证规则
const itemRules = computed(() => {
    const { required } = props
    const rules: FormItemRule[] = [] // 初始化数组
    if (props.rules) { // 合并自身的规则
        rules.push(...props.rules)
    }
    const formRules = ctx?.rules
    if (formRules && props.prop) { // 合并全局表单的规则
        const _rules = getValByProp(formRules) // 拿到表单target相应字段规则
        if (_rules) rules.push(..._rules)
    }
    if (!isNil(required)) { // 统一处理required
        // 筛选出已经包含required属性的规则
        const requiredRules = filter(
            map(rules, (rule, i) => [rule, i]), // 创建一个新的数组，成为 [rule, i]的形式
            // 利用filter对结果进行筛选
            // 拿到当前遍历到的对象的属性名字（key），检查当前的名字中是否含有required字段 最终留下的是包含required字段的属性
            (item: [FormItemRule, number]) => includes(keys(item[0]), 'required')
        )
        if (size(requiredRules)) {
            // 如果存在required的规则，就统一更新为props.required的值
            for (const item of requiredRules) {
                const [rule, i] = item as [FormItemRule, number]
                if (rule.required === required) continue // 已经存在了就跳过
                // 需要鉴别的加入rules
                rules[i] = { ...rule, required } // 否则直接覆盖即可
                // 每个rule都是自己的若干个规则
            }
        } else {
            rules.push({ required })
        }
    }

    return rules
})

function getTriggeredRules(trigger: string) {
    const rules = itemRules.value
    if (!rules) return []
    return filter(rules, (r) => {
        if (!r?.trigger || !trigger) return true
        if (isArray(r.trigger)) {
            return r.trigger.includes(trigger)
        }
        return r.trigger === trigger
    }).map(({ trigger, ...rule }) => rule as RuleItem) // 将trigger进行筛选
}

async function doValidate(rules: RuleItem[]) {
    // 获取要进行验证的字段名
    const modelName = propString.value
    // 创建验证器 [名字]：rules
    const validator = new Schema({ [modelName]: rules })
    // 字段名：验证的值 后面的意思是只返回一个验证失败的错误
    return validator.validate({ [modelName]: innerVal.value }, { firstFields: true }).then(() => {
        validateStatus.value = 'success'
        ctx?.emits('validate', props, true, '')
        return true
    }).catch((err: FormValidateFailuer) => {
        const { errors } = err
        validateStatus.value = 'error'
        // err-msg
        errMsg.value = errors && size(errors) > 0 ? errors[0].message ?? '' : ''
        ctx?.emits('validate', props, false, errMsg.value)
        return Promise.reject(err)
    })
}

// 门面模式
// 暴露一个更加简单的接口 屏蔽了底层复杂的细节 实现高内聚低耦合
const validate: FormItemInstance['validate'] = async function (
    trigger: string,
    callback?: FormValidateCallback
) {
    if (isResetting || !props.prop || isDisabled.value) return false
    if (!validateStatus.value) {
        callback?.(false)
        return false
    }
    const rules = getTriggeredRules(trigger)
    if (!size(rules)) {
        callback?.(true) // 可以用来判断是否渲染成功
        return true
    }
    validateStatus.value = 'validating'
    return doValidate(rules).then(() => {
        callback?.(true)
        return true
    }).catch((err: FormValidateFailuer) => {
        const { fields } = err
        callback?.(false, fields)
        return Promise.reject(fields)
    })
}

const resetField: FormItemContext['resetField'] = function () {
    const model = ctx?.model
    if (model && propString.value && !isNil(get(model, propString.value))) {
        isResetting = true
        model[propString.value] = cloneDeep(initialVal)
    }
    nextTick(() => clearValidate())
}

const clearValidate: FormItemContext['clearValidate'] = function () {
    validateStatus.value = 'init'
    errMsg.value = ''
    isResetting = false
}

const addInputId: FormItemContext['addInputId'] = function (id) {
    if (!includes(inputIds.value, id)) inputIds.value.push(id)
}

const removeInputId: FormItemContext['removeInputId'] = function (id) {
    inputIds.value = filter(inputIds.value, (i) => i !== id)
}

const formItemCtx: FormItemContext = reactive({
    ...toRefs(props),
    disabled: isDisabled,
    validate,
    resetField,
    clearValidate,
    addInputId,
    removeInputId,
})

onMounted(() => {
    if (!props.prop) return
    ctx?.addField(formItemCtx)
    initialVal = innerVal.value
})

onUnmounted(() => {
    if (!props.prop) return
    ctx?.removeField(formItemCtx)
})

provide<FormItemContext>(FORM_ITEM_CTX_KEY, formItemCtx)

defineExpose<FormItemInstance>({
    validateMessage: errMsg,
    validateStatus,
    validate,
    resetField,
    clearValidate,
})
</script>

<template>
    <div class="hy-form-item" :class="{
        'is-error': validateStatus === 'error',
        'is-disabled': isDisabled,
        'is-required': isRequired,
        'asterisk-left': ctx?.requiredAsteriskPosition === 'left',
        'asterisk-right': ctx?.requiredAsteriskPosition === 'right'
    }">
        <component v-if="hasLabel" class="hy-form-item__label" :class="`position-${ctx?.labelPosition} ?? 'right'`"
            :is="labelFor ? 'label' : 'div'" :id="labelId" :for="labelFor">
            <slot name="label" :label="currentLabel">{{ currentLabel }}</slot>
        </component>
        <div class="hy-form-item__content">
            <slot :validate="validate"></slot>
            <div class="hy-form-item_error-msg" v-if="validateStatus === 'error'">
                <template v-if="ctx?.showMessage && showMessage">
                    <!-- 这个errMsg可以将错误的原因暴露出去 -->
                    <slot name="error" :error="errMsg">{{ errMsg }}</slot>
                </template>
            </div>
        </div>
    </div>
</template>