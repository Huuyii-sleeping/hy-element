import Message from "./methods"
import { withInstallFunction } from "@hy-element/utils"

// 将message挂载到vue的组件实例上面 可以script拿到这个组件使用 直接弹窗
export const hyMessage = withInstallFunction(Message, '$message')

export * from './types'