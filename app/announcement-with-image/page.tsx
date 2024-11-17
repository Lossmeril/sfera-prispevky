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

const AnnouncementImageGenerator = () => {
  //--- STATES AND REFS --------------------------------------------------------------
  const [eventType, setEventType] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  const [image1, setImage1] = useState<File | null>(null);

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

  //--- VALIDATOR VARIABLES --------------------------------------------------------------

  const descLengthLong = 180;

  //--- VALIDATOR FUNCTIONS --------------------------------------------------------------
  const descLengthValidate = lengthValidate(
    description.length,
    descLengthLong,
    descLengthLong,
    false
  );
  const areImagesUploaded = imageUploadValidate(1, image1);
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
          Generátor: Oznámení s obrázkem
        </h1>

        {/* --- NAME, TYPE AND DESCRIPTION SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="flex flex-row flex-nowrap w-full gap-5">
            <div className="mb-4 w-full">
              <label className="block font-semibold">
                Nadpis<span className="text-sos"> *</span>
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
              Text<span className="text-sos"> *</span>
            </label>
            <div className="relative">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full relative"
                style={{
                  borderColor: descLengthValidate ? "" : "red",
                }}
                maxLength={descLengthLong}
              />
              <p
                className="absolute right-3 top-2 text-slate-400"
                style={{ color: descLengthValidate ? "" : "var(--sos)" }}
              >
                {descLengthLong - description.length}
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

        {/* --- IMAGES SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="flex flex-row flex-nowrap gap-3">
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block font-semibold">
                  Nahraj obrázek <span className="text-sos"> *</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setImage1)}
                />
              </div>
            </div>
          </div>
          <div className="bg-accent-pink p-5 mt-5">
            <p>
              Do této šablony povoluji vkládat fotky a obrázky.{" "}
              <strong>
                Nesmí se tu ale objevit nic s textem (například bannery, nebo
                cizí plakáty).
              </strong>{" "}
              Kdo tam něco takového dá, tomu utrhnu hlavu.
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

                {!isHeadingSet ? (
                  <ErrorText>Prosím, vyplň nadpis</ErrorText>
                ) : (
                  <></>
                )}
                {!isHeadingSet ? (
                  <ErrorText>Prosím, vyplň text</ErrorText>
                ) : (
                  <></>
                )}
                {!areImagesUploaded ? (
                  <ErrorText>Prosím, nahraj obrázek</ErrorText>
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
                <div className="flex flex-row flex-nowrap">
                  <div className="w-[880px] h-[440px] border-black border-b-2 relative">
                    {image1 && (
                      <Image
                        src={URL.createObjectURL(image1)}
                        alt="Image 1"
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
                <div className="mx-[60px] h-full flex flex-col justify-around py-[20px]">
                  <div>
                    {heading ? (
                      <h2 className="main-heading">{heading}</h2>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p
                    className="desc m-0"
                    style={{
                      maxHeight: "180px",
                    }}
                  >
                    {description}
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

export default AnnouncementImageGenerator;
