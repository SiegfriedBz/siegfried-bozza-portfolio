import { ExternalLinkIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";
import { LuGithub } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

type Props = ComponentProps<typeof ButtonGroup> & {
  live: string;
  github: string;
};

export const ProjectLinks: FC<Props> = (props) => {
  const { live, github, ...rest } = props;

  return (
    <ButtonGroup {...rest}>
      <Button asChild variant={"outline"}>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-x-2"
        >
          <span className="text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">
            <span className="max-[380px]:hidden">View </span>
            <span className="font-semibold">Github</span>
            <span className="max-[380px]:hidden"> project</span>
          </span>
          <LuGithub className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
        </a>
      </Button>
      <Button asChild variant={"outline"}>
        <a
          href={live}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-x-2"
        >
          <span className="text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200">
            <span className="max-[380px]:hidden">View </span>
            <span className="font-semibold">Live</span>
            <span className="max-[380px]:hidden"> project</span>
          </span>
          <ExternalLinkIcon className="size-5 text-accent-blue group-hover:text-accent-foreground dark:group-hover:text-white transition-colors duration-200" />
        </a>
      </Button>
    </ButtonGroup>
  );
};
