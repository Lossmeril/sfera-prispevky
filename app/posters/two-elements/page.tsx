"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { constructFileName, removeEmojis } from "@/utils/formatters";
import SplitParagraph from "@/utils/splitParagraphs";
import { ElementKey, Facility } from "@/utils/types";
import {
  bgColorsValidate,
  genericValidator,
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

const PosterTwoElementsGenerator = () => {
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
    element2: { bg: "white", image: null },
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const result = validate({
    data: { elements, title, eventType, date, dateValid, text },
    validators: [
      (d) => imageVarietyValidate(d.elements),
      (d) => bgColorsValidate(d.elements),
      (d) => inputValidate(d.title || "", "Název akce"),
      (d) => inputValidate(d.eventType || "", "Typ akce"),
      (d) => inputValidate(d.date || "", "Datum akce", "vyplněno"),
      (d) => inputValidate(d.text || "", "Popisek akce"),
      (d) =>
        genericValidator(
          d.dateValid,
          "Koncový čas nemůže být dříve než počáteční.",
        ),
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
            Generátor: Plakát se dvěma prvky
          </h1>
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
                Popisek akce
              </label>
              <p className="w-full bg-red-200 p-3 my-4">
                Tenhle plakát má spoustu místa, doporučuji používat tlačítko
                "Vložit nový odstavec" k oddělení textu do více odstavců.
              </p>
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
        <MenuBlock>
          <h2 className="font-bold mb-[3px]">Prvky a pozadí</h2>
          <ElementSelectorGrid>
            {facilities.length === 0 || loading ? (
              <LoadingSkeleton height="h-30" count={2} />
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
                />
                <ElementSelector
                  label="Vybrat prvek 2"
                  imageUrl={elements.element2.image || ""}
                  onSelect={(url) =>
                    setElements((prev) => ({
                      ...prev,
                      element2: { bg: prev.element2?.bg || "", image: url },
                    }))
                  }
                  onColorSelect={(color) =>
                    setElements((prev) => ({
                      ...prev,
                      element2: {
                        bg: color,
                        image: prev.element2?.image || null,
                      },
                    }))
                  }
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
            className="relative pointer-events-none bg-white flex flex-row flex-nowrap overflow-hidden"
            style={{ height: "2526px", width: "1786px" }}
            ref={previewRef}
          >
            {/* <img
              src="/poster-temp_05.png"
              alt=""
              className="absolute top-0 left-0 w-[1786px] h-[2526px] z-10 pointer-events-none opacity-25"
            /> */}
            <PosterGrid sideText={date}>
              <div className="w-[90%] mx-auto h-[29em] flex flex-col justify-center items-center text-center">
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
                <div
                  className="w-full h-[70px] border-t-[3px] border-black flex flex-row justify-center items-center text-center"
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
                className="w-[1476px] h-[738px] border-black border-y-[3px] relative grid grid-cols-2"
                style={{ backgroundColor: elements.element1.bg }}
              >
                <div
                  className="w-full relative border-black border-r-[3px]"
                  style={{ backgroundColor: elements.element1.bg }}
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
                <div
                  className="w-full relative"
                  style={{ backgroundColor: elements.element2.bg }}
                >
                  {elements.element2.image && (
                    <Image
                      src={elements.element2.image}
                      alt="Image 2"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
              </div>
              <div
                className="w-full h-[914px] px-24 py-20 flex flex-col justify-between items-start text-left text-black overflow-hidden"
                style={{ height: facility !== 0 ? "914px" : "984px" }}
              >
                <div className="font-medium text-[2.28em] overflow-hidden">
                  {SplitParagraph({ text, cssStyles: "mb-12" })}
                  <p className="font-medium">{date}</p>
                </div>
              </div>
            </PosterGrid>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default PosterTwoElementsGenerator;
