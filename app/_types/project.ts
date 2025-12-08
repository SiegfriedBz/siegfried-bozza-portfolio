export type Project = {
  slug: string;
  year: number;
  title: {
    h1: string;
    h2: string;
  };
  description: {
    short: string;
    overview: string;
  };

  features: {
    key: string;
    description: string;
  }[];

  challenges: string;
  outcome: string;

  stack: {
    all: string[];
    main: {
      key: string;
      description: string;
    }[];
  };

  images: string[];
  gifs: string[];

  links: {
    page: string;
    live: string;
    github: string;
  };
};
