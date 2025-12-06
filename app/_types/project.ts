export type Project = {
	slug: string;
	title: string;
	description: {
		short: string;
		extended: string;
	};
	links: {
		page: string;
		live: string;
		github: string;
	};
	images: string[];
	stack: string[];
};
