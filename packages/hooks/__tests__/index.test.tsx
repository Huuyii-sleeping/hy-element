import { describe, expect, it } from "vitest";
import {useClickOutside, useEventListener } from "../index";

describe('hooks/index', () => {
    it('useClickOutside should be exported', () => {
        expect(useClickOutside).toBeDefined()
    })

    it('useEventListener', () => {
        expect(useEventListener).toBeDefined()
    })
})