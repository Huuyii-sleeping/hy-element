import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3'
import { expect, fn, userEvent, within } from '@storybook/test'
import { hyButton } from 'hy-element'

type Story = StoryObj<typeof hyButton> & { argTypes?: ArgTypes }

const meta: Meta<typeof hyButton> = {
	title: 'Example/Button',
	component: hyButton,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: { type: 'select' },
			options: ['primary', 'success', 'warning', 'danger', 'info', ''],
		},
		size: {
			control: { type: 'select' },
			options: ['large', 'default', 'small', ''],
		},
		disabled: {
			control: 'boolean',
		},
		loading: {
			control: 'boolean',
		},
		useThrottle: {
			control: 'boolean',
		},
		throttleDuration: {
			control: 'number',
		},
		autofocus: {
			control: 'boolean',
		},
		tag: {
			control: { type: 'select' },
			options: ['button', 'a', 'div'],
		},
		nativeType: {
			control: { type: 'select' },
			options: ['button', 'submit', 'reset', ''],
		},
		icon: {
			control: { type: 'text' },
		},
		loadingIcon: {
			control: { type: 'text' },
		},
	},
	args: { onClick: fn() },
} satisfies Meta<typeof hyButton>

const container = (val: string) => {
	return `<div style="margin: 5px">${val}</div>`
}

/**
 * 这个是用来为一个vue组件 定义一个故事 在storyBook当中展示这个组件的不同状态 支持交互控制
 */
export const Default: Story & { args: { content: string } } = {
	/**
	 * 在右侧的输入框能够实时的更改content的值，响应式更新
	 */
	argTypes: { // 定义每个prop控制面板的行为
		content: {
			control: { type: 'text' } // 声明content参数控制类型是文本输入框
		}
	},
	/**
	 * 组件默认渲染成Primary Button
	 */
	args: {
		type: 'primary',
		content: 'Button',
	},
	/**
	 * 自定义渲染函数，用来控制组件如何被渲染
	 */
	render: (args: any) => ({
		// 解构出 onClick，避免 v-bind 包含它
		components: { hyButton },
		setup() {
			return { args } // 分开暴露
		},
		template: container(
			`<hy-button @click="args.onClick" v-bind="args">{{ args.content }}</hy-button>`
		)
	}),
	/**
	 * canvasElement 当前Story的渲染容器
	 * args 传递的参数
	 * step 用来分布记录测试步骤 UI当中显示
	 */
	play: async ({ canvasElement, args, step }: any) => {
		// 将element转化成上下文对象 查找元素
		const canvas = within(canvasElement)

		// click btn步骤的名称 后面是操作
		await step('click btn', async () => {
			// 找到button元素点击 触发内部的click事件
			await userEvent.click(canvas.getByRole('button'))
		})

		expect(args.onClick).toHaveBeenCalled()
	}

}

export default meta