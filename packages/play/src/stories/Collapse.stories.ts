import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3'
import { hyCollapse, hyCollapseItem } from 'hy-element'

type Story = StoryObj<typeof hyCollapse> & { argTypes?: ArgTypes }

const meta: Meta<typeof hyCollapse> = {
    title: 'Example/Collapse',
    component: hyCollapse,
    tags: ['autodocs'],
} satisfies Meta<typeof hyCollapse>

/**
 * 这个是用来为一个vue组件 定义一个故事 在storyBook当中展示这个组件的不同状态 支持交互控制
 */
export const Default: Story & { args: { content: string } } = {
    render: (args: any) => ({
        components: {
            hyCollapse,
            hyCollapseItem,
        },
        setup(){
            return {
                args
            }
        },
        template: `
            <hy-collapse v-bind="args">
                <hy-collapse-item name="a" title="Title a">
                    <div>this is content a</div>
                </hy-collapse-item>
                <hy-collapse-item name="b" title="Title b">
                    <div>this is content b</div>
                </hy-collapse-item>
                <hy-collapse-item name="c" title="Title c disabled" disabled>
                    <div>this is content c</div>
                </hy-collapse-item>
            </hy-collapse>
        `
    }) as any,
    args: {
        according: true,
        modelValue: ['a']
    } as any,
}


export default meta