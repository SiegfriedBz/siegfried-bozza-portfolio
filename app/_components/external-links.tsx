import { FileDownIcon, MailIcon } from "lucide-react";
import type { FC } from "react";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { CV_HREF } from "@/app/_constants/cv";
import { PROFILE_LINKS } from "@/app/_constants/links";
import { Tooltip } from "./tooltip";

export const ExternalLinks: FC = () => {
  const { github, linkedin, email: mailTo } = PROFILE_LINKS;

  return (
    <div className="flex items-center gap-x-1">
      {github ? (
        <Tooltip desc="GitHub">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-md p-2 max-sm:p-3"
            aria-label="GitHub"
          >
            <LuGithub className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
          </a>
        </Tooltip>
      ) : null}
      {linkedin ? (
        <Tooltip desc="LinkedIn">
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-md p-2 max-sm:p-3"
            aria-label="LinkedIn"
          >
            <LuLinkedin className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
          </a>
        </Tooltip>
      ) : null}
      {mailTo ? (
        <Tooltip desc="Email">
          <a
            href={`mailto:${mailTo}`}
            className="group rounded-md p-2 max-sm:p-3"
            aria-label="Email"
          >
            <MailIcon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
          </a>
        </Tooltip>
      ) : null}
      <Tooltip desc="CV">
        <a
          href={CV_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-md p-2 max-sm:p-3"
          aria-label="Download CV"
        >
          <FileDownIcon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
        </a>
      </Tooltip>
    </div>
  );
};
