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
import LongTextInput, { TextInput } from "@/components/inputs/textInputs";
import { DateTimeRangeInput } from "@/components/inputs/timeAndDate";

import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";
import LoadingSkeleton from "@/components/loadingSkeleton";

const PostTwoElementsGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [eventType, setEventType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [dateValid, setDateValid] = useState<boolean>(true);
  const [text, setText] = useState<string>("");

  const [facility, setFacility] = useState<number>(0);

  const [elements, setElements] = useState<
    Record<ElementKey, ElementSelectorElement>
  >({
    element1: { bg: "white", image: null },
  });
  const [image1, setImage1] = useState<File | null>(null);
  const [image1DataUrl, setImage1DataUrl] = useState<string | null>(null);

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

  const previewRef = useRef<HTMLDivElement>(null);
  const result = validate({
    data: {
      elements,
      title,
      eventType,
      date,
      dateValid,
      text,
      facility,
      image1,
    },
    validators: [
      (d) => imageUploadedValidate(d.image1, "Obrázek"),
      (d) => imageVarietyValidate(d.elements),
      (d) => bgColorsValidate(d.elements),
      (d) => inputValidate(d.title || "", "Název akce"),
      (d) => inputValidate(d.eventType || "", "Typ akce"),
      (d) => inputValidate(d.date || "", "Datum akce", "vyplněno"),
      (d) =>
        genericValidator(
          d.dateValid,
          "Koncový čas nemůže být dříve než počáteční.",
        ),
      (d) =>
        genericValidator(d.facility !== 0, "Dílna/Laboratoř musí být vybrána."),
    ],
  });

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
            Generátor: Inverzní příspěvek s jedním prvkem
          </h1>

          <p className="w-full bg-red-200 p-3 my-4">
            Tohle je relativně nový formát plakátu, který slouží jako pěkné
            obohacení naší poměrně strohé vizuální identity.{" "}
            <strong>Neměl by se používat příliš často</strong>, proto prosím
            používejte jej jen pro akce, které jsou highlighty vaší nabídky a
            maximálně tak na jednom z deseti plakátů.
          </p>
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
          <h2 className="font-bold">Kdo zaštiťuje akci?</h2>
          <FacilitySelector
            facilities={facilities}
            facility={facility}
            setFacility={setFacility}
            loading={loading}
          />
        </MenuBlock>
        <MenuBlock>
          <h2 className="font-bold mb-[3px]">Prvek</h2>
          <ElementSelectorGrid>
            {" "}
            {facilities.length === 0 || loading ? (
              <LoadingSkeleton height="h-[3px]4" count={4} />
            ) : (
              <>
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
                  noColorSelect
                />
              </>
            )}
          </ElementSelectorGrid>
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
            className="relative pointer-events-none flex flex-row flex-nowrap overflow-hidden"
            style={{
              height: "2526px",
              width: "1786px",
            }}
            ref={previewRef}
          >
            <div
              className="absolute top-0 left-0 -z-10"
              style={{
                height: "2526px",
                width: "1786px",
              }}
            >
              <img
                src={image1DataUrl || "/img/image-placeholder.svg"}
                className="absolute top-0 left-0 w-[1786px] h-[2526px] z-0 pointer-events-none object-cover"
              />
              <div
                className="w-full h-full z-10 absolute top-0 left-0"
                style={{
                  backgroundColor:
                    facility !== 0 ? facilities[facility].colorBg : "gray",
                  mixBlendMode: "color",
                }}
              ></div>
              <div
                className="w-full h-full z-20 opacity-75 absolute top-0 left-0"
                style={{
                  backgroundColor:
                    facility !== 0 ? facilities[facility].colorBg : "gray",
                  mixBlendMode: "normal",
                }}
              ></div>
            </div>
            <PosterGrid sideText={date} mode="light">
              <div className="w-[90%] mx-auto h-[29em] flex flex-col justify-center items-center text-center text-white">
                <p className="text-[2.63em] above-heading line-clamp-1">
                  {eventType}
                </p>
                <div style={{ fontFeatureSettings: '"ss02" 1' }}>
                  <SplitParagraph
                    text={removeEmojis(title)}
                    cssStyles="text-[8.025em] leading-none line-clamp-2 font-medium main-heading alt-glyphs px-2"
                  />
                </div>
              </div>
              {facility !== 0 ? (
                <div className="w-full h-[70px] border-t-[3px] border-white flex flex-row justify-center items-center text-center">
                  <p className="text-white text-[2.8em] font-medium">
                    {facilities[facility].name}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <div
                className="w-[1476px] aspect-square border-white border-y-[3px] relative"
                style={{ backgroundColor: "transparent" }}
              >
                {elements.element1.image && (
                  <>
                    <Image
                      src={elements.element1.image}
                      alt="Image 1"
                      className="object-cover invert grayscale mix-blend-screen"
                      fill
                    />{" "}
                    <Image
                      src={elements.element1.image}
                      alt="Image 1"
                      className="object-cover invert grayscale mix-blend-screen"
                      fill
                    />
                  </>
                )}
              </div>
              <div
                className="w-full h-[176px] px-20 grid place-content-center text-center text-white"
                style={{ height: facility !== 0 ? "176px" : "246px" }}
              >
                <p className="font-medium text-[2.28em] line-clamp-2">{text}</p>
              </div>
            </PosterGrid>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default PostTwoElementsGenerator;
