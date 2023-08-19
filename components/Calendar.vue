<template>
	<!-- Notice about conflicts / will be resolved later -->

	<Notice
		v-for="conflict in conflicts"
		:key="
			conflict.day +
			(conflict.survivor.course.link ?? '') +
			(conflict.extinct.course.link ?? '')
		"
	>
		Attention : un conflit a été détecté le {{ days[conflict.day - 1] }} entre
		<a :href="conflict.survivor.course.link" target="_blank">{{
			conflict.survivor.title
		}}</a
		>, de {{ conflict.survivor.time }}h à
		{{ conflict.survivor.time + conflict.survivor.duration }}h, et
		<a :href="conflict.extinct.course.link" target="_blank">{{
			conflict.extinct.title
		}}</a
		>, de {{ conflict.extinct.time }}h à
		{{ conflict.extinct.time + conflict.extinct.duration }}h. Par conséquent, ce
		dernier n'est pas affiché.
	</Notice>
	<!-- Week view -->
	<!-- <ul>
		<li v-for="lesson of lessonsWithoutConflicts">
			{{ lesson.day }} | {{ lesson.time }}-{{ lesson.time + lesson.duration }} |
			{{ lesson.title }}
		</li>
	</ul> -->
	<Week :lessons="lessonsWithoutConflicts" />
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useEduStore } from "../store/edu";

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];

const eduStore = useEduStore();
const { lessons } = storeToRefs(eduStore);

// Lessons updates when needed, but not everything does

// Render these courses, create Events

let conflicts = ref<Conflict[]>([]);

const lessonsWithoutConflicts = computed(() => {
	conflicts.value = [];
	return lessons.value.filter(
		(lesson, i) =>
			!lessons.value.some((otherLesson, j) => {
				if (j <= i) return false;
				// Same day
				const conflicted =
					otherLesson.day === lesson.day &&
					// Starts before or at the same time
					otherLesson.time <= lesson.time &&
					// Ends after the start
					otherLesson.time + otherLesson.duration > lesson.time;
				if (conflicted) {
					conflicts.value.push({
						survivor: otherLesson,
						extinct: lesson,
						day: otherLesson.day,
					});
				}

				return conflicted;
			})
	);
});
</script>
