import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"h1">;

export const TypographyH1: FC<PropsWithChildren<Props>> = (props) => {
	const { className, children, ...rest } = props;

	return (
		<h1
			{...rest}
			className={cn(
				"scroll-m-20 text-center text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-sm text-balance",
				className,
			)}
		>
			{children}
		</h1>
	);
};
