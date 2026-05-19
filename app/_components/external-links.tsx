import { CV_HREF } from "@/app/_constants/cv";
import { FileDownIcon, MailIcon } from "lucide-react";
import type { FC } from "react";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { Tooltip } from "./tooltip";

export const ExternalLinks: FC = () => {
  const github = process.env.NEXT_PUBLIC_GITHUB?.trim() ?? "";
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN?.trim() ?? "";
  const mailTo = process.env.NEXT_PUBLIC_MAIL_TO?.trim() ?? "";

  return (
    <div className="flex items-center gap-x-4">
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="GitHub"
        >
          <Tooltip desc="GitHub">
            <LuGithub className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
          </Tooltip>
        </a>
      ) : null}
      {linkedin ? (
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
          aria-label="LinkedIn"
        >
          <Tooltip desc="LinkedIn">
            <LuLinkedin className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
          </Tooltip>
        </a>
      ) : null}
      {mailTo ? (
        <a href={`mailto:${mailTo}`} className="group" aria-label="Email">
          <Tooltip desc="Email">
            <MailIcon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
          </Tooltip>
        </a>
      ) : null}
      <a
        href={CV_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
        aria-label="Download CV"
      >
        <Tooltip desc="CV">
          <FileDownIcon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
        </Tooltip>
      </a>
    </div>
  );
};
