<script setup lang="ts">
import type { FormContext, FormEmits, FormInstance, FormItemContext, FormProps } from './types';
import { FORM_CTX_EKY } from './constants';
import { provide, reactive, toRefs } from 'vue';
import { each, filter, includes, size } from 'lodash-es';
import type { ValidateFieldsError } from 'async-validator';
defineOptions({
    name: 'hyForm'
})
const props = withDefaults(defineProps<FormProps>(), {
    showMessage: true,
    hideRequiredAsterisk: false, // 隐藏必填提示选项
    requiredAsteriskPosition: 'left',
    labelPosition: 'right',
})
const emits = defineEmits<FormEmits>()

const fields: FormItemContext[] = [] // 判别队列

async function doValidateField(fields: FormItemContext[] = []) {
    let validateErrors: ValidateFieldsError = {}
    for (const field of fields) {
        try {
            await field.validate('')
        } catch (error) {
            validateErrors = {
                ...validateErrors,
                ...(error as ValidateFieldsError)
            }
        }
    }
    if (!size(Object.keys(validateErrors))) return true
    return Promise.reject(validateErrors)
}

const addField: FormContext['addField'] = function (field) {
    if (!field.prop) return
    fields.push(field)
}

const removeField: FormContext['removeField'] = function (field) {
    if (!field.prop) return
    fields.splice(fields.indexOf(field), 1)
}

const validate: FormInstance['validate'] = function (callback) {
    return validateField([], callback)
}

const validateField: FormInstance['validateField'] = async function (keys, callback) {
    try {
        const result = await doValidateField(filterFilelds(fields, keys ?? []))
        if (result === true) callback?.(result)
        return result
    } catch (error) {
        if (error instanceof Error) throw error
        const invalidField = error as ValidateFieldsError
        callback?.(false, invalidField)
        return Promise.reject(invalidField)
    }
}

const resetFields: FormInstance['resetFields'] = function (keys) {
    each(filterFilelds(fields, keys ?? []), (field) => field.resetField())
}

const clearValidate: FormInstance['clearValidate'] = function () {

}

function filterFilelds(fields: FormItemContext[], keys: string[]) {
    return size(keys) ? filter(fields, (field) => includes(keys, field.prop)) : fields
}

const formCtx: FormContext = reactive({
    ...toRefs(props),
    emits,
    addField,
    removeField,
})

provide(FORM_CTX_EKY, formCtx)

defineExpose<FormInstance>({
    validate,
    validateField,
    resetFields,
    clearValidate,
})
</script>

<template>
    <form class="hy-form">
        <slot></slot>
    </form>
</template>