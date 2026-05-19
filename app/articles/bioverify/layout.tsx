import { LightGlow } from "@/app/_components/light-glow";
import type { FC, PropsWithChildren } from "react";
import "./article.css";

const Layout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <div className="bioverify-font-scope">
      <div className="relative overflow-hidden pb-16 pt-24 sm:pt-32">
        <LightGlow className="-top-32 h-224" />
        <div className="bioverify-article relative z-10 mx-auto max-w-3xl px-4 sm:px-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
