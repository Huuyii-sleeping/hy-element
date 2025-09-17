import { describe, expect, test } from "vitest";
import { nextTick } from "vue";
import { notification } from './methods'

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

describe('notification', () => {
    test('notification() function', async () => {
        const handler = notification({ message: 'test msg', duration: 0 })
        await rAF()
        expect(document.querySelector('.hy-notification')).toBeTruthy()
        handler.close()
        await rAF()
        expect(document.querySelector('.hy-notification')).toBeFalsy()
    })

    test('call notification() function more than once', async () => {
        notification({ message: 'hello msg', duration: 0 })
        notification({ message: 'hello msg1', duration: 0 })
        await rAF()

        expect(document.querySelectorAll('.hy-notification').length).toBe(2)
        notification.closeAll()
        await rAF()
        expect(document.querySelectorAll('.hy-notification').length).toBe(0)
    })

    test('notification offset', async () => {
        notification({ message: 'hello msg', duration: 0, offset: 100 })
        notification({ message: 'hello msg', duration: 0, offset: 50 })
        await rAF()
        const elements = document.querySelectorAll('.hy-notification')
        expect(elements.length).toBe(2)
        expect(getTopValue(elements[0])).toBe(100)
        expect(getTopValue(elements[1])).toBe(150)
    })
})

