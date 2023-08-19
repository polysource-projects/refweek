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

		overflow-y: scroll;
		max-width: 20rem;
		height: 100%;
		min-width: 20rem;
		border-right: 1px solid #dadada;
	}

	div.cal {
		margin: 0 2rem;
		margin-top: -2rem;
		display: flex;
		height: 100%;
		width: 100%;
		justify-content: center;
		align-items: center;
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
