import type { FC, PropsWithChildren } from "react";
import { LightGlow } from "../_components/light-glow";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <main>
      <div
        className="relative 
        flex flex-col items-center justify-center 
        text-center 
        max-sm:pt-[8svh] sm:pt-32 pb-8
        overflow-hidden
        px-4
      "
      >
        {/* Light glow */}
        <LightGlow className="max-sm:-top-52 sm-top-32 bottom-0 h-224 w-screen" />

        {children}
      </div>
    </main>
  );
};

export default Layout;
