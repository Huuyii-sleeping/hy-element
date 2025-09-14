<script setup lang="ts">
	import type { AlertProps, AlertEmits, AlertInstance } from './types'
	import { ref, useSlots, computed } from 'vue'
	import { typeIconMap } from '@hy-element/utils'
	import hyIcon from '../Icon/Icon.vue'

	defineOptions({
		name: 'hyAlert',
	})
	const props = withDefaults(defineProps<AlertProps>(), {
		effect: 'light',
		type: 'info',
		closable: true,
	})
	const emits = defineEmits<AlertEmits>()
	const slots = useSlots()

	const visible = ref(true)

	const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info')
	const withDescription = computed(() => props.description || slots.default)

	function close() {
		visible.value = false
		emits('close')
	}

	function open() {
		visible.value = true
	}

	defineExpose<AlertInstance>({
		open,
		close,
	})
</script>

<template>
	<transition name="hy-alert-fade">
		<div
			v-show="visible"
			class="hy-alert"
			role="alert"
			:class="{
				[`hy-alert__${type}`]: type,
				[`hy-alert__${effect}`]: effect,
				'text-center': center,
			}">
			<hy-icon
				v-if="showIcon"
				class="hy-alert__icon"
				:class="{ 'big-icon': withDescription }"
				:icon="iconName" />
			<div class="hy-alert__content">
				<span
					class="hy-alert__title"
					:class="{ 'with-desc': withDescription }"
					:style="{ display: center && !showIcon ? 'flow' : 'inline' }">
					<slot name="title">{{ title }}</slot>
				</span>
				<p class="hy-alert__description">
					<slot>{{ description }}</slot>
				</p>
				<div class="hy-alert__close" v-if="closable">
					<hy-icon @click.stop="close" icon="xmark" />
				</div>
			</div>
		</div>
	</transition>
</template>

<style scoped>
	@import './style.css';
</style>