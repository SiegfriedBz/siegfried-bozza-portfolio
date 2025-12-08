import { MailIcon } from "lucide-react";
import type { FC } from "react";
import { LuGithub, LuLinkedin } from "react-icons/lu";
import { Tooltip } from "./tooltip";

export const ExternalLinks: FC = () => {
  return (
    <div className="flex items-center gap-x-4">
      <a
        href={process.env.NEXT_PUBLIC_GITHUB ?? ""}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <Tooltip desc="Github">
          <LuGithub className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
        </Tooltip>
      </a>
      <a
        href={process.env.NEXT_PUBLIC_LINKEDIN ?? ""}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <Tooltip desc="LinkedIn">
          <LuLinkedin className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
        </Tooltip>
      </a>
      <a
        href={`mailto:${process.env.NEXT_PUBLIC_MAIL_TO ?? ""}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group"
      >
        <Tooltip desc="Email">
          <MailIcon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
        </Tooltip>
      </a>
    </div>
  );
};
