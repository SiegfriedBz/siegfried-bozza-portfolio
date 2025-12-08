import { Hero } from "./_components/hero";
import { Projects } from "../_components/projects";

export default function Page() {
	return (
		<main className="max-w-6xl mx-auto flex flex-col gap-8">
			<Hero />
			<Projects />
		</main>
	);
}
