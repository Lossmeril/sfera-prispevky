"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PostGridSimple } from "@/components/layoutTemplates/postGridBasic";
import { ElementKey, Facility } from "@/utils/types";
import ElementSelector from "@/components/elementSelector";

const PostTwoElementsGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="p-4 h-auto flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-10 border-r">
        <h1 className="text-xl font-bold mb-4">
          Generátor: Příspěvek se dvěma prvky
        </h1>

        <div className="mb-4 flex flex-row gap-2">
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
      </div>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <div className="w-full lg:w-1/2 pointer-events-none max-h-screen overflow-hidden">
        <div className="scale-[35%] lg:scale-50 origin-top-left lg:origin-[50%_25%]">
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
              {/* {facility !== 0 ? (
                <div
                  className="w-full h-32 border-b-2 border-black flex flex-row justify-center items-center text-center"
                  style={{
                    backgroundColor:
                      "var(--" + facilities[facility - 1].colorBgVarName + ")",
                  }}
                >
                  <p className="facility text-white">
                    {facilities[facility - 1].name}
                  </p>
                </div>
              ) : (
                <></>
              )} */}
            </PostGridSimple>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTwoElementsGenerator;
