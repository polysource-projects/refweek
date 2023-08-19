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
	padding: 1.2rem;
	margin: 1rem 0;

	display: flex;
	align-items: center;
	border: 1px solid #dadada;
}

.icon {
	font-size: 1.8rem;
	color: orange;
	margin-right: 0.5rem;
	margin-top: -2px;
}

@media screen and (min-width: 65rem) {
	.notice {
		width: max(calc(60vw - 2.4rem), 40rem);
	}
}
</style>
