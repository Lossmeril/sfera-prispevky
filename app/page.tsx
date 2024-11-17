import { generatableImages } from "@/datasets/generatableImages";
import Image from "next/image";
import Link from "next/link";

const GeneratorsHomePage = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center px-[10%]">
      <div className="bg-accent-pink p-5">
        <p>
          <strong>Varování:</strong> V současnosti existuje bug, který vyhodí
          chybu při nahrání příliš velkého obrázku a ovlivňuje i některé
          kombiace prvků. V blízké budoucnosti bude aplikace přeprogramována,
          aby používala interní obrázky, místo nahrávání.
        </p>
      </div>
      <p className="above-heading mt-14">Generátor sférických příspěvků</p>
      <h1 className="text-[4.5em] font-bold text-center leading-none mb-14">
        Co budeme dneska generovat?
      </h1>

      <div className=" flex flex-row flex-nowrap gap-5">
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
