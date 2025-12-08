import type { ComponentProps, FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = ComponentProps<typeof Avatar>;

export const SiegAvatar: FC<Props> = (props) => {
  return (
    <Avatar {...props}>
      <AvatarImage src="/images/avatar.jpg" />
      <AvatarFallback>SB</AvatarFallback>
    </Avatar>
  );
};
