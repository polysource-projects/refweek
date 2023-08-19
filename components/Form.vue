<template>
	<!-- <h1>form</h1> -->
	<hr />
	<form>
		<!-- Section -->
		<h2 for="section">Section</h2>
		<select name="section" v-model="selectedSectionCode">
			<option v-for="section of sections" :value="section.sectionCode">
				{{ section.sectionCode }} - {{ section.sectionName }}
			</option>
		</select>
		<!-- Courses -->
		<h2 for="courses">Cours</h2>
		<div v-for="group of selectedSection.groups" :key="group.groupName">
			<h4>{{ group.groupName }}</h4>
			<select
				:name="'group ' + group.groupName"
				v-model="choices[selectedSectionCode][group.groupName]"
				:disabled="group.courses.length <= 1"
			>
				<option v-for="cours of group.courses" :value="cours.name">
					{{ cours.teachers.map((t) => t.name).join(", ") }}
					{{ "precision" in cours ? "(" + cours.precision + ")" : "" }}
				</option>
			</select>
		</div>
	</form>
	<ul>
		<!-- <li v-for="section of sections">{{ section. }}</li> -->
	</ul>
</template>

<script setup lang="ts">
import { useEduStore } from "../store/edu";
import { Course, SectionCode } from "../types/course";
import sections from "../store/sections.json";

const eduStore = useEduStore();

// Get URL path
const route = useRoute();
const path = ref(route.path);

const validPath = (Object.keys(sections) as SectionCode[])
	.find((code) => path.value.toUpperCase().startsWith("/" + code.toUpperCase()))
	?.toUpperCase() as SectionCode | undefined;

let selectedSectionCode = ref<keyof typeof sections>(validPath || "MT");
let selectedSection = computed(() => sections[selectedSectionCode.value]);

// Update path when section changes
watch(selectedSectionCode, (code) => {
	navigateTo("/" + code);
});

let choices = ref<Record<SectionCode, Record<string, string>>>({
	// groupName: courseName
} as any);

// Set default choices

for (const code of Object.keys(sections) as SectionCode[]) {
	choices.value[code] = {};
	for (const group of sections[code].groups) {
		choices.value[code][group.groupName] = group.courses[0].name;
	}
}

// Get and set courses depending on choices
const courses = computed(() => {
	const courses: Course[] = [];
	for (const [groupName, courseName] of Object.entries(
		choices.value[selectedSectionCode.value]
	)) {
		// Find course
		const { courses: groupCourses } = selectedSection.value.groups.find(
			(g) => g.groupName === groupName
		)!;
		const course = groupCourses.find((c) => c.name === courseName)!;
		courses.push(course);
	}
	return courses;
});

eduStore.courses = courses.value;
watch(courses, (courses) => {
	eduStore.courses = courses;
});
</script>
