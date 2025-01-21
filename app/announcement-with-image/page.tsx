"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { removeEmojis } from "@/utils/formatters";
import {
  imageUploadValidate,
  lengthValidate,
  uppercaseValidate,
} from "@/utils/validators";
import { facilities } from "@/datasets/facilities";
import ErrorText from "@/components/error-text";
import PostGrid from "@/components/posts/postGrid";
import GenerateImageButton, {
  InactiveGenerateButton,
} from "@/utils/imageGenerator";

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

  const isHeadingNotUppercase = uppercaseValidate(heading);
  const isDescNotUppercase = uppercaseValidate(description);

  return (
    <div className="p-4 h-auto flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-10 border-r">
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
              Text<span className="text-sos"> *</span>
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
            // Is the title not all uppercase?
            isHeadingNotUppercase &&
            // Is the description set?
            isDescSet &&
            // Is the description not all uppercase?
            isDescNotUppercase ? (
              <GenerateImageButton
                postReference={previewRef}
                postTitle={heading}
              />
            ) : (
              <>
                <InactiveGenerateButton />

                {!isHeadingSet ? (
                  <ErrorText>Prosím, vyplň nadpis</ErrorText>
                ) : (
                  <></>
                )}
                {!isHeadingNotUppercase ? (
                  <ErrorText>Nadpis nepíšeme velkými písmeny</ErrorText>
                ) : (
                  <></>
                )}
                {!isHeadingSet ? (
                  <ErrorText>Prosím, vyplň text</ErrorText>
                ) : (
                  <></>
                )}
                {!isDescNotUppercase ? (
                  <ErrorText>Text nepíšeme velkými písmeny</ErrorText>
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
      <div className="w-full lg:w-1/2 pointer-events-none max-h-screen overflow-hidden">
        <div className="scale-[35%] lg:scale-50 origin-top-left lg:origin-[50%_25%]">
          <div
            ref={previewRef}
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap announcement"
            style={{ width: "1080px", height: "1350px" }}
          >
            <PostGrid>
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
              <div className="mx-[60px] h-full flex flex-col justify-center gap-10 py-[20px]">
                <div className="">
                  {heading ? (
                    <h2 className="main-heading alt-glyphs">{heading}</h2>
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
                  {description.split(/n-/g)[0]}
                  {description.split(/n-/g)[1] ? <br /> : <></>}
                  {description.split(/n-/g)[1] ? (
                    description.split(/n-/g)[1]
                  ) : (
                    <></>
                  )}
                </p>
              </div>
            </PostGrid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementImageGenerator;
