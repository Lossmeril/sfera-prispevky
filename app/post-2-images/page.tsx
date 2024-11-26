"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { toPng } from "html-to-image";

import { formatDate, formatTime, removeEmojis } from "@/utils/formatters";
import {
  bgColorsValidate,
  lengthValidate,
  uppercaseValidate,
} from "@/utils/validators";
import { accents } from "@/datasets/colors";
import { facilities } from "@/datasets/facilities";
import ErrorText from "@/components/error-text";
import { elementSets } from "@/datasets/elements";

const Post2ImagesGenerator = () => {
  //--- STATES AND REFS --------------------------------------------------------------
  const [eventType, setEventType] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState("");
  const [beginningTime, setBeginningTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [elementSet1, setElementSet1] = useState(elementSets[0]);
  const [element1No, setElement1No] = useState(1);
  const [element1BG, setElement1BG] = useState("");

  const [elementSet2, setElementSet2] = useState(elementSets[0]);
  const [element2No, setElement2No] = useState(1);
  const [element2BG, setElement2BG] = useState("");

  const [facility, setFacility] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  //--- UPDARE IMAGE FUNCTION --------------------------------------------------------------

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
    }
  };

  const formattedDate = formatDate(date);
  const formattedTimes = [formatTime(beginningTime), formatTime(endTime)];

  //--- VALIDATOR VARIABLES --------------------------------------------------------------

  const descLengthLong = 100;
  const descLengthShort = 50;
  const isTextShort = date || beginningTime || endTime ? true : false;

  //--- VALIDATOR FUNCTIONS --------------------------------------------------------------
  const descLengthValidate = lengthValidate(
    description.length,
    descLengthShort,
    descLengthLong,
    isTextShort
  );

  const areBGColorsNotSame = bgColorsValidate([element1BG, element2BG]);
  const isEventTypeSet = eventType !== "";
  const isHeadingSet = heading !== "";
  const isDescSet = description !== "";
  const areImagesNotSame =
    elementSet1.elementPrefix + element1No !==
    elementSet2.elementPrefix + element2No;

  const isHeadingNotUppercase = uppercaseValidate(heading);
  const isDescNotUppercase = uppercaseValidate(description);

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
    <div className="p-4 h-auto flex flex-row">
      <div className="w-1/2 p-10 border-r">
        {/* --- INPUT SECTION -------------------------------------------------------------- */}
        <h1 className="text-xl font-bold mb-4">
          Generátor: Příspěvek se dvěma symboly
        </h1>

        {/* --- NAME, TYPE AND DESCRIPTION SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="flex flex-row flex-nowrap w-full gap-5">
            <div className="mb-4 w-1/3">
              <label className="block font-semibold">
                Typ akce<span className="text-sos"> *</span>
              </label>
              <input
                type="text"
                value={eventType}
                onChange={(e) => setEventType(removeEmojis(e.target.value))}
                className="border p-2 w-full"
              />
            </div>

            <div className="mb-4 w-2/3">
              <label className="block font-semibold">
                Název akce<span className="text-sos"> *</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={heading}
                  onChange={(e) => setHeading(removeEmojis(e.target.value))}
                  className="border p-2 w-full"
                  maxLength={36}
                  style={{
                    borderColor: isHeadingNotUppercase ? "" : "var(--sos)",
                  }}
                />
                <p className="absolute text-slate-400 right-3 top-2">
                  {36 - heading.length}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold">
              Popisek<span className="text-sos"> *</span>
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(removeEmojis(e.target.value))}
                className="border p-2 w-full relative"
                style={{
                  borderColor:
                    descLengthValidate && isDescNotUppercase ? "" : "red",
                }}
                maxLength={isTextShort ? descLengthShort : descLengthLong}
              />
              <p
                className="absolute right-3 top-2 text-slate-400"
                style={{ color: descLengthValidate ? "" : "var(--sos)" }}
              >
                {(isTextShort ? descLengthShort : descLengthLong) -
                  description.length}
              </p>
              {!descLengthValidate ? (
                <ErrorText>
                  <>Prosím, zkrať popisek, nebo odeber datum a čas</>
                </ErrorText>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        {/* --- DATE AND TIME SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="flex flex-row flex-nowrap gap-3">
            <div className="mb-4 w-1/3">
              <label className="block font-semibold">Datum</label>
              <div className="relative">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border p-2 w-full relative"
                />
              </div>
            </div>

            <div className="mb-4 w-1/3">
              <label className="block font-semibold">Čas začátku</label>
              <div className="relative">
                <input
                  type="time"
                  value={beginningTime}
                  onChange={(e) => setBeginningTime(e.target.value)}
                  className="border p-2 w-full relative"
                />
              </div>
            </div>

            <div className="mb-4 w-1/3">
              <label className="block font-semibold">Čas konce</label>
              <div className="relative">
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="border p-2 w-full relative"
                />
              </div>
            </div>
          </div>
        </div>

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
        </div>

        {/* --- FACILITY SECTION --- */}
        <div className="w-full py-5 border-b">
          <label className="block font-semibold">Kdo zaštiťuje akci?</label>
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
            // Is the text not overflowing?
            descLengthValidate &&
            // Are the colors not same?
            areBGColorsNotSame &&
            // Are the images not same?
            areImagesNotSame &&
            // Is the event type set?
            isEventTypeSet &&
            // Is the title set?
            isHeadingSet &&
            // Is the title not all uppercase?
            isHeadingNotUppercase &&
            // Is the description set?
            isDescSet &&
            // Is the description not all uppercase?
            isDescNotUppercase ? (
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
                {!isEventTypeSet ? (
                  <ErrorText>Prosím, vyplň typ události</ErrorText>
                ) : (
                  <></>
                )}
                {!isHeadingSet ? (
                  <ErrorText>Prosím, vyplň název události</ErrorText>
                ) : (
                  <></>
                )}
                {!isHeadingNotUppercase ? (
                  <ErrorText>Nadpis nepíšeme velkými písmeny</ErrorText>
                ) : (
                  <></>
                )}
                {!isDescSet ? (
                  <ErrorText>Prosím, vyplň krátký popisek</ErrorText>
                ) : (
                  <></>
                )}
                {!isDescNotUppercase ? (
                  <ErrorText>Popisek nepíšeme velkými písmeny</ErrorText>
                ) : (
                  <></>
                )}
                {!areBGColorsNotSame ? (
                  <ErrorText>Barvy pozadí nesmí být stejné</ErrorText>
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
                    {/* {image1 && (
                      <Image
                        src={URL.createObjectURL(image1)}
                        alt="Image 1"
                        className="object-cover"
                        fill
                      />
                      
                    )} */}

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
                    className="w-[440px] aspect-square border-black border-b-2 relative"
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
                </div>
                {facility !== 0 ? (
                  <div
                    className="w-full h-32 border-b-2 border-black flex flex-row justify-center items-center text-center"
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
                <div
                  className={
                    "mx-[60px] h-full flex flex-col justify-around " +
                    (facility !== 0 ? "my-[25px]" : "my-[50px]")
                  }
                >
                  <div>
                    {eventType ? (
                      <p className="above-heading mb-3">{eventType}</p>
                    ) : (
                      <></>
                    )}
                    {heading ? (
                      <h2 className="main-heading">{heading}</h2>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p
                    className="desc m-0"
                    style={{
                      maxHeight:
                        formattedDate !== "" || formattedTimes[0] !== ""
                          ? "36px"
                          : "72px",
                    }}
                  >
                    {description.split(/n-/g)[0]}
                    {description.split(/n-/g)[1] ? <br /> : <></>}
                    {description.split(/n-/g)[1] ? (
                      description.split(/n-/g)[1]
                    ) : (
                      <></>
                    )}
                  </p>
                  <p className="desc m-0">
                    {formattedDate}
                    {"  "}
                    {formattedTimes[0] && date ? " | " : ""}
                    {"  "}
                    {formattedTimes[0]}
                    {formattedTimes[0]
                      ? (formattedTimes[1] ? "—" : "") + formattedTimes[1]
                      : ""}
                  </p>
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
