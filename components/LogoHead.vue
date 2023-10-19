<template>
	<header class="head">
		<div class="inside">
			<a target="_blank" href="https://edu.epfl.ch/studyplan/fr/propedeutique/">
				<img
					src="https://www.epfl.ch/wp/6/wp-content/themes/wp-theme-2018/assets/svg/epfl-logo.svg"
					alt="Logo EPFL, École polytechnique fédérale de Lausanne"
				/>
			</a>
		</div>
	</header>
</template>

<style scoped>
.head {
	display: flex;
	padding: 0;
	width: 100%;
	align-items: center;
	background: transparent;
	/* justify-content: center; */

	position: fixed;
	top: 0;
	left: 0;

	background-color: inherit;
	z-index: 1;

	border-bottom: 1px solid #dadada;
}

.head .inside {
	display: flex;
	justify-content: center;

	background-color: white;
	width: 100%;
	height: 1rem;
	padding: 0.5rem max(calc(50% - 25rem), 5%);
}

img {
	max-height: 0.8rem;
}

@media screen and (min-width: 65rem) {
	.head .inside {
		justify-content: left;
		width: calc(20rem - 2 * clamp(2rem, 2vw, 5rem));
		padding: 0.5rem clamp(2rem, 2vw, 5rem);
		border-right: solid 1px #dadada;
	}
}
</style>
