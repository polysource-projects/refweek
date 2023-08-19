<template>
	<td
		v-if="lesson?.duration"
		:rowspan="lesson.duration"
		:class="`taken ${lesson.type}`"
	>
		{{ lesson.title }}
	</td>
	<td v-else></td>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEduStore } from "../store/edu";

const { day, hour } = defineProps<{
	day: number;
	hour: number;
}>();

const eduStore = useEduStore();
const { lessons } = storeToRefs(eduStore);

// Find lesson
const lesson = computed(() => {
	const found = lessons.value.find(
		(lesson) => lesson.day === day && lesson.time === hour
	);
	return found;
});
</script>

<style scoped>
td.taken {
	color: white !important;

	vertical-align: middle;
	text-align: center;

	transition: background-color none;
}

td.taken.cours {
	/* Important = prevent hover animation */
	background-color: red !important;
	/* background-color: rgb(63, 118, 228) !important; */
}

td.taken.exercice {
	/* #f86b0d */
	background: #b51f1f
		url("https://edu.epfl.ch/vendors/elements/images/icons/icon-course-exercise.svg")
		no-repeat 3px 3px !important;
}

td.taken.projet {
	background: #8e0000
		url("https://edu.epfl.ch/vendors/elements/images/icons/icon-course-project.svg")
		no-repeat 0px 0px !important;
}
</style>
