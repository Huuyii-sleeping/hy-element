import { describe, it, expect, vi } from "vitest";
import { throwError, debugWarn } from "../error";

describe('error', () => {

    it('throwError should be worked', () => {
        expect(() => {
            throwError('scope', 'msg')
        }).toThrow('[scope]: msg')
    })

    it('debugWarn should be worked', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => { })
        debugWarn('scope', 'msg')
        debugWarn(new SyntaxError('custom error'))
        // 测试抛出错误
        expect(warn.mock.calls).toMatchInlineSnapshot(`
          [
            [
              [hyUIERROR: [scope]: msg],
            ],
            [
              [SyntaxError: custom error],
            ],
          ]
        `)
    })
})