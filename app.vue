<template>
	<div class="container">
		<div class="config">
			<h1>epfl weekref</h1>
			<!-- Form -->
			<Form />
		</div>
		<!-- Calendar view -->
		<div class="cal">
			<Calendar class="calendar" />
		</div>
	</div>
</template>
<script setup lang="ts">
useHead({
	title: "epfl weekref",
});
</script>

<style scoped>
div.container {
	margin: 2rem auto;
	width: min(50rem, 95%);
	display: flex;
	flex-direction: column;
}

@media screen and (min-width: 65rem) {
	div.container {
		margin: 0 0;
		margin-right: 2rem;
		width: auto;
		height: 100vh;
		flex-direction: row;
	}

	div.config {
		flex-grow: 1;
		padding: 3vh 2%;

		overflow-y: scroll;
		max-width: 25rem;
		min-width: 20rem;
		height: calc(100% - 6vh);
		background-color: #f0f0f0;
	}

	div.cal {
		margin: 0 2rem;
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
