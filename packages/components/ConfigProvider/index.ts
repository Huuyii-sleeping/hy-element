import ConfigProvider from "./ConfigProvider.vue";
import { withInstall } from "@hy-element/utils";

export const hyConfigProvider = withInstall(ConfigProvider)
export * from './types'
export * from './hooks'