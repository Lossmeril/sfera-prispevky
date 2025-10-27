"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PostGridSimple } from "@/components/layoutTemplates/postGridBasic";
import { ElementKey, Facility } from "@/utils/types";
import ElementSelector from "@/components/inputs/elementSelector";
import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";
import LoadingSkeleton from "@/components/loadingSkeleton";

const PostTwoElementsGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [elements, setElements] = useState<Record<ElementKey, string | null>>({
    element1: null,
    element2: null,
    element3: null,
    element4: null,
  });

  const [facility, setFacility] = useState<number>(0);

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
          <h1 className="text-xl font-bold">
            Generátor: Příspěvek se dvěma prvky
          </h1>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold mb-2">Prvky a pozadí</h2>
          <div className="flex flex-row gap-2">
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
          </div>
        </MenuBlock>
        <MenuBlock>
          <h2 className="font-bold">Kdo zaštiťuje akci?</h2>
          <div className="w-full mt-2">
            {loading && <LoadingSkeleton height="h-10" />}
            {facilities.length === 0 && !loading && (
              <p>Žádné místnosti nejsou k dispozici.</p>
            )}
            {facilities.length > 0 && (
              <select
                className="border p-2 w-full"
                value={facility}
                onChange={(e) => setFacility(Number(e.target.value))}
              >
                <option value={0}>-- Vyberte dílnu / laboratoř --</option>
                {facilities
                  .filter((facility) => facility.id !== 0)
                  .map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
              </select>
            )}
          </div>
        </MenuBlock>
      </MenuSection>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <PreviewSection>
        <div className="scale-[35%] lg:scale-50 origin-top-left lg:origin-[50%_15%]">
          <div
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap"
            style={{ width: "1080px", height: "1350px" }}
          >
            <PostGridSimple>
              <div className="flex flex-row flex-nowrap">
                <div className="w-[440px] aspect-square border-black border-b-2 border-r-2 relative">
                  {/* {image1 && (
                      <Image
                        src={URL.createObjectURL(image1)}
                        alt="Image 1"
                        className="object-cover"
                        fill
                      />
                      
                    )} */}

                  {elements.element1 && (
                    <Image
                      src={elements.element1}
                      alt="Image 1"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
                <div className="w-[440px] aspect-square border-black border-b-2 relative">
                  {elements.element2 && (
                    <Image
                      src={elements.element2}
                      alt="Image 2"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
              </div>
              {facility !== 0 ? (
                <div
                  className="w-full h-14 border-b-2 border-black flex flex-row justify-center items-center text-center"
                  style={{
                    backgroundColor: facilities[facility].colorBg,
                  }}
                >
                  <p className="facility text-white">
                    {facilities[facility].name}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </PostGridSimple>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default PostTwoElementsGenerator;
