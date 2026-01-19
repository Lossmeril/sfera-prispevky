"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { constructFileName, removeEmojis } from "@/utils/formatters";
import { fileToDataURL } from "@/utils/images";
import SplitParagraph from "@/utils/splitParagraphs";
import { ElementKey, Facility } from "@/utils/types";
import {
  bgColorsValidate,
  genericValidator,
  imageUploadedValidate,
  imageVarietyValidate,
  inputValidate,
  validate,
} from "@/utils/validators";

import { PosterGrid } from "@/components/layoutTemplates/poster";

import ElementSelector, {
  ElementSelectorElement,
  ElementSelectorGrid,
} from "@/components/inputs/elementSelector";
import ErrorDisplay from "@/components/inputs/error";
import FacilitySelector from "@/components/inputs/facilitySelector";
import GeneratePdfButton from "@/components/inputs/generatePdfButton";
import { Switch } from "@/components/inputs/switch";
import LongTextInput, { TextInput } from "@/components/inputs/textInputs";
import { DateTimeRangeInput } from "@/components/inputs/timeAndDate";

import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";
import LoadingSkeleton from "@/components/loadingSkeleton";

const PosterLargeImageGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [eventType, setEventType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [dateValid, setDateValid] = useState<boolean>(true);
  const [text, setText] = useState<string>("");

  const [image1, setImage1] = useState<File | null>(null);
  const [image1DataUrl, setImage1DataUrl] = useState<string | null>(null);

  const [facility, setFacility] = useState<number>(0);

  const [elements, setElements] = useState<
    Record<ElementKey, ElementSelectorElement>
  >({
    element1: { bg: "white", image: null },
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const result = validate({
    data: { elements, title, eventType, date, dateValid, text, image1 },
    validators: [
      (d) => imageVarietyValidate(d.elements),
      (d) => imageUploadedValidate(d.image1, "Obrázek"),
      (d) => bgColorsValidate(d.elements),
      (d) => inputValidate(d.title || "", "Název akce"),
      (d) => inputValidate(d.eventType || "", "Typ akce"),
      (d) => inputValidate(d.date || "", "Datum akce", "vyplněno"),
      (d) =>
        genericValidator(
          d.dateValid,
          "Koncový čas nemůže být dříve než počáteční.",
        ),
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
          <h1 className="text-xl font-bold">Generátor: Plakát s obrázkem</h1>
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
              {facilities.length === 0 || loading ? (
                <LoadingSkeleton height="h-[85px]" count={1} />
              ) : (
                <div className="col-span-2">
                  <ElementSelector
                    label="Vybrat prvek 1"
                    imageUrl={elements.element1.image || ""}
                    onSelect={(url) =>
                      setElements((prev) => ({
                        ...prev,
                        element1: { bg: prev.element1?.bg || "", image: url },
                      }))
                    }
                    onColorSelect={(color) =>
                      setElements((prev) => ({
                        ...prev,
                        element1: {
                          bg: color,
                          image: prev.element1?.image || null,
                        },
                      }))
                    }
                  />
                </div>
              )}
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
              <DateTimeRangeInput
                label="Datum a čas akce"
                text={date}
                setText={setDate}
                setValid={setDateValid}
              />
            </div>

            <div className="col-span-8 border rounded p-4 bg-neutral-50">
              <label className="block font-medium mb-1 text-sm" htmlFor="text">
                Datum / popisek akce
              </label>
              <LongTextInput text={text} setText={setText} id="text" />
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

        <MenuBlock last>
          <GeneratePdfButton
            previewRef={previewRef}
            validated={result.valid}
            fileName={constructFileName(title, "plakat", 297, 210, "mm")}
          />
          <ErrorDisplay errors={result.errors} />
        </MenuBlock>
      </MenuSection>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <PreviewSection>
        <div className="scale-[25%] origin-top-left ">
          <div
            className="relative pointer-events-none bg-white flex flex-row flex-nowrap overflow-hidden"
            style={{ height: "2526px", width: "1786px" }}
            ref={previewRef}
          >
            {/* <img
              src="/poster-temp_07.png"
              alt=""
              className="absolute top-0 left-0 w-[1786px] h-[2526px] z-10 pointer-events-none opacity-25"
            /> */}
            <PosterGrid sideText={date}>
              <div
                className="relative w-full border-b-[3px] border-black"
                style={{ height: facility !== 0 ? "1685px" : "1755px" }}
              >
                {image1DataUrl && (
                  <div
                    className={`absolute inset-0 flex items-center justify-center`}
                  >
                    <img
                      src={image1DataUrl}
                      alt="Image 1"
                      className={"w-full h-full object-cover"}
                    />
                  </div>
                )}
              </div>

              {facility !== 0 ? (
                <div
                  className="w-full h-[70px] border-b-[3px] border-black flex flex-row justify-center items-center text-center"
                  style={{
                    backgroundColor: facilities[facility].colorBg,
                  }}
                >
                  <p className="text-white text-[2.8em] font-medium">
                    {facilities[facility].name}
                  </p>
                </div>
              ) : (
                <></>
              )}

              <div
                className="w-full flex flex-row flex-nowrap"
                style={{ height: "431px" }}
              >
                <div className="w-full flex flex-col justify-center items-center px-14 py-12">
                  <div className="w-[95%] mr-auto h-full flex flex-col justify-start items-start text-left">
                    <p className="text-[1.65em] above-heading line-clamp-1 mb-4">
                      {eventType}
                    </p>
                    <div style={{ fontFeatureSettings: '"ss02" 1' }}>
                      <SplitParagraph
                        text={removeEmojis(title)}
                        cssStyles="text-[4.3em] leading-[1em] line-clamp-2 font-medium main-heading alt-glyphs"
                      />
                    </div>
                    <p className="font-medium text-[1.8em] leading-10 line-clamp-3 mt-6">
                      {text}
                    </p>
                  </div>
                </div>
                <div
                  className="aspect-square border-black border-l-[3px] relative"
                  style={{
                    backgroundColor: elements.element1.bg,
                    height: "431px",
                  }}
                >
                  {elements.element1.image && (
                    <Image
                      src={elements.element1.image}
                      alt="Image 1"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
              </div>
            </PosterGrid>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default PosterLargeImageGenerator;
