import { describe, it, expect } from "vitest";
import {
    hyButton,
    hyButtonGroup,
    hyAlert,
    hyCollapse,
    hyCollapseItem,
    hyIcon,
    hyTooltip,
} from '../index'
import type { Plugin } from "vue";
import { get, map } from "lodash-es";

const comps = [
    hyButton,
    hyButtonGroup,
    hyAlert,
    hyCollapse,
    hyCollapseItem,
    hyIcon,
    hyTooltip,
] as Plugin[]

describe('component/index', () => {
    it.each(map(comps, (c) => [get(c, 'name')??'', c]))('%s should be exported', (_, component) => {
        expect(component).toBeDefined()
        expect(component.install).toBeDefined()
    })
})




