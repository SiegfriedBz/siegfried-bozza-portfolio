import { MailIcon } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import { Tooltip } from "./tooltip";
import { TypographyH6 } from "./typography/h6";
import Image from "next/image";

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
				<a href={process.env.NEXT_PUBLIC_GITHUB ?? ""}>
					<Tooltip desc="Github">
						<Image src="/logos/github.png" width={24} height={24} alt="logo github"/>
					</Tooltip>
				</a>
				<a href={process.env.NEXT_PUBLIC_LINKEDIN ?? ""}>
					<Tooltip desc="LinkedIn">
						<Image src="/logos/linkedin.png" width={24} height={24} alt="logo linkedin"/>
					</Tooltip>
				</a>
				<a href={`mailto:${process.env.NEXT_PUBLIC_MAIL_TO ?? ""}`}>
					<Tooltip desc="Email">
						<MailIcon className="w-5 h-5" />
					</Tooltip>
				</a>
			</div>
		</footer>
	);
};
