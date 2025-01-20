"use client";

import React, { useRef, useState } from "react";

import { toPng } from "html-to-image";

import Image from "next/image";

import { removeEmojis } from "@/utils/formatters";
import {
  bgColorsValidate,
  lengthValidate,
  uppercaseValidate,
} from "@/utils/validators";
import { facilities } from "@/datasets/facilities";
import ErrorText from "@/components/error-text";
import { elementSets } from "@/datasets/elements";
import { accents } from "@/datasets/colors";

const DidYouKnowGenerator = () => {
  const didYouKnows = ["Víte, že", "Věděli jste, že", "Víte,", "Věděli jste,"];

  //--- STATES AND REFS --------------------------------------------------------------
  const [didYouKnow, setdidYouKnow] = useState(didYouKnows[0]);
  const [heading, setHeading] = useState("");

  const [elementSet1, setElementSet1] = useState(elementSets[0]);
  const [element1No, setElement1No] = useState(1);
  const [element1BG, setElement1BG] = useState("");

  const [elementSet2, setElementSet2] = useState(elementSets[0]);
  const [element2No, setElement2No] = useState(1);
  const [element2BG, setElement2BG] = useState("");

  const [elementSet3, setElementSet3] = useState(elementSets[0]);
  const [element3No, setElement3No] = useState(1);
  const [element3BG, setElement3BG] = useState("");

  const [facility, setFacility] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  //--- UPLOAD FUNCTION --------------------------------------------------------------
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  //--- UPDATE IMAGE FUNCTION --------------------------------------------------------------

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
    }
  };

  //--- VALIDATOR FUNCTIONS --------------------------------------------------------------

  const areBGColorsNotSame = bgColorsValidate([
    element1BG,
    element2BG,
    element3BG,
  ]);

  const areImagesNotSame = bgColorsValidate([
    elementSet1.elementPrefix + element1No,
    elementSet2.elementPrefix + element2No,
    elementSet3.elementPrefix + element3No,
  ]);

  const isHeadingSet = heading !== "";

  const isHeadingNotUppercase = uppercaseValidate(heading);

  //--- IMAGE GENERATOR --------------------------------------------------------------
  const handleGenerate = async () => {
    if (previewRef.current) {
      const pngData = await toPng(previewRef.current, {
        width: 1080,
        height: 1080,
      });
      const link = document.createElement("a");
      link.download =
        "SFÉRA_1080x1080px_" +
        heading
          .split(":")[0]
          .replace(/ /g, "-")
          .replace(/[#%&:*!?]/, "")
          .toLowerCase() +
        "-prispevek.png";
      link.href = pngData;
      link.click();
    }
  };

  return (
    <div className="p-4 h-auto flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-10 border-r">
        {/* --- INPUT SECTION -------------------------------------------------------------- */}
        <h1 className="text-xl font-bold mb-4">Generátor: Víte, že?</h1>

        <div className="w-full">
          <label className="block font-semibold">Začátek věty</label>
          <select
            onChange={(e) => setdidYouKnow(e.target.value)}
            className="border-2 px-6 py-1 w-full"
          >
            {didYouKnows.map((start) => (
              <option key={start}>{start}</option>
            ))}
          </select>
        </div>

        {/* --- NAME, TYPE AND DESCRIPTION SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="flex flex-row flex-nowrap w-full gap-5">
            <div className="mb-4 w-full">
              <label className="block font-semibold">
                Fakt<span className="text-sos"> *</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={heading}
                  onChange={(e) => setHeading(removeEmojis(e.target.value))}
                  className="border p-2 w-full"
                  maxLength={80}
                  style={{
                    borderColor: isHeadingNotUppercase ? "" : "var(--sos)",
                  }}
                />
                <p className="absolute text-slate-400 right-3 top-2">
                  {80 - heading.length}
                </p>
              </div>
            </div>
          </div>
        </div>

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

          <div className="flex flex-col lg:flex-row flex-nowrap w-full gap-3 mb-12 lg:mb-0">
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

          <div className="flex flex-col lg:flex-row flex-nowrap w-full gap-3 mb-12 lg:mb-0">
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
        </div>

        {/* --- FACILITY SECTION --- */}
        <div className="w-full py-5 border-b">
          <label className="block font-semibold">Kdo sdílí fakt?</label>
          <select
            onChange={(e) => setFacility(parseInt(e.target.value))}
            className="border-2 px-6 py-1"
          >
            <option value={0}>Nechat prázdné</option>
            {facilities.map((facility) => (
              <option value={facility.id} key={facility.name}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- DOWNLOAD SECTION --- */}
        <div className="w-full py-5">
          {
            // Is the title set?
            isHeadingSet &&
            // Is the title not all uppercase?
            isHeadingNotUppercase &&
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

                {!isHeadingSet ? (
                  <ErrorText>Prosím, vyplň fakt</ErrorText>
                ) : (
                  <></>
                )}
                {!isHeadingNotUppercase ? (
                  <ErrorText>Fakt nepíšeme velkými písmeny</ErrorText>
                ) : (
                  <></>
                )}
                {!isHeadingSet ? (
                  <ErrorText>Prosím, vyplň text</ErrorText>
                ) : (
                  <></>
                )}
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
      <div className="w-full lg:w-1/2 pointer-events-none max-h-screen overflow-hidden">
        <div className="scale-[35%] lg:scale-50 origin-top-left lg:origin-[50%_25%]">
          <div
            ref={previewRef}
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap announcement"
            style={{ width: "1080px", height: "1080px" }}
          >
            <div className="w-[100px] h-full border-black border-r-2">
              <div className="h-[100px] w-full border-black border-b-2"></div>
              <div className="h-[880px] w-full border-black border-b-2"></div>
            </div>
            <div className="w-[880px] h-full border-black border-r-2">
              <div className="h-[100px] w-full border-black border-b-2"></div>
              <div className="h-[880px] w-full border-black border-b-2 flex flex-col overflow-hidden">
                <div className="w-full grid grid-cols-3 border-b-2 border-black">
                  <div
                    className="w-full aspect-square border-black border-r-2 relative"
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
                  <div
                    className="w-[293.33px] aspect-square border-black  border-r-2 relative"
                    style={{ backgroundColor: element2BG }}
                  >
                    {elementSet2 && (
                      <Image
                        src={
                          "/img/elements/" +
                          elementSet2.elementPrefix +
                          "motiv" +
                          element2No +
                          ".png"
                        }
                        alt="Image 2"
                        className="object-cover"
                        fill
                      />
                    )}
                  </div>
                  <div
                    className="w-[293.33px] aspect-square border-black relative"
                    style={{ backgroundColor: element3BG }}
                  >
                    {elementSet3 && (
                      <Image
                        src={
                          "/img/elements/" +
                          elementSet3.elementPrefix +
                          "motiv" +
                          element3No +
                          ".png"
                        }
                        alt="Image 3"
                        className="object-cover"
                        fill
                      />
                    )}
                  </div>
                </div>
                {facility !== 0 ? (
                  <div
                    className="w-full h-16 border-b-2 border-black flex flex-row justify-center items-center text-center"
                    style={{
                      backgroundColor:
                        "var(--" +
                        facilities[facility - 1].colorBgVarName +
                        ")",
                    }}
                  >
                    <p className="facility text-white">
                      {facilities[facility - 1].name}
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <div className="mx-[60px] h-full flex flex-col justify-center gap-10 py-[20px]">
                  <p className="dyk-heading">{didYouKnow}</p>
                  <div className="">
                    {heading ? (
                      <h2 className="dyk-heading">{heading + "?"}</h2>
                    ) : (
                      <></>
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

export default DidYouKnowGenerator;
