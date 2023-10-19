<template>
	<LogoHead />
	<div class="container">
		<div class="config">
			<!-- Form -->
			<Form :sharing="sharing" :root="root" />
		</div>
		<!-- Calendar view -->
		<div class="cal">
			<Calendar class="calendar" />
		</div>
		<Footer class="mobile-footer" />
	</div>
</template>
<script setup lang="ts">
const { sharing, root } = defineProps<{ sharing?: boolean; root?: boolean }>();

useHead({
	title: "Emploi du temps EPFL",
	meta: [
		{
			name: "description",
			content:
				"Partagez votre premier emploi du temps à l'EPFL et visualisez ceux de vos camarades.",
		},
	],
});
</script>

<style scoped>
div.container {
	margin: 2rem auto;
	width: min(50rem, 90%);
	display: flex;
	flex-direction: column;
}

.mobile-footer {
	margin-top: 3rem;
	margin-bottom: -3rem;
	display: block;
}

@media screen and (min-width: 65rem) {
	div.container {
		margin: 0;
		margin-top: 2rem;
		margin-right: 2rem;
		width: auto;
		height: calc(100vh - 2rem);
		flex-direction: row;
	}

	div.config {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		max-width: 20rem;
		height: 100%;
		min-width: 20rem;
		border-right: 1px solid #dadada;
	}

	div.cal {
		margin: 0 3rem;
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
	}

	.mobile-footer {
		display: none;
	}
}
</style>

<style>
* {
	font-family: Arial, Helvetica, sans-serif;
}

body {
	margin: 0;
	padding: 0;
}
</style>
