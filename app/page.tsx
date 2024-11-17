import Image from "next/image";
import Link from "next/link";

const GeneratorsHomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center px-[20%]">
      <h1 className="main-heading">Co budeme dneska generovat?</h1>
      <div className="mt-28 flex flex-row flex-nowrap gap-5">
        <Link
          href="/post-2-images"
          className="border rounded-lg w-1/4 aspect-[4/6] hover:scale-105 transition-all overflow-hidden hover:shadow-md"
        >
          <div className="w-full aspect-square border-b relative">
            <Image
              src="/img/post-2-images.jpg"
              fill
              alt="Příspěvek se dvěma symboly"
            />
          </div>
          <div className="h-1/3 w-full p-5 flex flex-col justify-center text-center">
            <h2>Příspěvek se dvěma symboly</h2>
          </div>
        </Link>

        <Link
          href="/post-2-images"
          className="border rounded-lg w-1/4 aspect-[4/6] hover:scale-105 transition-all overflow-hidden hover:shadow-md"
        >
          <div className="w-full aspect-square border-b"></div>
          <div className="h-1/3 w-full p-5 flex flex-col justify-center text-center">
            <h2>Příspěvek se čtyřmi symboly</h2>
          </div>
        </Link>

        <Link
          href="/post-2-images"
          className="border rounded-lg w-1/4 aspect-[4/6] hover:scale-105 transition-all overflow-hidden hover:shadow-md"
        >
          <div className="w-full aspect-square border-b"></div>
          <div className="h-1/3 w-full p-5 flex flex-col justify-center text-center">
            <h2>Informační příspěvek s obrázkem</h2>
          </div>
        </Link>

        <Link
          href="/post-2-images"
          className="border rounded-lg w-1/4 aspect-[4/6] hover:scale-105 transition-all overflow-hidden hover:shadow-md"
        >
          <div className="w-full aspect-square border-b"></div>
          <div className="h-1/3 w-full p-5 flex flex-col justify-center text-center">
            <h2>Příspěvek s referencí</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default GeneratorsHomePage;
