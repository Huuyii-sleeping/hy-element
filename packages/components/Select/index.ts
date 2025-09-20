import Select from "./Select.vue";
import Options from "./Options.vue";
import { withInstall } from "@hy-element/utils";

export const hySelect = withInstall(Select) 
export const hyOptions = withInstall(Options)
export * from './types'