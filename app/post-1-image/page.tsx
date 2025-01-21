"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { toPng } from "html-to-image";

import { accents } from "@/datasets/colors";
import { elementSets } from "@/datasets/elements";
import PostGrid from "@/components/posts/postGrid";

const Post2ImagesGenerator = () => {
  //--- STATES AND REFS --------------------------------------------------------------

  const [elementSet1, setElementSet1] = useState(elementSets[0]);
  const [element1No, setElement1No] = useState(1);
  const [element1BG, setElement1BG] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  //--- IMAGES UPDATE FUNCTION --------------------------------------------------------------
  const updateSetAndNumber = (index: number, elementNumber: number): void => {
    switch (elementNumber) {
      case 1:
        setElementSet1(elementSets[index]);
        setElement1No(1);
        return;
    }
  };

  //--- IMAGE GENERATOR --------------------------------------------------------------
  const handleGenerate = async () => {
    if (previewRef.current) {
      const pngData = await toPng(previewRef.current, {
        width: 1080,
        height: 1080,
      });
      const link = document.createElement("a");
      link.download = "SFÉRA_1080x1080px_1-obrazek-prispevek.png";
      link.href = pngData;
      link.click();
    }
  };

  return (
    <div className="p-4 h-auto flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-10 border-r">
        {/* --- INPUT SECTION -------------------------------------------------------------- */}
        <h1 className="text-xl font-bold mb-4">
          Generátor: Příspěvek s jedním symbolem
        </h1>

        {/* --- IMAGES SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="flex flex-col lg:flex-row flex-nowrap w-full gap-3">
            <div className="w-full">
              <label className="block font-semibold">První prvek</label>
              <select
                onChange={(e) =>
                  updateSetAndNumber(parseInt(e.target.value), 1)
                }
                className="border-2 px-6 py-1 mb-2"
              >
                {elementSets.map((set, index) => (
                  <option value={index} key={set.name}>
                    {set.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <label className="block font-semibold">Číslo prvku</label>
              <input
                type="number"
                className="border-2 px-6 py-1 mb-2 w-full"
                value={
                  element1No > elementSet1.numberOfElements
                    ? elementSet1.numberOfElements
                    : element1No
                }
                onChange={(e) => setElement1No(parseInt(e.target.value))}
                min={1}
                max={elementSet1.numberOfElements}
              />
            </div>
            <div className="w-full">
              <label className="block font-semibold">Podkladová barva 1</label>
              <select
                onChange={(e) => setElement1BG(e.target.value)}
                className="border-2 px-6 py-1 w-full"
                style={{
                  backgroundColor:
                    element1BG !== "var(--white)" ? element1BG : "",
                }}
              >
                {accents.map((accent) => (
                  <option value={accent.cssVar} key={accent.cssVar}>
                    {accent.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* --- DOWNLOAD SECTION --- */}
        <div className="w-full py-5">
          <button
            onClick={handleGenerate}
            className="mt-4 border-2 border-black px-8 py-4 font-bold"
          >
            Stáhnout příspěvek (.png)
          </button>
        </div>
      </div>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <div className="w-full lg:w-1/2 pointer-events-none max-h-screen overflow-hidden">
        <div className="scale-[35%] lg:scale-50 origin-top-left lg:origin-[50%_25%]">
          <div
            ref={previewRef}
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap"
            style={{ width: "1080px", height: "1080px" }}
          >
            <PostGrid>
              <div className="flex flex-row flex-nowrap">
                <div
                  className="w-full h-[880px] relative"
                  style={{ backgroundColor: element1BG }}
                >
                  {elementSet1 && (
                    <Image
                      src={
                        "/img/elements/" +
                        elementSet1.elementPrefix +
                        "motiv" +
                        element1No +
                        ".png"
                      }
                      alt="Image 1"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
              </div>
            </PostGrid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post2ImagesGenerator;
