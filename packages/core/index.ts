import '@hy-element/theme/index.css'
import { makeInstaller } from '@hy-element/utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import component from './component'

library.add(fas)
const installer = makeInstaller(component)

export * from '@hy-element/components'
export default installer