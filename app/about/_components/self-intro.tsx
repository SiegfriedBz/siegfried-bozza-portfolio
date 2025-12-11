import { TypographyH5 } from "@/app/_components/typography/h5";

export const SelfIntro = () => {
  return (
    <TypographyH5 className="tracking-wider">
      I&apos;m a <span className="font-extrabold">full-stack developer</span>{" "}
      with a background in molecular biology and civil engineering. I&apos;ve
      worked in Canada, France, and Switzerland, and{" "}
      <span className="font-extrabold">
        thrive in multicultural, dynamic environments
      </span>
      .
      <span className="inline-block">
        I build efficient, maintainable applications with{" "}
        <span className="font-extrabold">React</span> and{" "}
        <span className="font-extrabold">Next.js</span>, and I&apos;m passionate
        about <span className="font-extrabold">exploring Web3</span>.
      </span>
    </TypographyH5>
  );
};
