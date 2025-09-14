import type { StoryObj, Meta, ArgTypes } from '@storybook/vue3'
import { fn } from '@storybook/test'
import { hyTooltip } from 'hy-element'
import 'hy-element/dist/index.css'

type Story = StoryObj<typeof hyTooltip> & { argTypes?: ArgTypes }

const meta: Meta<typeof hyTooltip> = {
    title: 'Example/Tooltip',
    component: hyTooltip,
    tags: ['autodocs'],
    // 定义对应的类型选择
    argTypes: {
        trigger: {
            options: ['hover', 'click', 'contextmenu'],
            control: {
                type: 'select'
            },
        },
        placement: {
            options: ['top', 'bottom', 'left', 'right'],
            control: {
                type: 'select'
            }
        },
        showTimeout: {
            control: {
                type: 'number'
            }
        },
        hideTimeout: {
            control: {
                type: 'number'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            }
        },
        manual: {
            control: {
                type: 'boolean'
            }
        }
    },
    args: {
        content: 'This is a Tooltip',
        placement: 'top',
        trigger: 'hover',
        showTimeout: 0,
        hideTimeout: 200,
        disabled: false,
        manual: false,
        "onVisible-change": fn()
    }
}

export const Default: Story = {
    args: {
        content: 'this is a Tooltip',
        placement: 'top',
        trigger: 'hover',
    },
    render: (args: any) => ({
        components: { hyTooltip },
        setup() {
            return { args }
        },
        template: `
            <div style="padding: 50px">
                <hyTooltip v-bind="args">
                    <button>悬停</button>
                </hyTooltip>
            </div>
        `
    }) as any
}

export const clickTrigger: Story = {
    args: {
        ...Default.args,
        trigger: 'click'
    },
    render: (args: any) => ({
        components: { hyTooltip },
        setup() {
            return { args }
        },
        template: `
            <div style="padding: 50px">
                <hyTooltip v-bind="args">
                    <button>点击</button>
                </hyTooltip>
            </div>
        `
    }) as any
}

export const contextMenuTrigger: Story = {
    args: {
        ...Default.args,
        trigger: 'contextmenu'
    },
    render: (args: any) => ({
        components: { hyTooltip },
        setup() {
            return { args }
        },
        template: `
            <div style="padding: 50px;">
                <hyTooltip v-bind="args">
                    <button style="padding: 10px 20px;">右键我</button>
                </hyTooltip>
            </div>
        `
    }) as any
}

export const PlacementBottom: Story = {
    args: {
        ...Default.args,
        placement: 'bottom',
    },
    render: Default.render, // 复用 Default 的 render
}

export const PlacementLeft: Story = {
    args: {
        ...Default.args,
        placement: 'left',
    },
    render: Default.render,
}

export const PlacementRight: Story = {
    args: {
        ...Default.args,
        placement: 'right',
    },
    render: Default.render,
}

// ========================
// ⏱️ 自定义延迟
// ========================
export const CustomDelay: Story = {
    args: {
        ...Default.args,
        showTimeout: 500,
        hideTimeout: 1000,
    },
    render: (args: any) => ({
        components: { hyTooltip },
        setup() {
            return { args }
        },
        template: `
            <div style="padding: 50px;">
                <hyTooltip v-bind="args">
                    <button>悬停我（延迟 0.5s 打开，1s 关闭）</button>
                </hyTooltip>
            </div>
        `,
    }) as any,
}

// ========================
// 🚫 禁用状态
// ========================
export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    },
    render: (args: any) => ({
        components: { hyTooltip },
        setup() {
            return { args }
        },
        template: `
            <div style="padding: 50px;">
                <hyTooltip v-bind="args">
                    <button>禁用状态（悬停无反应）</button>
                </hyTooltip>
            </div>
        `,
    }) as any,
}

// ========================
// 💡 使用插槽自定义内容
// ========================
export const WithCustomContent: Story = {
    args: {
        ...Default.args,
        content: '', // 清空 content，使用插槽
    },
    render: (args: any) => ({
        components: { hyTooltip },
        setup() {
            return { args }
        },
        template: `
            <div style="padding: 50px;">
                <hyTooltip v-bind="args">
                    <template #default>
                        <button>悬停查看自定义内容</button>
                    </template>
                    <template #content>
                        <div style="padding: 8px; background: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
                            <p>🎉 这是自定义内容</p>
                            <p>支持 <strong>HTML</strong> 和 <em>样式</em></p>
                        </div>
                    </template>
                </hyTooltip>
            </div>
        `,
    }) as any,
}

export default meta