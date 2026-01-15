type GeneratorType = {
  name: string;
  link: string;
};

export const generatablePosts: GeneratorType[] = [
  { name: "Příspěvek s jedním prvkem", link: "/posts/one-element" },
  {
    name: "Příspěvek s jedním prvkem a názvem akce",
    link: "/posts/one-element-heading",
  },
  {
    name: "Příspěvek s velkým obrázkem a názvem akce",
    link: "/posts/large-image-heading",
  },
  { name: "Příspěvek se dvěma prvky", link: "/posts/two-elements" },
  { name: "Příspěvek se čtyřmi prvky", link: "/posts/four-elements" },
];

export const generatableScreens: GeneratorType[] = [
  { name: "Obrazovka se čtyřmi prvky", link: "/screens/four-elements" },
];

export const generatableWebThumbs: GeneratorType[] = [
  { name: "Víkendovka", link: "/web/weekend" },
];

export const generatablePosters: GeneratorType[] = [
  { name: "Informační cedule", link: "/posters/sign" },
  { name: "Plakátek A4 s jedním prvkem", link: "/posters/one-element" },
  {
    name: "Inverzní plakátek A4 s jedním prvkem",
    link: "/posters/one-element-inverse",
  },
  { name: "Plakátek A4 se dvěma prvky", link: "" },
  { name: "Plakátek A4 s obrázkem a prvkem", link: "" },
  { name: "Plakátek A4 s obrázkem a QR kódem", link: "" },
];
