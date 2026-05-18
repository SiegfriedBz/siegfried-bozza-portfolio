import { LightGlow } from "@/app/_components/light-glow";
import type { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div className="relative mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center gap-8 overflow-hidden px-4 pb-8 pt-32 text-center">
      <LightGlow className="left-0 right-0 -top-32 bottom-0 h-224" />

      <span className="z-10 font-bold text-accent-blue">Articles</span>

      {children}
    </div>
  );
};

export default Layout;
