import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import { message, closeAll } from './methods'

export const rAF = async () => {
    return new Promise((res) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(async () => {
                res(null)
                await nextTick()
            })
        })
    })
}

function getTopValue(element: Element) {
    const styles = window.getComputedStyle(element)
    const topValue = styles.getPropertyValue('top')
    return Number.parseFloat(topValue)
}

describe('createMessage', () => {
    test('调用方法应该创建对应的 Message 组件', async () => {
        const handler = message({ message: 'hello msg', duration: 0 })
        await rAF()
        expect(document.querySelector('.hy-message')).toBeTruthy()
        handler.close()
        await rAF()
        expect(document.querySelector('.hy-message')).toBeFalsy()
    })

    test('多次调用应该创建多个实例', async () => {
        message({ message: 'hello msg', duration: 0 })
        message({ message: 'hello msg2', duration: 0 })
        await rAF()
        expect(document.querySelectorAll('.hy-message').length).toBe(2)
        closeAll()
        await rAF()
        expect(document.querySelectorAll('.hy-message').length).toBe(0)
    })
})