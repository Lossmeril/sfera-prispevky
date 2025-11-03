"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { ElementKey, Facility } from "@/utils/types";
import { imageVarietyValidate, validate } from "@/utils/validators";

import { PostGridSimple } from "@/components/layoutTemplates/postGridBasic";

import ElementSelector, {
  ElementSelectorElement,
  ElementSelectorGrid,
} from "@/components/inputs/elementSelector";
import ErrorDisplay from "@/components/inputs/error";
import GenerateImageButton from "@/components/inputs/generateImageButton";

import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";
import LoadingSkeleton from "@/components/loadingSkeleton";

const PostOneElementGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [elements, setElements] = useState<
    Record<ElementKey, ElementSelectorElement>
  >({
    element1: { bg: "white", image: null },
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const result = validate({
    data: { elements },
    validators: [(d) => imageVarietyValidate(d.elements)],
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
            Generátor: Příspěvek s jedním prvkem
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
          <GenerateImageButton
            previewRef={previewRef}
            validated={result.valid}
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
            <PostGridSimple>
              <div
                className="w-full h-full relative"
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
            </PostGridSimple>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default PostOneElementGenerator;
