<script setup>
	import { hyMessage } from 'hy-element'

	function handleClose() {
		hyMessage.info('close callback')
	}
</script>
<template>
	<div class="basic block">
		<hy-alert title="Unclosable alert" type="success" :closable="false" />
		<hy-alert title="Alert with callback" type="warning" @close="handleClose" />
	</div>
</template>