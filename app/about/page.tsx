import { Badge } from "@/components/ui/badge";
import { SiegAvatar } from "../_components/sieg-avatar";
import { TypographyH1 } from "../_components/typography/h1";
import { TypographyH2 } from "../_components/typography/h2";
import { TypographyH6 } from "../_components/typography/h6";
import { AboutSidebar } from "./_components/about-sidebar";
import {  EarthIcon } from "lucide-react";
import { BadgeExternalLinks } from "./_components/badge-external-links";
import { TypographyH5 } from "../_components/typography/h5";
import { StackBadge } from "../_components/stack-badge";
import { STACK } from "../_constants/stack";
import { BookCallBadge } from "./_components/book-call-badge";

export default function Page() {
	return (
	<main className="w-full max-w-6xl mx-auto">
			<AboutSidebar className="max-sm:hidden" />

			{/* introduction */}
			<div 
				id={"introduction"}
				className="sm:ml-32 2xl:ml-0 grid grid-cols-1 lg:grid-cols-5 gap-x-64 min-h-svh
				scroll-mt-32"
			>
				<div className="flex z-10 flex-col gap-y-4 justify-center items-center lg:fixed lg:top-1/4 lg:-translate-y-1/4 col-span-1">
					<SiegAvatar className="size-44 sm:size-32"/>
					
					<div className="flex gap-x-3 items-center">
						<EarthIcon className="text-amber-500 size-5"/>
						<TypographyH6 className="font-semibold">EU</TypographyH6>
					</div>
					
					<TypographyH6 className="font-semibold -mt-2">Flexible worldwide relocation</TypographyH6>
					
					<div className="flex gap-x-6">
						<Badge className="font-bold">French</Badge>
						<Badge className="font-bold">English</Badge>
					</div>
				</div>
	
				<div className="z-10 flex flex-col gap-2 items-center lg:items-start col-span-1 max-lg:mt-16 lg:col-span-4 lg:col-start-2">
					<BookCallBadge />

					<TypographyH1>Siegfried Bozza</TypographyH1>
					<TypographyH2 className="text-muted-foreground">React & Next.js Fullstack Developer</TypographyH2>
					
					<div className="mt-4 mb-6">
						<BadgeExternalLinks />
					</div>

					<div className="flex flex-col items-start gap-y-12 text-left">
						<TypographyH5>
							I&apos;m a <span className="font-extrabold">full-stack developer</span> with a background in molecular biology and civil engineering. 
							<span className="inline-block">I build efficient, maintainable applications with <span className="font-extrabold">React</span> and <span className="font-extrabold">Next.js</span>, and 
							I&apos;m passionate about <span className="font-extrabold">exploring Web3</span> — especially <span className="font-extrabold">dApps, DeFi, and smart contracts</span>.</span>
							I&apos;ve worked in Canada, France, and Switzerland, and <span className="font-extrabold">thrive in multicultural, dynamic environments</span>.
						</TypographyH5>

						{/* Work Experience */}
						<div id={"work"} className="scroll-mt-24">
							<TypographyH2>Work Experience</TypographyH2>
							<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum officiis totam maiores porro voluptatibus quisquam consequuntur nesciunt ipsa delectus, fugit tempore ratione earum necessitatibus odit quam omnis, architecto repellendus neque maxime inventore voluptate explicabo deserunt! Molestiae eum ratione voluptatum a ea, quisquam nesciunt natus modi dolor possimus eius facilis veniam itaque beatae provident cum fugiat iste ipsa officia iure. Iste cum qui reprehenderit iusto aliquam laboriosam repellat voluptatum excepturi nobis cupiditate, hic sint modi tenetur exercitationem corporis consequuntur consectetur cumque et sed sequi mollitia ipsa tempore ipsum quia. Laboriosam accusantium beatae incidunt obcaecati numquam optio itaque iusto ullam necessitatibus soluta iste similique earum sequi illo dignissimos, quod cum quisquam cupiditate suscipit vel eveniet veritatis saepe placeat! Nobis, illum enim repellat id dignissimos libero quae adipisci quasi. Nulla est id hic! Nostrum eum sint labore nobis ut, quisquam, laudantium accusamus deserunt reiciendis sed aliquid distinctio natus rerum. Alias cum facilis, harum at unde autem ipsa quaerat itaque, distinctio eos suscipit delectus necessitatibus, animi quibusdam voluptate illo fugiat cupiditate obcaecati eaque vitae quae? Ratione tempore aliquid eos deleniti delectus? Animi possimus quibusdam omnis ipsum fugit earum, sapiente saepe, debitis illo perspiciatis voluptatum eveniet? Architecto atque, necessitatibus sunt porro dicta, incidunt, deleniti asperiores accusantium quas facere corrupti veniam tempora minus explicabo itaque? Officiis dolorum deserunt delectus? Numquam quos odit eligendi ratione, ea velit eos blanditiis eaque esse!</div>
						</div>

						{/* Education */}
						<div id={"education"} className="scroll-mt-24">
							<TypographyH2>Education</TypographyH2>
								<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum officiis totam maiores porro voluptatibus quisquam consequuntur nesciunt ipsa delectus, fugit tempore ratione earum necessitatibus odit quam omnis, architecto repellendus neque maxime inventore voluptate explicabo deserunt! Molestiae eum ratione voluptatum a ea, quisquam nesciunt natus modi dolor possimus eius facilis veniam itaque beatae provident cum fugiat iste ipsa officia iure. Iste cum qui reprehenderit iusto aliquam laboriosam repellat voluptatum excepturi nobis cupiditate, hic sint modi tenetur exercitationem corporis consequuntur consectetur cumque et sed sequi mollitia ipsa tempore ipsum quia. Laboriosam accusantium beatae incidunt obcaecati numquam optio itaque iusto ullam necessitatibus soluta iste similique earum sequi illo dignissimos, quod cum quisquam cupiditate suscipit vel eveniet veritatis saepe placeat! Nobis, illum enim repellat id dignissimos libero quae adipisci quasi. Nulla est id hic! Nostrum eum sint labore nobis ut, quisquam, laudantium accusamus deserunt reiciendis sed aliquid distinctio natus rerum. Alias cum facilis, harum at unde autem ipsa quaerat itaque, distinctio eos suscipit delectus necessitatibus, animi quibusdam voluptate illo fugiat cupiditate obcaecati eaque vitae quae? Ratione tempore aliquid eos deleniti delectus? Animi possimus quibusdam omnis ipsum fugit earum, sapiente saepe, debitis illo perspiciatis voluptatum eveniet? Architecto atque, necessitatibus sunt porro dicta, incidunt, deleniti asperiores accusantium quas facere corrupti veniam tempora minus explicabo itaque? Officiis dolorum deserunt delectus? Numquam quos odit eligendi ratione, ea velit eos blanditiis eaque esse!</div>
						</div>

						{/* Skills */}
						<div id={"skills"} className="scroll-mt-24">
							<TypographyH2>Skills</TypographyH2>

							<ul className="flex flex-wrap gap-2">
								{Object.values(STACK)?.map((s) => {
									return (
										<li key={s}>
											<StackBadge stack={s as STACK} />
										</li>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
	</main>)
}
