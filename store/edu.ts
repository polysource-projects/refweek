import { defineStore } from "pinia";
import { Course } from "../types/course";

export const useEduStore = defineStore<
	"edu",
	// Schema
	{
		courses: Course[];
	},
	// Getters
	{
		lessons: () => Lesson[];
	},
	// Actions
	{}
>("edu", {
	state: () => ({
		courses: [],
	}),
	getters: {
		lessons() {
			return this.courses.flatMap((course) =>
				course.timetable.events.map((event) => ({
					title: `${course.name}`,
					day: event.day,
					time: event.time,
					duration: event.duration,
					type: event.type as "cours" | "exercice" | "projet",
					course: {
						groupName: course.groupName,
						name: course.name,
						precision: ("precision" in course && course.precision) || undefined,
						link: course.url,
						teachers: course.teachers.map((t) => ({ name: t.name, id: t.id })),
					},
				}))
			);
		},
	},
});
