import type { ComponentProps, FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = ComponentProps<typeof Avatar>;

export const SiegAvatar: FC<Props> = (props) => {
  const { className, ...rest } = props;

  return (
    <Avatar
      {...rest}
      className={cn(className, "rounded-full border border-border bg-white")}
    >
      <AvatarImage src="/images/avatar.png" />
      <AvatarFallback>SB</AvatarFallback>
    </Avatar>
  );
};
