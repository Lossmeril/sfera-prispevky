"use client";

import React, { useRef, useState } from "react";

import { toPng } from "html-to-image";

import Image from "next/image";
import ErrorText from "@/components/error-text";

import { removeEmojis } from "@/utils/formatters";
import {
  bgColorsValidate,
  didYouKnowQuestionValidate,
  uppercaseValidate,
} from "@/utils/validators";

import { facilities } from "@/datasets/facilities";

import { elementSets } from "@/datasets/elements";
import { accents } from "@/datasets/colors";
import SplitParagraph from "@/utils/splitParagraphs";
import PostGrid from "@/components/posts/postGrid";
import GenerateImageButton, {
  InactiveGenerateButton,
} from "@/components/posts/imageGeneratorButton";

const DidYouKnowGenerator = () => {
  const didYouKnows = ["Víte, že", "Věděli jste, že", "Víte,", "Věděli jste,"];

  //--- STATES AND REFS --------------------------------------------------------------
  const [didYouKnow, setdidYouKnow] = useState(didYouKnows[0]);
  const [heading, setHeading] = useState("");
  const [imagePost, setImagePost] = useState(0);

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

  const doesContainQuestionMark = didYouKnowQuestionValidate(heading);

  //--- IMAGE GENERATOR --------------------------------------------------------------
  const handleGenerate = async () => {
    if (previewRef.current) {
      const pngData = await toPng(previewRef.current, {
        width: 1080,
        height: 1350,
      });
      const link = document.createElement("a");
      link.download = "SFÉRA_1080x1350px_vite-ze-prispevek.png";
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
                <textarea
                  value={heading}
                  onChange={(e) => setHeading(removeEmojis(e.target.value))}
                  className="border p-2 w-full"
                  maxLength={175}
                  style={{
                    borderColor: isHeadingNotUppercase ? "" : "var(--sos)",
                  }}
                />
                <p className="absolute text-slate-400 right-3 top-2">
                  {175 - heading.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- IMAGES SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="mb-4 w-full">
            <label className="block font-semibold">
              Chcete zobrazit prvky?
            </label>
            <div className="flex flex-row gap-2">
              <input
                type="radio"
                id="image-yes"
                name="fav_language"
                value="CSS"
                checked={imagePost === 1}
                onChange={() => setImagePost(1)}
              />
              <label className="mr-6" onChange={() => setImagePost(1)}>
                Ano
              </label>
              <input
                type="radio"
                id="image-no"
                name="fav_language"
                value="JavaScript"
                checked={imagePost === 0}
                onChange={() => setImagePost(0)}
              />
              <label onChange={() => setImagePost(0)}>Ne</label>
            </div>
          </div>

          <div
            className="flex flex-col lg:flex-row flex-nowrap w-full gap-3"
            style={{ display: imagePost === 1 ? "flex" : "none" }}
          >
            <div className="w-full">
              <label className="block font-semibold">První prvek</label>
              <select
                onChange={(e) =>
                  updateSetAndNumber(parseInt(e.target.value), 1)
                }
                className="border-2 px-6 py-1 mb-2"
                style={{
                  borderColor:
                    areImagesNotSame || imagePost === 0 ? "" : "var(--sos)",
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
                  borderColor:
                    areImagesNotSame || imagePost === 0 ? "" : "var(--sos)",
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
                  borderColor:
                    areBGColorsNotSame || imagePost === 0 ? "" : "var(--sos)",
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

          <div
            className="flex flex-col lg:flex-row flex-nowrap w-full gap-3 mb-12 lg:mb-0"
            style={{ display: imagePost === 1 ? "flex" : "none" }}
          >
            <div className="w-full">
              <label className="block font-semibold">Druhý prvek</label>
              <select
                onChange={(e) =>
                  updateSetAndNumber(parseInt(e.target.value), 2)
                }
                className="border-2 px-6 py-1 mb-2"
                style={{
                  borderColor:
                    areImagesNotSame || imagePost === 0 ? "" : "var(--sos)",
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
                  borderColor:
                    areImagesNotSame || imagePost === 0 ? "" : "var(--sos)",
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
                  borderColor:
                    areBGColorsNotSame || imagePost === 0 ? "" : "var(--sos)",
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

          <div
            className="flex flex-col lg:flex-row flex-nowrap w-full gap-3 mb-12 lg:mb-0"
            style={{ display: imagePost === 1 ? "flex" : "none" }}
          >
            <div className="w-full">
              <label className="block font-semibold">Třetí prvek</label>
              <select
                onChange={(e) =>
                  updateSetAndNumber(parseInt(e.target.value), 3)
                }
                className="border-2 px-6 py-1 mb-2"
                style={{
                  borderColor:
                    areImagesNotSame || imagePost === 0 ? "" : "var(--sos)",
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
                  borderColor:
                    areImagesNotSame || imagePost === 0 ? "" : "var(--sos)",
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
                  borderColor:
                    areBGColorsNotSame || imagePost === 0 ? "" : "var(--sos)",
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
            // Is there a question mark?
            doesContainQuestionMark &&
            // Are the images not same?
            (areImagesNotSame || imagePost === 0) &&
            // Are the colors not same
            (areBGColorsNotSame || imagePost === 0) ? (
              <GenerateImageButton
                postReference={previewRef}
                postTitle={didYouKnow}
              />
            ) : (
              <>
                <InactiveGenerateButton />

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
                {!areImagesNotSame && imagePost === 1 ? (
                  <ErrorText>
                    Na příspěvku nesmí být dva stejné symboly
                  </ErrorText>
                ) : (
                  <></>
                )}
                {!areBGColorsNotSame && imagePost === 1 ? (
                  <ErrorText>Barvy pozadí nesmí být stejné</ErrorText>
                ) : (
                  <></>
                )}
                {!doesContainQuestionMark ? (
                  <ErrorText>
                    Fakt neobsahuje otazník, a tudíž nenavazuje na otázku v
                    úvodu
                  </ErrorText>
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
            style={{ width: "1080px", height: "1350px" }}
          >
            <PostGrid>
              <div
                className="w-full grid grid-cols-3 border-b-2 border-black"
                style={{ display: imagePost === 1 ? "grid" : "none" }}
              >
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
                  className="w-full aspect-square border-black  border-r-2 relative"
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
                  className="w-full aspect-square border-black relative"
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
                      "var(--" + facilities[facility - 1].colorBgVarName + ")",
                  }}
                >
                  <p className="facility text-white">
                    {facilities[facility - 1].name}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <div className="mx-[60px] h-full flex flex-col justify-center gap-6 py-[20px] px-10">
                <h2 className="dyk-heading text-left">{didYouKnow}</h2>
                <div className="">
                  {heading ? (
                    <SplitParagraph
                      cssStyles="text-[35px] text-left mb-5"
                      text={heading}
                    />
                  ) : (
                    <></>
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

export default DidYouKnowGenerator;
