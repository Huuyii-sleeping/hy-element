import { Loading } from "./service";
import type { App } from 'vue'
export const hyLoading = {
    name: 'hyLoading',
    install(app: App) {
        app.config.globalProperties.$loading = Loading
    },
    // directive todo
    service: Loading,
}

export default hyLoading
export {
    Loading as hyLoadingService
}
export * from './types'