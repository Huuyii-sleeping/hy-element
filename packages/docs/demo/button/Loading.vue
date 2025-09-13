<template>
	<div>
		<hy-button type="primary" loading>Loading</hy-button>
		<hy-button type="primary" loading-icon="circle-notch" loading
			>Loading</hy-button
		>
		<hy-button type="primary" loading>
			<template #loading>
				<hy-icon style="margin-right: 6px" icon="star" spin />
			</template>
			Loading
		</hy-button>
	</div>
</template>