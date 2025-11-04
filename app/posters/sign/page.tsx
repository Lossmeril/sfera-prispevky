"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import splitParagraphs from "@/utils/splitParagraphs";
import { ElementKey, Facility } from "@/utils/types";
import {
  bgColorsValidate,
  imageVarietyValidate,
  inputValidate,
  validate,
} from "@/utils/validators";

import { PosterSignGrid } from "@/components/layoutTemplates/posterSign";

import ElementSelector, {
  ElementSelectorElement,
  ElementSelectorGrid,
} from "@/components/inputs/elementSelector";
import ErrorDisplay from "@/components/inputs/error";
import GeneratePdfButton from "@/components/inputs/generatePdfButton";
import LongTextInput from "@/components/inputs/textInputs";

import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";
import LoadingSkeleton from "@/components/loadingSkeleton";

const PostTwoElementsGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState<string>("");

  const [elements, setElements] = useState<
    Record<ElementKey, ElementSelectorElement>
  >({
    element1: { bg: "white", image: null },
    element2: { bg: "white", image: null },
    element3: { bg: "white", image: null },
    element4: { bg: "white", image: null },
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const result = validate({
    data: { elements, text },
    validators: [
      (d) => imageVarietyValidate(d.elements),
      (d) => bgColorsValidate(d.elements),
      (d) => inputValidate(d.text || "", "Text cedule"),
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
          <h1 className="text-xl font-bold">Generátor: Informační cedule</h1>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold mb-2">Prvky a pozadí</h2>
          <ElementSelectorGrid>
            {" "}
            {facilities.length === 0 || loading ? (
              <LoadingSkeleton height="h-24" count={4} />
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

                <ElementSelector
                  label="Vybrat prvek 3"
                  imageUrl={elements.element3.image || ""}
                  onSelect={(url) =>
                    setElements((prev) => ({
                      ...prev,
                      element3: { bg: prev.element3?.bg || "", image: url },
                    }))
                  }
                  onColorSelect={(color) =>
                    setElements((prev) => ({
                      ...prev,
                      element3: {
                        bg: color,
                        image: prev.element3?.image || null,
                      },
                    }))
                  }
                />

                <ElementSelector
                  label="Vybrat prvek 4"
                  imageUrl={elements.element4.image || ""}
                  onSelect={(url) =>
                    setElements((prev) => ({
                      ...prev,
                      element4: { bg: prev.element4?.bg || "", image: url },
                    }))
                  }
                  onColorSelect={(color) =>
                    setElements((prev) => ({
                      ...prev,
                      element4: {
                        bg: color,
                        image: prev.element4?.image || null,
                      },
                    }))
                  }
                />
              </>
            )}
          </ElementSelectorGrid>
        </MenuBlock>
        <MenuBlock>
          <h2 className="font-bold mb-2">Text cedule</h2>
          <LongTextInput
            text={text}
            setText={setText}
            placeholder="Text cedule napište zde"
          />
        </MenuBlock>
        <MenuBlock>
          <GeneratePdfButton previewRef={previewRef} validated={result.valid} />
          <ErrorDisplay errors={result.errors} />
        </MenuBlock>
      </MenuSection>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <PreviewSection>
        <div className="scale-[25%] origin-top-left ">
          <div
            className="relative pointer-events-none bg-white flex flex-row flex-nowrap overflow-hidden"
            style={{ height: "1786px", width: "2526px" }}
            ref={previewRef}
          >
            <PosterSignGrid>
              <div className="flex flex-row flex-nowrap">
                <div
                  className="w-[566.5px] aspect-square border-black border-b-2 border-r-2 relative"
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
                  className="w-[566.5px] aspect-square border-black border-b-2 border-r-2 relative"
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
                <div
                  className="w-[566.5px] aspect-square border-black border-b-2 border-r-2 relative"
                  style={{ backgroundColor: elements.element3.bg }}
                >
                  {elements.element3.image && (
                    <Image
                      src={elements.element3.image}
                      alt="Image 3"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
                <div
                  className="w-[566.5px] aspect-square border-black border-b-2 relative"
                  style={{ backgroundColor: elements.element4.bg }}
                >
                  {elements.element4.image && (
                    <Image
                      src={elements.element4.image}
                      alt="Image 4"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
              </div>

              <div className="w-full h-full grid text-left overflow-hidden my-[9rem]">
                {splitParagraphs({
                  text,
                  cssStyles:
                    "text-[9.2em] font-bold leading-[1.3] alt-glyphs tracking-[-0.02em] ml-44 mr-44 line-clamp-3",
                })}
              </div>
            </PosterSignGrid>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default PostTwoElementsGenerator;
