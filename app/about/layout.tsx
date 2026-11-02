import type { FC, PropsWithChildren } from "react";
import { LightGlow } from "../_components/light-glow";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div>
      {/* On phones the header's vertical gaps follow the golden ratio: 1, 1.618, 2.618 and
          4.236 times --u (0.6svh, so about 5, 8, 13 and 21 px on an 844 px tall screen).
          62 px clears the fixed nav pill. */}
      <div
        className="relative 
        flex flex-col items-center justify-center 
        text-center 
        max-sm:[--u:0.6svh] max-sm:pt-[calc(62px+var(--u)*4.236)] sm:pt-32 pb-8
        overflow-hidden
        px-4
      "
      >
        {/* Light glow */}
        <LightGlow className="max-sm:-top-52 sm-top-32 bottom-0 h-224 w-screen" />

        {children}
      </div>
    </div>
  );
};

export default Layout;
