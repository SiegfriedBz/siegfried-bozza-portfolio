import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"span">;

export const TypographyLead: FC<PropsWithChildren<Props>> = (props) => {
	const { className, children, ...rest } = props;

	return (
		<span
			{...rest}
			className={cn(
				"text-muted-foreground text-base sm:text-lg md:text-xl",
				className,
			)}
		>
			{children}
		</span>
	);
};
