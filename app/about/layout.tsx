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
        pt-32 pb-8
        px-4
        gap-8
      "
      >
        {/* Light glow */}
        <LightGlow />

        {children}
      </div>
    </main>
  );
};

export default Layout;
