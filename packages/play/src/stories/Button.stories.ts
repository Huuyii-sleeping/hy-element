import type { Meta, StoryObj, ArgTypes } from '@storybook/vue3'
import { clearAllMocks, expect, fn, userEvent, within } from '@storybook/test'
import { hyButton, hyButtonGroup } from 'hy-element'
import { set } from 'lodash-es'

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
			`<hy-button data-testid="story-test-btn" @click="args.onClick" v-bind="args">{{ args.content }}</hy-button>`
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
		const btn = canvas.getByTestId('story-test-btn')

		// click btn步骤的名称 后面是操作
		await step('click btn', async () => {
			// 找到button元素点击 触发内部的click事件
			await userEvent.click(canvas.getByRole('button'))
		})

		expect(args.onClick).toHaveBeenCalled()

		// 测试thorttle是否成功
		await step(
			'when useThorttle is set to true, the onClick should be called one times',
			async () => {
				set(args, 'useThrottle', true)
				await userEvent.tripleClick(btn)
				expect(args.onClick).toHaveBeenCalledOnce()
				clearAllMocks()
			}
		)

		await step(
			'when useThorttle is set to false, the onClick should be called three times',
			async () => {
				set(args, 'useThrottle', false)
				await userEvent.tripleClick(btn)
				expect(args.onClick).toHaveBeenCalledTimes(3)
				clearAllMocks()
			}
		)

		await step(
			'when disabled is set to true, the onClick should not to be called',
			async () => {
				set(args, 'disabled', true)
				await userEvent.click(btn)

				expect(args.onClick).toHaveBeenCalledTimes(0)

				set(args, 'disabled', false)
				await userEvent.click(btn)
				expect(args.onClick).toHaveBeenCalledTimes(1)
				clearAllMocks()
			}
		)

		await step(
			'when laoding is set to true, the onClick should not to be called',
			async () => {
				set(args, 'loading', true)
				await userEvent.click(btn)
				expect(args.onClick).toHaveBeenCalledTimes(0)
				set(args, 'loading', false)
				clearAllMocks()
			}
		)
	}
}

// 测试自动聚焦
export const autofocus: Story & { args: { content: string } } = {
	argsTypes: {
		content: {
			control: { type: 'text' }
		}
	},
	args: {
		content: 'Button',
		autofocus: true
	},
	render: (args: any) => ({
		omponents: { hyButton },
		setup() {
			return { args }
		},
		template: container(
			`<p>请点击浏览器刷新页面获取按钮聚焦</p>
			<hy-button data-testid="story-test-id" v-bind="args">{{ args.content }}</hy-button>`
		)
	}),
	play: async ({ args }: any) => {
		await userEvent.keyboard("{enter}")
		expect(args.onClick).toHaveBeenCalledOnce()
		clearAllMocks()
	}
}

// 测试circle
export const Circle: Story = {
	args: {
		icon: 'search'
	},
	render: (args: any) => ({
		components: { hyButton },
		setup() {
			return { args }
		},
		template: container(
			`<hy-button circle v-bind="args"></hy-button>`
		),
	}),
	play: async ({ canvasElement, args, step }: any) => {
		const canvas = within(canvasElement)
		const btn = canvas.getByRole('button')
		await step('click button', async () => {
			await userEvent.click(btn)
		})
		expect(args.onClick).toHaveBeenCalled()
	}
}

export const Group: Story & { args: { content1: string; content2: string } } = {
	argTypes: {
		groupType: {
			control: { type: 'select' },
			options: ['primary', 'success', 'warning', 'danger', 'info', ''],
		},
		groupSize: {
			control: { type: 'select' },
			options: ['large', 'default', 'small', ''],
		},
		groupDisabled: {
			control: 'boolean',
		},
		content1: {
			control: { type: 'text' },
			defaultValue: 'Button1',
		},
		content2: {
			control: { type: 'text' },
			defaultValue: 'Button2',
		},
	},
	args: {
		round: true,
		content1: 'Button1',
		content2: 'Button2',
	},
	render: (args: any) => ({
		components: { hyButton, hyButtonGroup }, //用 hyButtonGroup 包裹多个按钮，实现按钮组布局
		setup() {
			return { args }
		},
		//:type="args.groupType"：按钮组的主题类型（如 primary）
		//:size="args.groupSize"：按钮组的大小（如 large）
		//:disabled="args.groupDisabled"：按钮组的禁用状态
		template: container(`
       <hy-button-group :type="args.groupType" :size="args.groupSize" :disabled="args.groupDisabled">
         <hy-button v-bind="args">{{args.content1}}</hy-button>
         <hy-button v-bind="args">{{args.content2}}</hy-button>
       </hy-button-group>
    `),
	}),
	play: async ({
		canvasElement,
		args,
		step,
	}: {
		canvasElement: HTMLElement
		args: any
		step: any
	}) => {
		const canvas = within(canvasElement)
		await step('click btn1', async () => {
			await userEvent.click(canvas.getByText('Button1'))
		})
		await step('click btn2', async () => {
			await userEvent.click(canvas.getByText('Button2'))
		})
		expect(args.onClick).toHaveBeenCalled()
	},
}


export default meta