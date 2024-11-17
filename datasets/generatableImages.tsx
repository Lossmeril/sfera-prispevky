type PostType = {
  name: string;
  link: string;
};

export const generatableImages: PostType[] = [
  { name: "Příspěvek se dvěma obrázky", link: "post-2-images" },
  { name: "Příspěvek se čtyřmi obrázky", link: "post-4-images" },
  { name: "Oznámení s obrázkem", link: "announcement-with-image" },
  { name: "Reference, či citát", link: "testimonial" },
];
