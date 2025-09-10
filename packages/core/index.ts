import '@hy-element/theme'
import { makeInstaller } from '@hy-element/utils'
import component from './component'

const installer = makeInstaller(component)

export * from '@hy-element/components'
export default installer