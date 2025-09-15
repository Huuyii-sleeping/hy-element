import '@hy-element/theme/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import component from './component'
import printLogo from './printLogo'
import makeInstaller from './makeInstaller'

printLogo()
library.add(fas)
const installer = makeInstaller(component)

export * from '@hy-element/locale'
export * from '@hy-element/components'
export default installer