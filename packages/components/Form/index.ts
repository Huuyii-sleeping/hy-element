import Form from "./Form.vue";
import FormItem from "./FormItem.vue";

import { withInstall } from "@hy-element/utils";

export const hyForm = withInstall(Form)
export const hyFormItem = withInstall(FormItem)

export * from './types'
export * from './hooks'