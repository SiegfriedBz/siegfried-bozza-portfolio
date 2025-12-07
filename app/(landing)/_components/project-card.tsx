import Image from "next/image";
import type { ComponentProps, FC } from "react";
import { StackBadge } from "@/app/_components/stack-badge";
import type { STACK } from "@/app/_constants/stack";
import type { Project } from "@/app/_types/project";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TypographyH3 } from "@/app/_components/typography/h3";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ExternalLinkIcon, MoveRightIcon } from "lucide-react";
import { TypographyH4 } from "@/app/_components/typography/h4";

type Props = ComponentProps<typeof Card> & {
	project: Project;
};

export const ProjectCard: FC<Props> = (props) => {
	const { project, className, ...rest } = props;

	const { slug, title, description, images, stack, links } = project;

	const [img] = images;

	return (
		<Card
			{...rest}
			className={cn("max-w-5xl mx-auto", className, "bg-transparent")}
		>
			<div className="flex flex-col gap-8">
					<CardContent className="relative w-full aspect-video rounded-lg overflow-hidden">
						<Image src={img} fill alt="project image" className="object-cover" />
					</CardContent>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-8 flex-1">
					<CardHeader>
						<CardTitle>
							<TypographyH3 className="tracking-wide text-balance">{title.h1}</TypographyH3>
							<TypographyH4 className="tracking-wide text-balance">{title.h2}</TypographyH4>
						</CardTitle>
					</CardHeader>

					<div className="flex flex-col gap-2 px-4">
						<CardDescription>{description.short}</CardDescription>
						
						<ul className="flex flex-wrap gap-2">
							{stack?.all?.map((s) => {
								return (
									<li key={`${slug}-${s}`}>
										<StackBadge stack={s as STACK} />
									</li>
								);
							})}
						</ul>

					<Separator className="my-4"/>
					<CardFooter className="md:self-end flex flex-wrap gap-x-8 gap-y-4">
						<Link href={links.page} className="group flex items-center gap-x-2">
							<span className="text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">Read case study</span> <MoveRightIcon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200"/>
						</Link>
						<Link href={links.live} className="group flex items-center gap-x-2">
								<span className="text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">View Live project</span> <ExternalLinkIcon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200"/>
						</Link>
					</CardFooter>
					</div>
				</div>
			</div>
		</Card>
	);
};
