import type { FC, PropsWithChildren } from "react";
import { LightGlow } from "@/app/_components/light-glow";
import "./post-prose.css";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div className="relative overflow-hidden pb-16 pt-24 sm:pt-32">
      <LightGlow className="-top-32 h-224" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
