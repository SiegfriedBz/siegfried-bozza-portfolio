import type { ComponentProps, FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Avatar> & {
  /** Pass "" where the name is already written next to the avatar. */
  alt?: string;
};

export const SiegAvatar: FC<Props> = (props) => {
  const { className, alt = "Siegfried Bozza", ...rest } = props;

  return (
    <Avatar
      {...rest}
      className={cn(className, "rounded-full border border-border bg-white")}
    >
      <AvatarImage src="/images/avatar.webp" alt={alt} />
      <AvatarFallback>SB</AvatarFallback>
    </Avatar>
  );
};
