"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { toPng } from "html-to-image";

import { bgColorsValidate, imageUploadValidate } from "@/utils/validators";
import { accents } from "@/datasets/colors";
import ErrorText from "@/components/error-text";

const Post2ImagesGenerator = () => {
  //--- STATES AND REFS --------------------------------------------------------------

  const [image1, setImage1] = useState<File | null>(null);
  const [image1BG, setImage1BG] = useState("");
  const [image2, setImage2] = useState<File | null>(null);
  const [image2BG, setImage2BG] = useState("");
  const [image3, setImage3] = useState<File | null>(null);
  const [image3BG, setImage3BG] = useState("");
  const [image4, setImage4] = useState<File | null>(null);
  const [image4BG, setImage4BG] = useState("");

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

  //--- VALIDATOR FUNCTIONS --------------------------------------------------------------

  const areImagesUploaded = imageUploadValidate(
    4,
    image1,
    image2,
    image3,
    image4
  );
  const areBGColorsNotSame = bgColorsValidate([
    image1BG,
    image2BG,
    image3BG,
    image4BG,
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
          <div className="flex flex-row flex-nowrap gap-3">
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block font-semibold">
                  Nahraj první prvek: <span className="text-sos"> *</span>
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
                  Nahraj druhý prvek:<span className="text-sos"> *</span>
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

          <div className="flex flex-row flex-nowrap gap-3 mt-5">
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block font-semibold">
                  Nahraj třetí prvek: <span className="text-sos"> *</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setImage3)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Podkladová barva 3
                </label>
                <select
                  onChange={(e) => setImage3BG(e.target.value)}
                  className="border-2 px-6 py-1"
                  style={{
                    backgroundColor:
                      image3BG !== "var(--white)" ? image3BG : "",
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
                  Nahraj čtvrtý prvek:<span className="text-sos"> *</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setImage4)}
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold">
                  Podkladová barva 4
                </label>
                <select
                  onChange={(e) => setImage4BG(e.target.value)}
                  className="border-2 px-6 py-1"
                  style={{
                    backgroundColor:
                      image4BG !== "var(--white)" ? image4BG : "",
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

        {/* --- DOWNLOAD SECTION --- */}
        <div className="w-full py-5">
          {
            // Are the images uploaded?
            areImagesUploaded &&
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

                {!areImagesUploaded ? (
                  <ErrorText>Prosím, nahraj čtyři symboly</ErrorText>
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
                        width={440}
                        height={440}
                        crossOrigin="anonymous"
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
                        width={440}
                        height={440}
                        crossOrigin="anonymous"
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-row flex-nowrap">
                  <div
                    className="w-[440px] aspect-square border-black border-r-2 relative"
                    style={{ backgroundColor: image3BG }}
                  >
                    {image3 && (
                      <Image
                        src={URL.createObjectURL(image3)}
                        alt="Image 3"
                        className="object-cover"
                        width={440}
                        height={440}
                        crossOrigin="anonymous"
                      />
                    )}
                  </div>
                  <div
                    className="w-[440px] aspect-square relative"
                    style={{ backgroundColor: image4BG }}
                  >
                    {image4 && (
                      <Image
                        src={URL.createObjectURL(image4)}
                        alt="Image 4"
                        className="object-cover"
                        width={440}
                        height={440}
                        crossOrigin="anonymous"
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
