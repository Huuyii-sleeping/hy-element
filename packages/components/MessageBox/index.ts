import MessageBox from "./methods";
import { set } from "lodash-es";
import type { App } from 'vue'

export const hyMessageBox = MessageBox

set(hyMessageBox, 'install', (app: App) => {
    app.config.globalProperties.$messagebox = MessageBox
    app.config.globalProperties.$messagebox = MessageBox
    app.config.globalProperties.$alert = MessageBox.alert
    app.config.globalProperties.$confirm = MessageBox.confirm
    app.config.globalProperties.$prompt = MessageBox.prompt
})
export default hyMessageBox
export * from './types'