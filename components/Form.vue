<template>
	<form>
		<!-- Section -->
		<select name="section" v-model="selectedSectionCode" :disabled="sharing">
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
				:disabled="sharing || group.courses.length <= 1"
			>
				<option v-for="cours of group.courses" :value="cours.name">
					{{ cours.teachers.map((t) => t.name).join(", ") }}
					{{ "precision" in cours ? "(" + cours.precision + ")" : "" }}
				</option>
			</select>
		</div>
		<div class="toolbar">
			<a v-if="sharing" :href="'/' + route.params.code">
				<Icon class="icon" name="material-symbols:edit-square-outline-sharp" />
				Modifier
			</a>
			<a v-else :href="'/' + route.params.code + '/share'" @click="copyLink">
				<Icon class="icon" name="material-symbols:content-copy-outline" />
				Partager
			</a>
		</div>
	</form>
</template>

<script setup lang="ts">
import { useEduStore } from "@/store/edu";
import { Course, SectionCode } from "@/types/course";
import sections from "@/store/sections.json";

const { sharing } = defineProps<{
	sharing?: boolean;
}>();

const defaultSection: SectionCode = "MT";

// Get URL path
const route = useRoute();

let selectedSectionCode = ref<keyof typeof sections>(defaultSection);
let selectedSection = computed(() => sections[selectedSectionCode.value]);

let choices = reactive<Record<SectionCode, Record<string, string>>>({
	// groupName: courseName
} as any);

// url -> state
parseCode();
// state -> url
!sharing && updateCode();

// Set default choices

for (const code of Object.keys(sections) as SectionCode[]) {
	choices[code] ??= {};
	for (const group of sections[code].groups) {
		choices[code][group.groupName] ??= group.courses[0].name;
	}
}

// Update path when section changes
watch([selectedSectionCode, choices], () => {
	// update URL
	updateCode();
});

// Change state depending on URL
function parseCode() {
	const rawCode = route.params.code.toString();
	const sectionCode = (Object.keys(sections) as SectionCode[])
		.find((code) =>
			rawCode.toString().toUpperCase().startsWith(code.toUpperCase())
		)
		?.toUpperCase() as SectionCode | undefined;

	// Parse section
	if (sectionCode) {
		selectedSectionCode.value = sectionCode;
	} else {
		selectedSectionCode.value = defaultSection;
	}

	// Parse number after
	// Parse courses
	if (rawCode.startsWith(selectedSectionCode.value + "+")) {
		const split = rawCode.split("+");
		const numericals = split[1];

		let i = 0;

		for (const group of selectedSection.value.groups) {
			// Find index of selected course
			if (group.courses.length === 1) {
				// Skip it, nothing to choose
				continue;
			}

			let courseIndex = parseInt(numericals[i]);
			if (isNaN(courseIndex) || courseIndex >= group.courses.length) {
				i++;
				continue;
			}

			if (!choices[selectedSectionCode.value]) {
				choices[selectedSectionCode.value] = {};
			}

			choices[selectedSectionCode.value][group.groupName] =
				group.courses[courseIndex].name;

			i++;
		}
	}
}

// Find the state's code and put it in the URL
function updateCode() {
	const code = selectedSectionCode.value;
	let nextPath = "/";
	if (code) {
		nextPath = "/" + code;
	}
	// Find exact code
	let numericalCode = "";
	// console.log({ code, section: selectedSection.value });
	for (const group of selectedSection.value.groups) {
		// Find index of selected course
		if (group.courses.length === 1) {
			// Skip it, nothing to choose
			continue;
		}
		const index =
			!choices[code] || !choices[code][group.groupName]
				? 0
				: group.courses.findIndex(
						(course) => course.name === choices[code][group.groupName]
				  );
		numericalCode += index.toString();
	}

	// Remove every trailing 0 from numericalCode
	let finalCode = "";
	for (let i = numericalCode.length - 1; i >= 0; i--) {
		if (numericalCode[i] === "0") {
			continue;
		}
		finalCode = numericalCode.slice(0, i + 1);
		break;
	}
	const finalPath = nextPath + (finalCode ? "+" + finalCode : "");

	if (finalPath !== route.path) navigateTo(finalPath);
}

// Get and set courses depending on choices
const courses = computed(() => {
	const courses: Course[] = [];
	for (const [groupName, courseName] of Object.entries(
		choices[selectedSectionCode.value]
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

const eduStore = useEduStore();
eduStore.courses = courses.value;
watch(courses, (courses) => {
	eduStore.courses = courses;
});

function copyLink() {
	navigator.clipboard.writeText(window.location.href + "/share");
	alert(
		"Le lien vers votre emploi du temps a été copié dans le presse-papier."
	);
}
</script>

<style scoped>
form {
	margin-top: 1rem;

	padding-bottom: 2rem;
	border-bottom: 1px solid #dadada;
	margin-bottom: 2rem;
}

select {
	background-color: white;
	color: black;
	border: solid 1px #e6e6e6;
	border-radius: 0;
	height: 2.5rem;
	width: 100%;
	padding: 0 1rem;
	appearance: none;
}

select:disabled {
	color: grey;
	background-color: #eaeaea;
}

.toolbar {
	display: flex;
	padding: 1rem 0;
}

.toolbar a {
	margin-left: auto;
	text-decoration: none;
	font-size: 0.9rem;
}

.toolbar .icon {
	margin-top: -0.3rem;
}

@media screen and (min-width: 65rem) {
	form {
		margin-top: 0;
		margin-bottom: 0;

		padding: 3vh 2rem;
		border-bottom: none;
	}
}
</style>
