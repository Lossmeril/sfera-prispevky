// components/GeneratorGrid.tsx
import Image from "next/image";
import Link from "next/link";

export interface GeneratorItem {
  name: string;
  link: string;
}

interface GeneratorGridProps {
  title: string;
  items: GeneratorItem[];
}

const GeneratorGrid = ({ title, items }: GeneratorGridProps) => {
  return (
    <>
      <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-left leading-none border border-black w-full p-4 border-b-0">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-20 w-full border-y border-black">
        {items.map((item) => (
          <Link
            href={item.link}
            className="hover:grayscale transition-all"
            key={item.link}
          >
            <div className="border-l last-of-type:border-r border-black w-full overflow-hidden aspect-[3/4]">
              <div className="w-full aspect-square border-b border-black relative">
                <Image
                  src={
                    item.link
                      ? `/img${item.link}.jpg`
                      : "https://placehold.co/400?text=Coming+Soon"
                  }
                  fill
                  alt={item.name}
                />
              </div>
              <div className="h-1/4 w-full p-5 flex flex-col justify-center text-center">
                <h2 className="font-medium leading-tight">{item.name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default GeneratorGrid;
