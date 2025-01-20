import { generatableImages } from "@/datasets/generatableImages";
import Image from "next/image";
import Link from "next/link";

const GeneratorsHomePage = () => {
  return (
    <div className="w-screen h-auto mt-8 flex flex-col justify-center px-[10%]">
      <p className="above-heading mt-14 mb-3 text-xl md:text-2xl xl:text-3xl">
        Generátor sférických příspěvků
      </p>
      <h1 className="text-[3em] md:text-[3.5em] xl:text-[4.5em] font-bold text-center leading-none mb-14">
        Co budeme dneska generovat?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-20">
        {generatableImages.map((post) => (
          <Link
            href={"/" + post.link}
            className="border rounded-lg w-full aspect-[3/4] hover:scale-105 transition-all overflow-hidden hover:shadow-md"
            key={post.link}
          >
            <div className="w-full aspect-square border-b relative">
              <Image src={"/img/" + post.link + ".jpg"} fill alt={post.name} />
            </div>
            <div className="h-1/4 w-full p-5 flex flex-col justify-center text-center">
              <h2 className="font-medium leading-tight">{post.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GeneratorsHomePage;
