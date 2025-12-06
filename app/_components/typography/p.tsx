import type { ComponentProps, FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"p">;

export const TypographyP: FC<PropsWithChildren<Props>> = (props) => {
	const { className, children, ...rest } = props;

	return (
		<p
			{...rest}
			className={cn(
				"text-sm sm:text-base font-medium tracking-wide",
				className,
			)}
		>
			{children}
		</p>
	);
};
