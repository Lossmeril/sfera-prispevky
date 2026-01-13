"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { constructFileName, removeEmojis } from "@/utils/formatters";
import SplitParagraph from "@/utils/splitParagraphs";
import { ElementKey, Facility } from "@/utils/types";
import {
  imageVarietyValidate,
  inputValidate,
  validate,
} from "@/utils/validators";

import { PostGridSpatious } from "@/components/layoutTemplates/postGridSpatious";

import ElementSelector, {
  ElementSelectorElement,
  ElementSelectorGrid,
} from "@/components/inputs/elementSelector";
import ErrorDisplay from "@/components/inputs/error";
import GenerateImageButton from "@/components/inputs/generateImageButton";
import { TextInput } from "@/components/inputs/textInputs";

import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";
import LoadingSkeleton from "@/components/loadingSkeleton";

const PostOneElementWithHeadingGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [elements, setElements] = useState<
    Record<ElementKey, ElementSelectorElement>
  >({
    element1: { bg: "white", image: null },
  });
  const [eventType, setEventType] = useState("");
  const [title, setTitle] = useState("");

  const previewRef = useRef<HTMLDivElement>(null);

  const result = validate({
    data: { elements, eventType, title },
    validators: [
      (d) => imageVarietyValidate(d.elements),
      (d) => inputValidate(d.eventType, "Typ akce"),
      (d) => inputValidate(d.title, "Název akce"),
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
            Generátor: Příspěvek s jedním prvkem a názvem akce
          </h1>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold mb-2">Prvky a pozadí</h2>
          <ElementSelectorGrid>
            {facilities.length === 0 || loading ? (
              <LoadingSkeleton height="h-24" />
            ) : (
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
            )}
          </ElementSelectorGrid>
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
          </div>
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
                className="w-full aspect-square relative border-b-2 border-black"
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
                      cssStyles="text-[4.2em] leading-[0.9em] line-clamp-2 font-medium main-heading alt-glyphs px-10"
                    />
                  </div>
                )}
              </div>
            </PostGridSpatious>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default PostOneElementWithHeadingGenerator;
