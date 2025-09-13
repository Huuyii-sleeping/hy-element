<template>
	<h2>通过 slot 传入内容</h2>
	<div style="max-width: 600px">
		<hy-alert type="success">Success alert</hy-alert>
		<hy-alert type="info">Info alert</hy-alert>
		<hy-alert type="warning">Warning alert</hy-alert>
		<hy-alert type="danger">Error alert</hy-alert>
	</div>
	<h2>通过 prop 传入内容</h2>
	<div style="max-width: 600px">
		<hy-alert type="success" title="Success alert" />
		<hy-alert type="info" title="Info alert" />
		<hy-alert type="warning" title="Warning alert" />
		<hy-alert type="danger" title="Error alert" />
	</div>
</template>