import { rAF } from "@hy-element/utils";
import { describe, expect, it } from "vitest";
import { Loading } from './service'

describe('Loading', () => {
    it('should create Loading instance', () => {
        const instance = Loading()
        expect(instance).toBeTruthy()
    })

    it('should render mask', async () => {
        Loading()
        await rAF()
        expect(document.querySelector('.hy-loading__mask')).toBeTruthy()
    })

    it('should close loading and remove it from DOM', async () => {
        const instance = Loading()
        await rAF()
        expect(document.querySelector('.hy-loading')).toBeTruthy()
        instance.close()
        await rAF()
        expect(document.querySelector('.hy-loading')).toBeFalsy()
    })
})
