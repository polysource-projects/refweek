interface Lesson {
	title?: string;
	day: number;
	time: number;
	duration: number;
	type: LessonType;
	course: SmallCourse;
}

type LessonType = "cours" | "exercice" | "projet";

interface SmallCourse {
	groupName: string;
	name: string;
	precision?: string;
	link?: string;
	teachers: Teacher[];
}

interface Teacher {
	name: string;
	id: number;
}
