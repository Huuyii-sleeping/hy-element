import { createApp } from 'vue'
import App from './App.vue'
import hyElement, { zhCn } from 'hy-element'
import 'hy-element/dist/index.css'

createApp(App).use(hyElement, { locale: zhCn }).mount('#app')
