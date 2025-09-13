<script setup>
	// import { hyMessage } from "veyra";
	function handleBtnClick() {
		hyMessage.info('btn click')
	}
</script>

<template>
	<p>
		<hy-button @click="handleBtnClick"> with throttle</hy-button>
		<hy-button @click="handleBtnClick" :use-throttle="false"
			>without throttle</hy-button
		>
	</p>
</template>