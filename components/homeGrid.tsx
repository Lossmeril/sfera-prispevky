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
  const emptySpaces =
    items.length % 4 !== 0 ? Array(4 - (items.length % 4)).fill(null) : [];

  return (
    <>
      <h2 className="text-xl md:text-2xl xl:text-3xl font-bold text-left leading-none border border-black w-full p-4 border-b-0 alt-glyphs">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mb-20 w-full border-t border-black">
        {items.map((item, index) => (
          <Link
            href={item.link}
            className="hover:grayscale transition-all border-l border-b border-black w-full overflow-hidden aspect-[3/4] flex flex-col"
            key={index}
          >
            <div className="w-full aspect-square border-b border-black relative bg-white grid place-content-center">
              <Image
                src={
                  item.link
                    ? `/img${item.link}.jpg`
                    : "https://placehold.co/400?text=Coming+Soon"
                }
                fill
                alt={item.name}
                className="p-4"
              />
            </div>
            <div className="w-full h-32 text-center grid place-content-center">
              <h2 className="font-medium leading-tight m-0">{item.name}</h2>
            </div>
          </Link>
        ))}

        {emptySpaces.map((_, index) => (
          <div
            key={`empty-${index}`}
            className="border-l last-of-type:border-r border-b border-black w-full overflow-hidden aspect-[3/4] bg-white hidden lg:block"
          ></div>
        ))}
      </div>
    </>
  );
};

export default GeneratorGrid;
