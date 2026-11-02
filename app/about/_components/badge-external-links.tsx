import { FileDownIcon, MailIcon } from "lucide-react";
import type { FC } from "react";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { CV_HREF, CV_LABEL } from "@/app/_constants/cv";
import { PROFILE_LINKS } from "@/app/_constants/links";
import { Badge } from "@/components/ui/badge";

export const BadgeExternalLinks: FC = () => {
  const { github, linkedin, email: mailTo } = PROFILE_LINKS;

  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-2 max-[374px]:gap-x-2">
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="group flex gap-x-2 items-center"
        >
          <Badge
            variant={"outline"}
            className="py-2 group-hover:border-accent-blue"
          >
            <LuGithub className="size-4 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
            <span className="max-[374px]:hidden text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">
              GitHub
            </span>
          </Badge>
        </a>
      ) : null}

      {linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="group flex gap-x-2 items-center"
        >
          <Badge
            variant={"outline"}
            className="py-2 group-hover:border-accent-blue"
          >
            <LuLinkedin className="size-4 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
            <span className="max-[374px]:hidden text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">
              LinkedIn
            </span>
          </Badge>
        </a>
      ) : null}

      {mailTo ? (
        <a
          href={`mailto:${mailTo}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
          className="group flex gap-x-2 items-center"
        >
          <Badge
            variant={"outline"}
            className="py-2 group-hover:border-accent-blue"
          >
            <MailIcon className="size-4 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
            <span className="max-[374px]:hidden text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">
              Email
            </span>
          </Badge>
        </a>
      ) : null}

      <a
        href={CV_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Download ${CV_LABEL}`}
        className="group flex gap-x-2 items-center"
      >
        <Badge
          variant={"outline"}
          className="py-2 group-hover:border-accent-blue"
        >
          <FileDownIcon className="size-4 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
          <span className="max-[374px]:hidden text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">
            {CV_LABEL}
          </span>
        </Badge>
      </a>
    </div>
  );
};
