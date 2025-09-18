import { vLoading } from "./directive";
import { Loading } from "./service";
import type { App } from 'vue'
export const hyLoading = {
    name: 'hyLoading',
    install(app: App) {
        app.directive('loading', vLoading)
        app.config.globalProperties.$loading = Loading
    },
    // directive todo
    directive: vLoading,
    service: Loading,
}

export default hyLoading
export {
    vLoading,
    vLoading as hyLoadingDirective,
    Loading as hyLoadingService
}
export * from './types'