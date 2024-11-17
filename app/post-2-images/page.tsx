"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { toPng } from "html-to-image";

import { formatDate, formatTime } from "@/utils/formatters";
import {
  bgColorsValidate,
  imageUploadValidate,
  lengthValidate,
} from "@/utils/validators";
import { accents } from "@/datasets/colors";
import { facilities } from "@/datasets/facilities";
import ErrorText from "@/components/error-text";

const Post2ImagesGenerator = () => {
  //--- STATES AND REFS --------------------------------------------------------------
  const [eventType, setEventType] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const [date, setDate] = useState("");
  const [beginningTime, setBeginningTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [image1, setImage1] = useState<File | null>(null);
  const [image1BG, setImage1BG] = useState("");
  const [image2, setImage2] = useState<File | null>(null);
  const [image2BG, setImage2BG] = useState("");

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
  const areImagesUploaded = imageUploadValidate(2, image1, image2);
  const areBGColorsNotSame = bgColorsValidate([image1BG, image2BG]);
  const isEventTypeSet = eventType !== "";
  const isHeadingSet = heading !== "";
  const isDescSet = description !== "";

  //--- IMAGE GENERATOR --------------------------------------------------------------
  const handleGenerate = async () => {
    if (previewRef.current) {
      const pngData = await toPng(previewRef.current, {
        width: 1080,
        height: 1080,
      });
      const link = document.createElement("a");
      link.download =
        "SFÉRA_1080x1080px_" + heading.replace(" ", "-") + "-prispevek.png";
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
                onChange={(e) => setEventType(e.target.value)}
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
                  onChange={(e) => setHeading(e.target.value)}
                  className="border p-2 w-full"
                  maxLength={36}
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
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full relative"
                style={{
                  borderColor: descLengthValidate ? "" : "red",
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
          <div className="flex flex-row flex-nowrap gap-3">
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block font-semibold">
                  Nahrajte první prvek: <span className="text-sos"> *</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setImage1)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Podkladová barva 1
                </label>
                <select
                  onChange={(e) => setImage1BG(e.target.value)}
                  className="border-2 px-6 py-1"
                  style={{
                    backgroundColor:
                      image1BG !== "var(--white)" ? image1BG : "",
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
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block font-semibold">
                  Nahrajte druhý prvek:<span className="text-sos"> *</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setImage2)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Podkladová barva 2
                </label>
                <select
                  onChange={(e) => setImage2BG(e.target.value)}
                  className="border-2 px-6 py-1"
                  style={{
                    backgroundColor:
                      image2BG !== "var(--white)" ? image2BG : "",
                    borderColor: areBGColorsNotSame ? "" : "var(--sos)",
                  }}
                >
                  {accents.map((accent) => (
                    <option
                      value={accent.cssVar}
                      key={accent.cssVar}
                      style={{ backgroundColor: accent.cssVar }}
                    >
                      {accent.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="bg-accent-pink p-5 mt-5">
            <p>
              Do této šablony smí být umístěny{" "}
              <strong>pouze sférické symboly</strong>, nikoliv fotky a jiné
              obrázky.
            </p>
            <p className="mb-0">
              Obrázky můžete stahnovat v plné velikosti z platformy{" "}
              <Link
                href={
                  "https://sferapardubice.sharepoint.com/:f:/s/SFERA/Es0LEpuZCf9PkOHb8IMDEosBaZhIxzIB1I0EofrNn9oUzg?e=QRNKWu"
                }
                target="_blank"
                className="underline"
              >
                SharePoint
              </Link>
              .
            </p>
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
            // Are the images uploaded?
            areImagesUploaded &&
            // Are the colors not same
            areBGColorsNotSame &&
            // Is the event type set?
            isEventTypeSet &&
            // Is the title set?
            isHeadingSet &&
            // Is the description set?
            isDescSet ? (
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
                {!isHeadingSet ? (
                  <ErrorText>Prosím, vyplň krátký popisek</ErrorText>
                ) : (
                  <></>
                )}
                {!areImagesUploaded ? (
                  <ErrorText>Prosím, nahraj dva symboly</ErrorText>
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
                    style={{ backgroundColor: image1BG }}
                  >
                    {image1 && (
                      <Image
                        src={URL.createObjectURL(image1)}
                        alt="Image 1"
                        className="object-cover"
                        fill
                      />
                    )}
                  </div>
                  <div
                    className="w-[440px] aspect-square border-black border-b-2 relative"
                    style={{ backgroundColor: image2BG }}
                  >
                    {image2 && (
                      <Image
                        src={URL.createObjectURL(image2)}
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
                    {description}
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
