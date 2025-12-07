import { FC, PropsWithChildren } from "react";
import { LightGlow } from "../_components/light-glow";

const Layout:FC<PropsWithChildren> =(props) => {
  const {children} = props
  
  return (
    <div className="relative max-w-5xl mx-auto
				flex flex-col items-center justify-center 
				text-center 
        pt-32 pb-16 px-4 overflow-hidden
        min-h-svh
				gap-8
    ">
      {/* Light glow */}
			<LightGlow className="left-0 right-0 -top-32 bottom-0 h-224"/>

			<span className="text-accent-blue font-bold">Recent projects</span>

      {children}
    </div>
  )
}

export default Layout