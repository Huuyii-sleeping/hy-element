import type { StoryObj, Meta, ArgTypes } from '@storybook/vue3'
import { ref, watch } from 'vue'
import { fn } from '@storybook/test'
import { hyAlert, type AlertInstance } from 'hy-element'
import 'hy-element/dist/index.css'

type Story = StoryObj<typeof hyAlert> & { argTypes?: ArgTypes }

const meta: Meta<typeof hyAlert> = {
	title: 'Example/Alert',
	component: hyAlert,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: ['success', 'warning', 'info', 'danger'],
		},
		effect: {
			control: 'select',
			options: ['light', 'dark'],
		},
		center: {
			control: 'boolean',
		},
	},
	args: {
		onClose: fn(),
	},
}

export const Default: Story & { args: { visible: boolean } } = {
	args: {
		title: '标题',
		description: '这是一段描述',
		type: 'success',
		effect: 'light',
		closable: true,
		showIcon: true,
		visible: true,
	},
	render: (args: any) => ({
		components: { hyAlert },
		setup() {
			const alertRef = ref<AlertInstance>()
			watch(
				() => (args as any).visible,
				(val: boolean) => {
					if (val) {
						alertRef.value?.open()
					} else {
						alertRef.value?.close()
					}
				}
			)
			return { args, alertRef }
		},
		template: `
     <hy-alert ref="alertRef" v-bind="args"></hy-alert>
    `,
	}) as any,
}

export default meta