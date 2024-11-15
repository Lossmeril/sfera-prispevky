"use client";

import React, { useRef, useState } from "react";
import { toPng } from "html-to-image";
import Image from "next/image";

const ImageGenerator = () => {
  const [eventType, setEventType] = useState("");
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
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
      link.download = text + "prispevek.png";
      link.href = pngData;
      link.click();
    }
  };

  return (
    <div className="p-4 h-auto overflow-scroll">
      <h1 className="text-xl font-bold mb-4">Image Generator</h1>

      <div className="mb-4">
        <label className="block font-semibold">Typ akce</label>
        <input
          type="text"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Název akce</label>
        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Popisek</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2 w-full"
        />
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
        <label className="block font-semibold">Select Image 2:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageUpload(e, setImage2)}
        />
      </div>

      <div
        ref={previewRef}
        className="relative w-[1080px] h-[1080px] border bg-white flex flex-row flex-nowrap"
      >
        <div className="w-[100px] h-full border-black border-r-2">
          <div className="h-[100px] w-full border-black border-b-2"></div>
          <div className="h-[880px] w-full border-black border-b-2"></div>
        </div>
        <div className="w-[880px] h-full border-black border-r-2">
          <div className="h-[100px] w-full border-black border-b-2"></div>
          <div className="h-[880px] w-full border-black border-b-2 flex flex-col">
            <div className="flex flex-row flex-nowrap">
              <div className="w-[440px] aspect-square border-black border-b-2 border-r-2 relative">
                {image1 && (
                  <Image
                    src={URL.createObjectURL(image1)}
                    alt="Image 1"
                    className="object-cover"
                    fill
                  />
                )}
              </div>{" "}
              <div className="w-[440px] aspect-square border-black border-b-2 relative">
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
            <div className="mx-[60px] mt-[50px] flex flex-col justify-space">
              <div>
                <p className="above-heading">{eventType}</p>
                <h2 className="main-heading">{heading}</h2>
              </div>
              <p className="desc">{text}</p>
            </div>
          </div>
        </div>
        <div className="w-[100px] h-full border-black ">
          <div className="h-[100px] w-full border-black border-b-2"></div>
          <div className="h-[880px] w-full border-black border-b-2"></div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Generate PNG
      </button>
    </div>
  );
};

export default ImageGenerator;
