"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { toPng } from "html-to-image";

import { bgColorsValidate, imageUploadValidate } from "@/utils/validators";
import { accents } from "@/datasets/colors";
import ErrorText from "@/components/error-text";
import { elementSets } from "@/datasets/elements";

const Post2ImagesGenerator = () => {
  //--- STATES AND REFS --------------------------------------------------------------

  const [elementSet1, setElementSet1] = useState(elementSets[0]);
  const [element1No, setElement1No] = useState(1);
  const [element1BG, setElement1BG] = useState("");

  const [elementSet2, setElementSet2] = useState(elementSets[0]);
  const [element2No, setElement2No] = useState(1);
  const [element2BG, setElement2BG] = useState("");

  const [elementSet3, setElementSet3] = useState(elementSets[0]);
  const [element3No, setElement3No] = useState(1);
  const [element3BG, setElement3BG] = useState("");

  const [elementSet4, setElementSet4] = useState(elementSets[0]);
  const [element4No, setElement4No] = useState(1);
  const [element4BG, setElement4BG] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  //--- IMAGES UPDATE FUNCTION --------------------------------------------------------------
  const updateSetAndNumber = (index: number, elementNumber: number): void => {
    switch (elementNumber) {
      case 1:
        setElementSet1(elementSets[index]);
        setElement1No(1);
        return;

      case 2:
        setElementSet2(elementSets[index]);
        setElement2No(1);
        return;

      case 3:
        setElementSet3(elementSets[index]);
        setElement3No(1);
        return;

      case 4:
        setElementSet4(elementSets[index]);
        setElement4No(1);
        return;
    }
  };

  //--- VALIDATOR VARIABLES --------------------------------------------------------------

  //--- VALIDATOR FUNCTIONS --------------------------------------------------------------

  const areBGColorsNotSame = bgColorsValidate([
    element1BG,
    element2BG,
    element3BG,
    element4BG,
  ]);

  const areImagesNotSame = bgColorsValidate([
    elementSet1.elementPrefix + element1No,
    elementSet2.elementPrefix + element2No,
    elementSet3.elementPrefix + element3No,
    elementSet4.elementPrefix + element4No,
  ]);

  //--- IMAGE GENERATOR --------------------------------------------------------------
  const handleGenerate = async () => {
    if (previewRef.current) {
      const pngData = await toPng(previewRef.current, {
        width: 1080,
        height: 1080,
      });
      const link = document.createElement("a");
      link.download = "SFÉRA_1080x1080px_4-obrazky-prispevek.png";
      link.href = pngData;
      link.click();
    }
  };

  console.clear();

  return (
    <div className="p-4 h-auto flex flex-row">
      <div className="w-1/2 p-10 border-r">
        {/* --- INPUT SECTION -------------------------------------------------------------- */}
        <h1 className="text-xl font-bold mb-4">
          Generátor: Příspěvek se čtyřmi symboly
        </h1>

        {/* --- IMAGES SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="flex flex-row flex-nowrap w-full gap-3">
            <div className="w-full">
              <label className="block font-semibold">První prvek</label>
              <select
                onChange={(e) =>
                  updateSetAndNumber(parseInt(e.target.value), 1)
                }
                className="border-2 px-6 py-1 mb-2"
                style={{
                  borderColor: areImagesNotSame ? "" : "var(--sos)",
                }}
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
                style={{
                  borderColor: areImagesNotSame ? "" : "var(--sos)",
                }}
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
                  borderColor: areBGColorsNotSame ? "" : "var(--sos)",
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

          <div className="flex flex-row flex-nowrap w-full gap-3">
            <div className="w-full">
              <label className="block font-semibold">Druhý prvek</label>
              <select
                onChange={(e) =>
                  updateSetAndNumber(parseInt(e.target.value), 2)
                }
                className="border-2 px-6 py-1 mb-2"
                style={{
                  borderColor: areImagesNotSame ? "" : "var(--sos)",
                }}
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
                  element2No > elementSet2.numberOfElements
                    ? elementSet2.numberOfElements
                    : element2No
                }
                onChange={(e) => setElement2No(parseInt(e.target.value))}
                min={1}
                max={elementSet2.numberOfElements}
                style={{
                  borderColor: areImagesNotSame ? "" : "var(--sos)",
                }}
              />
            </div>
            <div className="w-full">
              <label className="block font-semibold">Podkladová barva 2</label>
              <select
                onChange={(e) => setElement2BG(e.target.value)}
                className="border-2 px-6 py-1 w-full"
                style={{
                  backgroundColor:
                    element2BG !== "var(--white)" ? element2BG : "",
                  borderColor: areBGColorsNotSame ? "" : "var(--sos)",
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

          <div className="flex flex-row flex-nowrap w-full gap-3">
            <div className="w-full">
              <label className="block font-semibold">Třetí prvek</label>
              <select
                onChange={(e) =>
                  updateSetAndNumber(parseInt(e.target.value), 3)
                }
                className="border-2 px-6 py-1 mb-2"
                style={{
                  borderColor: areImagesNotSame ? "" : "var(--sos)",
                }}
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
                  element1No > elementSet3.numberOfElements
                    ? elementSet3.numberOfElements
                    : element3No
                }
                onChange={(e) => setElement3No(parseInt(e.target.value))}
                min={1}
                max={elementSet3.numberOfElements}
                style={{
                  borderColor: areImagesNotSame ? "" : "var(--sos)",
                }}
              />
            </div>
            <div className="w-full">
              <label className="block font-semibold">Podkladová barva 3</label>
              <select
                onChange={(e) => setElement3BG(e.target.value)}
                className="border-2 px-6 py-1 w-full"
                style={{
                  backgroundColor:
                    element1BG !== "var(--white)" ? element3BG : "",
                  borderColor: areBGColorsNotSame ? "" : "var(--sos)",
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

          <div className="flex flex-row flex-nowrap w-full gap-3">
            <div className="w-full">
              <label className="block font-semibold">Čtvrtý prvek</label>
              <select
                onChange={(e) =>
                  updateSetAndNumber(parseInt(e.target.value), 4)
                }
                className="border-2 px-6 py-1 mb-2"
                style={{
                  borderColor: areImagesNotSame ? "" : "var(--sos)",
                }}
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
                  element2No > elementSet4.numberOfElements
                    ? elementSet4.numberOfElements
                    : element4No
                }
                onChange={(e) => setElement4No(parseInt(e.target.value))}
                min={1}
                max={elementSet4.numberOfElements}
                style={{
                  borderColor: areImagesNotSame ? "" : "var(--sos)",
                }}
              />
            </div>
            <div className="w-full">
              <label className="block font-semibold">Podkladová barva 4</label>
              <select
                onChange={(e) => setElement4BG(e.target.value)}
                className="border-2 px-6 py-1 w-full"
                style={{
                  backgroundColor:
                    element4BG !== "var(--white)" ? element4BG : "",
                  borderColor: areBGColorsNotSame ? "" : "var(--sos)",
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
          {
            // Are the images not same?
            areImagesNotSame &&
            // Are the colors not same
            areBGColorsNotSame ? (
              <button
                onClick={handleGenerate}
                className="mt-4 border-2 border-black px-8 py-4 font-bold"
              >
                Stáhnout příspěvek (.png)
              </button>
            ) : (
              <>
                <button className="my-4 border-2 border-gray-400 bg-gray-300 px-8 py-4 font-bold text-gray-400">
                  Stáhnout příspěvek (.png)
                </button>

                {!areImagesNotSame ? (
                  <ErrorText>
                    Na příspěvku nesmí být dva stejné symboly
                  </ErrorText>
                ) : (
                  <></>
                )}
                {!areBGColorsNotSame ? (
                  <ErrorText>Barvy pozadí nesmí být stejné</ErrorText>
                ) : (
                  <></>
                )}
              </>
            )
          }
        </div>
      </div>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <div className="w-1/2 pointer-events-none max-h-screen overflow-hidden">
        <div className="scale-50" style={{ transformOrigin: "center 25%" }}>
          <div
            ref={previewRef}
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap"
            style={{ width: "1080px", height: "1080px" }}
          >
            <div className="w-[100px] h-full border-black border-r-2">
              <div className="h-[100px] w-full border-black border-b-2"></div>
              <div className="h-[880px] w-full border-black border-b-2"></div>
            </div>
            <div className="w-[880px] h-full border-black border-r-2">
              <div className="h-[100px] w-full border-black border-b-2"></div>
              <div className="h-[880px] w-full border-black border-b-2 flex flex-col overflow-hidden">
                <div className="flex flex-row flex-nowrap">
                  <div
                    className="w-[440px] aspect-square border-black border-b-2 border-r-2 relative"
                    style={{ backgroundColor: element1BG }}
                  >
                    {elementSet1 && (
                      <Image
                        src={
                          "/img/elements/" +
                          elementSet1.elementPrefix +
                          "motiv" +
                          (element1No !== 1 ? element1No : "") +
                          ".png"
                        }
                        alt="Image 2"
                        className="object-cover"
                        fill
                      />
                    )}
                  </div>
                  <div
                    className="w-[440px] aspect-square border-black border-b-2 relative"
                    style={{ backgroundColor: element2BG }}
                  >
                    {elementSet2 && (
                      <Image
                        src={
                          "/img/elements/" +
                          elementSet2.elementPrefix +
                          "motiv" +
                          (element2No !== 1 ? element2No : "") +
                          ".png"
                        }
                        alt="Image 2"
                        className="object-cover"
                        fill
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-row flex-nowrap">
                  <div
                    className="w-[440px] aspect-square border-black border-r-2 relative"
                    style={{ backgroundColor: element3BG }}
                  >
                    {elementSet3 && (
                      <Image
                        src={
                          "/img/elements/" +
                          elementSet3.elementPrefix +
                          "motiv" +
                          (element3No !== 1 ? element3No : "") +
                          ".png"
                        }
                        alt="Image 2"
                        className="object-cover"
                        fill
                      />
                    )}
                  </div>
                  <div
                    className="w-[440px] aspect-square relative"
                    style={{ backgroundColor: element4BG }}
                  >
                    {elementSet4 && (
                      <Image
                        src={
                          "/img/elements/" +
                          elementSet4.elementPrefix +
                          "motiv" +
                          (element4No !== 1 ? element4No : "") +
                          ".png"
                        }
                        alt="Image 2"
                        className="object-cover"
                        fill
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100px] h-full border-black ">
              <div className="h-[100px] w-full border-black border-b-2"></div>
              <div className="h-[880px] w-full border-black border-b-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post2ImagesGenerator;
