"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { ElementKey, Facility } from "@/utils/types";
import ElementSelector from "@/components/inputs/elementSelector";
import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";

import { PosterSignGrid } from "@/components/layoutTemplates/posterSign";
import LongTextInput from "@/components/inputs/longTextInput";
import splitParagraphs from "@/utils/splitParagraphs";

const PostTwoElementsGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState<string>("Váš nápis zde");
  const [elements, setElements] = useState<Record<ElementKey, string | null>>({
    element1: null,
    element2: null,
    element3: null,
    element4: null,
  });

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://branding.sferagrafika.eu/api/facilities"
        );
        if (!res.ok) throw new Error("Failed to fetch items");
        const data: Facility[] = await res.json();
        setFacilities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="h-auto flex flex-col lg:flex-row">
      <MenuSection>
        <MenuBlock>
          <h1 className="text-xl font-bold">Generátor: Informační cedule</h1>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold mb-2">Prvky a pozadí</h2>
          <div className="grid grid-cols-4 gap-2">
            <ElementSelector
              label="Vybrat prvek 1"
              imageUrl={elements.element1 || ""}
              onSelect={(url) =>
                setElements((prev) => ({ ...prev, element1: url }))
              }
            />

            <ElementSelector
              label="Vybrat prvek 2"
              imageUrl={elements.element2 || ""}
              onSelect={(url) =>
                setElements((prev) => ({ ...prev, element2: url }))
              }
            />

            <ElementSelector
              label="Vybrat prvek 3"
              imageUrl={elements.element3 || ""}
              onSelect={(url) =>
                setElements((prev) => ({ ...prev, element3: url }))
              }
            />

            <ElementSelector
              label="Vybrat prvek 4"
              imageUrl={elements.element4 || ""}
              onSelect={(url) =>
                setElements((prev) => ({ ...prev, element4: url }))
              }
            />
          </div>
        </MenuBlock>
        <MenuBlock>
          <h2 className="font-bold mb-2">Text cedule</h2>
          <LongTextInput text={text} setText={setText} />
        </MenuBlock>
      </MenuSection>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <PreviewSection>
        <div className="scale-[25%] origin-top-left ">
          <div
            className="relative pointer-events-none bg-white flex flex-row flex-nowrap overflow-hidden"
            style={{ height: "1786px", width: "2526px" }}
          >
            <PosterSignGrid>
              <div className="flex flex-row flex-nowrap">
                <div className="w-[566.5px] aspect-square border-black border-b-2 border-r-2 relative">
                  {elements.element1 && (
                    <Image
                      src={elements.element1}
                      alt="Image 1"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
                <div className="w-[566.5px] aspect-square border-black border-b-2 border-r-2 relative">
                  {elements.element2 && (
                    <Image
                      src={elements.element2}
                      alt="Image 2"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
                <div className="w-[566.5px] aspect-square border-black border-b-2 border-r-2 relative">
                  {elements.element3 && (
                    <Image
                      src={elements.element3}
                      alt="Image 3"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
                <div className="w-[566.5px] aspect-square border-black border-b-2 relative">
                  {elements.element4 && (
                    <Image
                      src={elements.element4}
                      alt="Image 4"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
              </div>

              <div className="w-full h-full grid text-left overflow-hidden my-[9rem]">
                {splitParagraphs({
                  text,
                  cssStyles:
                    "text-[9.2em] font-bold leading-[1.3] alt-glyphs tracking-[-0.02em] ml-44 mr-32",
                })}
              </div>
            </PosterSignGrid>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default PostTwoElementsGenerator;
