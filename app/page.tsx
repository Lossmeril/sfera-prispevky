"use client";

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import Image from "next/image";
import { accents } from "@/datasets/colors";
import { formatDate } from "@/utils/formatters";

const ImageGenerator = () => {
  const [eventType, setEventType] = useState("");
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");

  const [date, setDate] = useState("");
  const [beginningTime, setBeginningTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [image1, setImage1] = useState<File | null>(null);
  const [image1BG, setImage1BG] = useState("");
  const [image2, setImage2] = useState<File | null>(null);
  const [image2BG, setImage2BG] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleGenerate = async () => {
    if (previewRef.current) {
      const pngData = await toPng(previewRef.current, {
        width: 1080, // Desired width in pixels
        height: 1080, // Desired height in pixels
      });
      const link = document.createElement("a");
      link.download =
        "SFÉRA_1080x1080px_" + heading.replace(" ", "-") + "-prispevek.png";
      link.href = pngData;
      link.click();
    }
  };

  const formattedDateTime = formatDate(date);
  console.log("Formatted DateTime:", formattedDateTime);

  return (
    <div className="p-4 h-auto flex flex-row">
      <div className="w-1/2 p-20">
        {/* --- INPUTY --- */}
        <h1 className="text-xl font-bold mb-4">
          Generátor: Příspěvek s dvěma symboly
        </h1>
        <div className="flex flex-row flex-nowrap w-full gap-5">
          <div className="mb-4 w-1/3">
            <label className="block font-semibold">Typ akce</label>
            <input
              type="text"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4 w-2/3">
            <label className="block font-semibold">Název akce</label>{" "}
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
          <label className="block font-semibold">Popisek</label>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="border p-2 w-full relative"
              maxLength={100}
            />
            <p className="absolute text-slate-400 right-3 top-2">
              {100 - text.length}
            </p>
          </div>
        </div>

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

        <div className="mb-4">
          <label className="block font-semibold">Select Image 1:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setImage1)}
          />
        </div>

        <div className="mb-4">
          <label>Barva 1</label>
          <select
            onChange={(e) => setImage1BG(e.target.value)}
            className="color-dropdown"
          >
            {accents.map((accent) => (
              <option value={accent.cssVar} key={accent.cssVar}>
                {accent.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Select Image 2:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setImage2)}
          />
        </div>

        <div className="mb-4">
          <label>Barva 2</label>
          <select
            onChange={(e) => setImage2BG(e.target.value)}
            className="color-dropdown"
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

        <button
          onClick={handleGenerate}
          className="mt-4 border-2 border-black px-8 py-4 font-bold"
        >
          Stáhnout příspěvek (.png)
        </button>
      </div>

      {/* --- LIVE PREVIEW --- */}
      <div className="w-1/2 pointer-events-none">
        <div className="scale-50" style={{ transformOrigin: "top center" }}>
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
                <div className="mx-[60px] my-[50px] h-full flex flex-col justify-around">
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
                  <p className="desc m-0">{text}</p>
                  <p className="desc m-0">
                    {formattedDateTime}
                    {"  "}
                    {beginningTime && date ? " | " : ""}
                    {"  "}
                    {beginningTime}
                    {beginningTime ? (endTime ? "—" : "") + endTime : ""}
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

export default ImageGenerator;
