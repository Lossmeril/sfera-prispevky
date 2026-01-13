"use client";

import React, { useEffect, useRef, useState } from "react";

import { constructFileName, removeEmojis } from "@/utils/formatters";
import SplitParagraph from "@/utils/splitParagraphs";
import { Facility } from "@/utils/types";
import {
  imageUploadedValidate,
  inputValidate,
  validate,
} from "@/utils/validators";

import { PostGridSpatious } from "@/components/layoutTemplates/postGridSpatious";

import ErrorDisplay from "@/components/inputs/error";
import FacilitySelector from "@/components/inputs/facilitySelector";
import GenerateImageButton from "@/components/inputs/generateImageButton";
import { Switch } from "@/components/inputs/switch";
import { TextInput } from "@/components/inputs/textInputs";

import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";

/* ----------------------------
   FILE → DATA URL CONVERTER
----------------------------- */

const fileToDataURL = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const LargeImageElementWithHeadingGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [eventType, setEventType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [facility, setFacility] = useState<number>(0);

  const [image1, setImage1] = useState<File | null>(null);
  const [image1DataUrl, setImage1DataUrl] = useState<string | null>(null);
  const [isImagePortrait, setIsImagePortrait] = useState<boolean>(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const result = validate({
    data: { eventType, title, image1 },
    validators: [
      (d) => imageUploadedValidate(d.image1, "Obrázek"),
      (d) => inputValidate(d.eventType, "Typ akce"),
      (d) => inputValidate(d.title, "Název akce"),
    ],
  });

  /* ----------------------------
       IMAGE UPLOAD
  ----------------------------- */
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
  ) => {
    const file = e.target.files?.[0] || null;
    setImage(file);

    if (file) {
      const dataUrl = await fileToDataURL(file);
      setImage1DataUrl(dataUrl);
    }
  };

  /* ----------------------------
       FETCH FACILITIES
  ----------------------------- */
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://branding.sferagrafika.eu/api/facilities",
        );
        if (!res.ok) throw new Error("Failed to fetch items");
        const data: Facility[] = await res.json();
        setFacilities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="h-auto flex flex-col lg:flex-row">
      <MenuSection>
        <MenuBlock>
          <h1 className="text-xl font-bold">
            Generátor: Příspěvek s obrázkem a názvem akce
          </h1>
        </MenuBlock>

        <MenuBlock>
          {/* --- IMAGES SECTION --- */}
          <div className="w-full py-5">
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 border rounded p-4 bg-neutral-50 mb-4">
                <label className="block font-medium mb-1 text-sm">
                  Nahraj obrázek
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setImage1)}
                />
              </div>
              <div className="col-span-2 border rounded p-4 bg-neutral-50 mb-4">
                <label
                  className="block font-medium mb-1 text-sm"
                  htmlFor="is-portrait-switch"
                >
                  Obsahuje obrázek portrét osoby?
                </label>
                <Switch
                  enabled={isImagePortrait}
                  onToggle={() => setIsImagePortrait(!isImagePortrait)}
                  id="is-portrait-switch"
                />
              </div>
            </div>

            <p className="w-full bg-red-200 p-3 mb-4">
              Do této šablony povoluji vkládat fotky a obrázky.{" "}
              <strong>
                Nesmí se tu ale objevit nic s textem (například bannery, nebo
                cizí plakáty).
              </strong>{" "}
              Kdo tam něco takového dá, tomu utrhnu hlavu.
            </p>
          </div>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold mb-2">Detaily akce</h2>
          <div className="grid grid-cols-8 gap-3">
            <div className="col-span-3 border rounded p-4 bg-neutral-50">
              <label
                className="block font-medium mb-1 text-sm"
                htmlFor="event-type"
              >
                Typ akce
              </label>

              <TextInput
                text={eventType}
                setText={setEventType}
                placeholder="Zadejte typ akce"
                id="event-type"
              />
            </div>

            <div className="col-span-5 border rounded p-4 bg-neutral-50">
              <label className="block font-medium mb-1 text-sm" htmlFor="title">
                Název akce
              </label>
              <TextInput
                text={title}
                setText={setTitle}
                placeholder="Zadejte název akce"
                id="title"
                displayMDashButton
                displayLineBreakButton
              />
            </div>
            <div className="col-span-8 border rounded p-4 bg-neutral-50">
              <label
                className="block font-medium mb-1 text-sm"
                htmlFor="description"
              >
                Popis akce
              </label>
              <TextInput
                text={description}
                setText={setDescription}
                placeholder="Zadejte popis akce"
                id="description"
                displayLineBreakButton
                displayMDashButton
              />
            </div>
          </div>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold">Kdo zaštiťuje akci?</h2>
          <FacilitySelector
            facilities={facilities}
            facility={facility}
            setFacility={setFacility}
            loading={loading}
          />
        </MenuBlock>

        <MenuBlock>
          <GenerateImageButton
            previewRef={previewRef}
            validated={result.valid}
            fileName={constructFileName(title, "příspěvek", 1080, 1350)}
          />
          <ErrorDisplay errors={result.errors} />
        </MenuBlock>
      </MenuSection>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <PreviewSection>
        <div className="scale-[35%] lg:scale-50 origin-top-left lg:origin-[50%_15%]">
          <div
            ref={previewRef}
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap"
            style={{ width: "1080px", height: "1350px" }}
          >
            <PostGridSpatious>
              <div
                className="relative w-full border-b-2 border-black"
                style={{ aspectRatio: description === "" ? "13/12" : "15/12" }}
              >
                {image1DataUrl && (
                  <div
                    className={`absolute inset-0 ${!isImagePortrait ? "p-8" : "p-12"} flex items-center justify-center`}
                  >
                    <img
                      src={image1DataUrl}
                      alt="Image 1"
                      className={
                        !isImagePortrait
                          ? "w-full h-full object-cover"
                          : "h-full aspect-square object-cover rounded-full"
                      }
                    />
                  </div>
                )}
              </div>

              {facility !== 0 && (
                <div
                  className="w-full h-[50px] border-b-2 border-black flex flex-row justify-center items-center text-center"
                  style={{
                    backgroundColor: facilities[facility].colorBg,
                  }}
                >
                  <p className="facility text-white">
                    {facilities[facility].name}
                  </p>
                </div>
              )}

              <div className="w-full h-full grid place-content-center text-center gap-6 pb-2">
                {eventType !== "" && (
                  <p
                    className="text-[1.5em] above-heading line-clamp-1"
                    style={{ marginBottom: title !== "" ? "-20px" : "10px" }}
                  >
                    {removeEmojis(eventType)}
                  </p>
                )}

                {title !== "" && (
                  <div style={{ fontFeatureSettings: '"ss02" 1' }}>
                    <SplitParagraph
                      text={removeEmojis(title)}
                      cssStyles="text-[4.2em] leading-[1em] line-clamp-2 font-medium main-heading alt-glyphs px-10"
                    />
                  </div>
                )}

                {description !== "" && (
                  <SplitParagraph
                    text={removeEmojis(description)}
                    cssStyles="text-[1.87em] leading-[1.2em] font-base line-clamp-2 mb-4"
                  />
                )}
              </div>
            </PostGridSpatious>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default LargeImageElementWithHeadingGenerator;
