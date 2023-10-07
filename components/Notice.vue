<template>
	<div class="notice">
		<span class="icon">
			<Icon name="ic:round-warning" />
		</span>
		<span class="text">
			<slot />
		</span>
	</div>
</template>
<script setup lang="ts"></script>

<style scoped>
.notice {
	display: flex;
	align-items: center;
	border: 1px solid #dadada;
	padding: 1.2rem;
}

.icon {
	font-size: 1.8rem;
	color: orange;
	margin-right: 0.5rem;
	margin-top: -2px;
}
</style>
