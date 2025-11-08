"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { constructFileName, removeEmojis } from "@/utils/formatters";
import SplitParagraph from "@/utils/splitParagraphs";
import { ElementKey, Facility } from "@/utils/types";
import {
  bgColorsValidate,
  imageVarietyValidate,
  inputValidate,
  validate,
} from "@/utils/validators";

import { PostGridSimple } from "@/components/layoutTemplates/postGridBasic";

import ElementSelector, {
  ElementSelectorElement,
  ElementSelectorGrid,
} from "@/components/inputs/elementSelector";
import ErrorDisplay from "@/components/inputs/error";
import GenerateImageButton from "@/components/inputs/generateImageButton";
import { Switch } from "@/components/inputs/switch";
import LongTextInput, { TextInput } from "@/components/inputs/textInputs";

import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";
import LoadingSkeleton from "@/components/loadingSkeleton";

const PostTwoElementsGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [elements, setElements] = useState<
    Record<ElementKey, ElementSelectorElement>
  >({
    element1: { bg: "white", image: null },
    element2: { bg: "white", image: null },
  });

  const [facility, setFacility] = useState<number>(0);

  const [eventType, setEventType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const previewRef = useRef<HTMLDivElement>(null);
  const result = validate({
    data: { elements, title, eventType, date },
    validators: [
      (d) => imageVarietyValidate(d.elements),
      (d) => bgColorsValidate(d.elements),
      (d) => inputValidate(d.title || "", "Název akce"),
      (d) => inputValidate(d.eventType || "", "Typ akce"),
      (d) => inputValidate(d.date || "", "Datum akce", "vyplněno"),
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
            Generátor: Příspěvek se dvěma prvky
          </h1>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold mb-2">Prvky a pozadí</h2>
          <ElementSelectorGrid>
            {facilities.length === 0 || loading ? (
              <LoadingSkeleton height="h-24" count={2} />
            ) : (
              <>
                <ElementSelector
                  label="Vybrat prvek 1"
                  imageUrl={elements.element1?.image || ""}
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
                  imageUrl={elements.element2?.image || ""}
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
        <MenuBlock>
          <h2 className="font-bold">Kdo zaštiťuje akci?</h2>
          <div className="w-full mt-2">
            {loading && <LoadingSkeleton height="h-10" />}
            {facilities.length === 0 && !loading && (
              <p>Žádné místnosti nejsou k dispozici.</p>
            )}
            {facilities.length > 0 && (
              <select
                className="border p-2 w-full rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
                value={facility}
                onChange={(e) => setFacility(Number(e.target.value))}
              >
                <option value={0}>-- Vyberte dílnu / laboratoř --</option>
                {facilities
                  .filter((facility) => facility.id !== 0)
                  .map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
              </select>
            )}
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
                htmlFor="web-toggle"
              >
                Datum / popisek akce
              </label>
              <LongTextInput text={date} setText={setDate} id="date" />
            </div>
          </div>
        </MenuBlock>
        <MenuBlock last>
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
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap"
            style={{ width: "1080px", height: "1350px" }}
            ref={previewRef}
          >
            <PostGridSimple>
              <div className="flex flex-row flex-nowrap">
                <div
                  className="w-[440px] aspect-square border-black border-b-2 border-r-2 relative"
                  style={{
                    backgroundColor: elements.element1
                      ? elements.element1.bg
                      : "white",
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
                <div
                  className="w-[440px] aspect-square border-black border-b-2 relative"
                  style={{
                    backgroundColor: elements.element2
                      ? elements.element2.bg
                      : "white",
                  }}
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
              {facility !== 0 ? (
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
              ) : (
                <></>
              )}
              <div className="w-[90%] mx-auto h-full flex flex-col justify-center items-center text-center">
                <p
                  className="text-[1.75em] above-heading line-clamp-1"
                  style={{ marginBottom: title !== "" ? "-20px" : "10px" }}
                >
                  {eventType}
                </p>

                <SplitParagraph
                  text={removeEmojis(title)}
                  cssStyles="text-[5.1em] line-clamp-1 font-medium main-heading alt-glyphs px-2"
                />

                <SplitParagraph
                  text={removeEmojis(date)}
                  cssStyles="text-[1.87em] leading-[1.2em] font-base line-clamp-3 mb-4"
                />
              </div>
            </PostGridSimple>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default PostTwoElementsGenerator;
