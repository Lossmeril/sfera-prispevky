type GeneratorType = {
  name: string;
  link: string;
};

export const generatablePosts: GeneratorType[] = [
  { name: "Příspěvek s jedním prvkem", link: "/posts/one-element" },
  { name: "Příspěvek se dvěma prvky", link: "/posts/two-elements" },
];

export const generatableScreens: GeneratorType[] = [
  { name: "Obrazovka se čtyřmi prvky", link: "" },
];

export const generatableWebThumbs: GeneratorType[] = [
  { name: "Víkendovka", link: "" },
];

export const generatablePosters: GeneratorType[] = [
  { name: "Plakátek se dvěma prvky", link: "" },
  { name: "Informační cedule", link: "/posters/sign" },
];
