import { generatableImages } from "@/datasets/generatableImages";
import Image from "next/image";
import Link from "next/link";

const GeneratorsHomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center px-[20%]">
      <h1 className="main-heading">Co budeme dneska generovat?</h1>
      <div className="mt-28 flex flex-row flex-nowrap gap-5">
        {generatableImages.map((post) => (
          <Link
            href={"/" + post.link}
            className="border rounded-lg w-1/4 aspect-[3/4] hover:scale-105 transition-all overflow-hidden hover:shadow-md"
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
