import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"h6">;

export const TypographyH6: FC<PropsWithChildren<Props>> = (props) => {
	const { className, children, ...rest } = props;

	return (
		<h6
			{...rest}
			className={cn(
				"text-sm sm:text-base font-light tracking-tight",
				className,
			)}
		>
			{children}
		</h6>
	);
};
