import { generatablePosts } from "@/datasets/generatableImages";
import Image from "next/image";
import Link from "next/link";

const GeneratorsHomePage = () => {
  fetch("https://branding.sferagrafika.eu/api/facilities")
    .then((res) => res.json())
    .then(console.log)
    .catch(console.error);

  return (
    <div className="w-screen h-auto mt-8 flex flex-col justify-center px-[10%]">
      <h1 className="above-heading mt-14 mb-3 text-xl md:text-2xl xl:text-3xl">
        Generátor sférických příspěvků
      </h1>
      <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-left leading-none border border-black w-full p-4 border-b-0">
        Příspěvky
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-20 w-full border-y border-black">
        {generatablePosts.map((post) => (
          <Link
            href={post.link}
            className="hover:grayscale transition-all"
            key={post.link}
          >
            <div className="border-l last-of-type:border-r border-black w-full overflow-hidden aspect-[3/4] ">
              <div className="w-full aspect-square border-b border-black relative">
                <Image src={"/img" + post.link + ".jpg"} fill alt={post.name} />
              </div>
              <div className="h-1/4 w-full p-5 flex flex-col justify-center text-center">
                <h2 className="font-medium leading-tight">{post.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GeneratorsHomePage;
