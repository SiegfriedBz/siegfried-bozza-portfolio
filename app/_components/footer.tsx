import { MailIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Tooltip } from "./tooltip";
import { TypographyH6 } from "./typography/h6";
import Image from "next/image";
import { LuGithub, LuLinkedin } from "react-icons/lu";


export const Footer: FC = () => {
	return (
		<footer className="flex py-8 gap-4 max-sm:flex-col items-center justify-between">
			<div className="flex gap-2">
				<TypographyH6 className="text-muted-foreground">
					© {new Date().getFullYear()} /
				</TypographyH6>
				<Link href={"/"} scroll>
					<TypographyH6 className="font-semibold">Siegfried Bozza</TypographyH6>
				</Link>
			</div>

			<div className="flex items-center gap-x-4">
				<a href={process.env.NEXT_PUBLIC_GITHUB ?? ""} target="_blank" rel="noopener noreferrer" className="group">
					<Tooltip desc="Github">
						<LuGithub className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200"/>
					</Tooltip>
				</a>
				<a href={process.env.NEXT_PUBLIC_LINKEDIN ?? ""} target="_blank" rel="noopener noreferrer" className="group">
					<Tooltip desc="LinkedIn">
						<LuLinkedin className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200"/>
					</Tooltip>
				</a>
				<a href={`mailto:${process.env.NEXT_PUBLIC_MAIL_TO ?? ""}`} target="_blank" rel="noopener noreferrer" className="group">
					<Tooltip desc="Email">
						<MailIcon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200"/>
					</Tooltip>
				</a>
			</div>
		</footer>
	);
};
