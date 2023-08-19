<template>
	<div class="table-container">
		<table class="ref-week">
			<thead>
				<td class="time"></td>
				<td>Lu</td>
				<td>Ma</td>
				<td>Me</td>
				<td>Je</td>
				<td>Ve</td>
			</thead>
			<tbody>
				<tr v-for="hour in range(8, 18)">
					<!-- Hour -->
					<td class="time">{{ `${hour}-${hour + 1}` }}</td>
					<!-- Each cell of the row -->
					<template v-for="day in 5">
						<Cell
							v-if="notOverflowed(day, hour)"
							:day="day"
							:hour="hour"
							:lessons="lessons"
						/>
					</template>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { range } from "@/util/range";
import { useEduStore } from "@/store/edu";

const eduStore = useEduStore();
const { lessons } = storeToRefs(eduStore);

// Returns false if an event started earlier and is still going on
function notOverflowed(day: number, hour: number): boolean {
	return (
		lessons.value.find(
			(lesson) =>
				lesson.day === day &&
				lesson.time < hour &&
				lesson.time + lesson.duration > hour
		) === undefined
	);
}
</script>

<style scoped>
* {
	--blue: #4a90e2;
	--indigo: #6610f2;
	--purple: #6f42c1;
	--pink: #e83e8c;
	--red: red;
	--orange: #f5a623;
	--yellow: #ffc107;
	--green: #7ed321;
	--teal: #20c997;
	--cyan: #17a2b8;
	--white: #fff;
	--gray: #707070;
	--gray-dark: #343a40;
	--primary: red;
	--secondary: #fff;
	--success: #7ed321;
	--info: #4a90e2;
	--warning: #f5a623;
	--danger: red;
	--light: #e6e6e6;
	--dark: #212121;
	--breakpoint-xs: 0;
	--breakpoint-sm: 576px;
	--breakpoint-md: 768px;
	--breakpoint-lg: 992px;
	--breakpoint-xl: 1200px;
	--breakpoint-xxl: 1600px;
	--font-family-sans-serif: Arial, sans-serif;
	--font-family-monospace: monospace;
}

* {
	color: #212121;
}

div.table-container {
	width: 100%;
	overflow-x: scroll;
}

table.ref-week {
	font-weight: 400;
	line-height: 1.1;
	text-align: left;

	/* box-sizing: border-box; */
	border-collapse: collapse;
	font-size: 0.7rem;
	width: 100%;
	min-width: 40rem;
	position: relative;
	display: inline-table;
	border: 0;
}

.ref-week thead {
	font-size: 0.8rem;
}

.ref-week tbody {
	font-weight: 400;
}

.ref-week tr:hover td {
	background-color: #d5d5d5;
}

.ref-week td {
	color: #212121;
	box-sizing: border-box;
	height: 3rem;
	width: 16.6667%;
	background: #f0f0f0;
	border: 2px solid #fff;
	padding: 0rem 0.5rem;
	transition: background-color 0.3s ease-in-out;
}

.ref-week td.time {
	background: transparent;
	font-size: 0.8rem;
	padding-left: 0;
}

@media screen and (min-width: 65rem) {
	td {
		--width: 10vw;
		min-width: var(--width);
		max-width: var(--width);
	}
}
</style>
