"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { formatDate } from "@/utils/formatters";
import { ElementKey, Facility } from "@/utils/types";
import { imageVarietyValidate, isSaturday, validate } from "@/utils/validators";

import VíkendovkaLayout from "@/components/layoutTemplates/víkendovkaLayout";

import ElementSelector, {
  ElementSelectorElement,
  ElementSelectorGrid,
} from "@/components/inputs/elementSelector";
import ErrorDisplay from "@/components/inputs/error";
import GenerateImageButton from "@/components/inputs/generateImageButton";

import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";
import LoadingSkeleton from "@/components/loadingSkeleton";

const ScreenFourElementsGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [saturdayDate, setSaturdayDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [elements, setElements] = useState<
    Record<ElementKey, ElementSelectorElement>
  >({
    element1: { bg: "white", image: null },
    element2: { bg: "white", image: null },
    element3: { bg: "white", image: null },
    element4: { bg: "white", image: null },
    element5: { bg: "white", image: null },
    element6: { bg: "white", image: null },
    element7: { bg: "white", image: null },
    element8: { bg: "white", image: null },
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const result = validate({
    data: { elements, saturdayDate },
    validators: [
      (d) => imageVarietyValidate(d.elements),
      (d) => isSaturday(d.saturdayDate),
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
            Generátor: Web thumbnail pro víkendovku
          </h1>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold mb-2">Prvky a pozadí</h2>
          <ElementSelectorGrid>
            {facilities.length === 0 || loading ? (
              <LoadingSkeleton height="h-24" count={8} />
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
                  imageQuality="medium"
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
                  noColorSelect
                  imageQuality="medium"
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
                  noColorSelect
                  imageQuality="medium"
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
                  noColorSelect
                  imageQuality="medium"
                />

                <ElementSelector
                  label="Vybrat prvek 5"
                  imageUrl={elements.element5.image || ""}
                  onSelect={(url) =>
                    setElements((prev) => ({
                      ...prev,
                      element5: { bg: prev.element5?.bg || "", image: url },
                    }))
                  }
                  onColorSelect={(color) =>
                    setElements((prev) => ({
                      ...prev,
                      element5: {
                        bg: color,
                        image: prev.element5?.image || null,
                      },
                    }))
                  }
                  noColorSelect
                  imageQuality="medium"
                />

                <ElementSelector
                  label="Vybrat prvek 6"
                  imageUrl={elements.element6.image || ""}
                  onSelect={(url) =>
                    setElements((prev) => ({
                      ...prev,
                      element6: { bg: prev.element6?.bg || "", image: url },
                    }))
                  }
                  onColorSelect={(color) =>
                    setElements((prev) => ({
                      ...prev,
                      element6: {
                        bg: color,
                        image: prev.element6?.image || null,
                      },
                    }))
                  }
                  noColorSelect
                  imageQuality="medium"
                />

                <ElementSelector
                  label="Vybrat prvek 7"
                  imageUrl={elements.element7.image || ""}
                  onSelect={(url) =>
                    setElements((prev) => ({
                      ...prev,
                      element7: { bg: prev.element7?.bg || "", image: url },
                    }))
                  }
                  onColorSelect={(color) =>
                    setElements((prev) => ({
                      ...prev,
                      element7: {
                        bg: color,
                        image: prev.element7?.image || null,
                      },
                    }))
                  }
                  noColorSelect
                  imageQuality="medium"
                />

                <ElementSelector
                  label="Vybrat prvek 8"
                  imageUrl={elements.element8.image || ""}
                  onSelect={(url) =>
                    setElements((prev) => ({
                      ...prev,
                      element8: { bg: prev.element8?.bg || "", image: url },
                    }))
                  }
                  onColorSelect={(color) =>
                    setElements((prev) => ({
                      ...prev,
                      element8: {
                        bg: color,
                        image: prev.element8?.image || null,
                      },
                    }))
                  }
                  noColorSelect
                  imageQuality="medium"
                />
              </>
            )}
          </ElementSelectorGrid>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold mb-2">Sobotní datum</h2>
          <div className="relative">
            <input
              type="date"
              value={saturdayDate}
              onChange={(e) => setSaturdayDate(e.target.value)}
              className="border p-2 w-full relative rounded"
              style={{
                borderColor: isSaturday(saturdayDate).valid ? "" : "var(--sos)",
              }}
            />
          </div>
        </MenuBlock>

        <MenuBlock last>
          <GenerateImageButton
            previewRef={previewRef}
            validated={result.valid}
            fileName={`web-thumbnail-vikendovka-${formatDate(
              saturdayDate,
            ).replace(/\./g, "-")}`}
          />
          <ErrorDisplay errors={result.errors} />
        </MenuBlock>
      </MenuSection>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <PreviewSection>
        <div className="scale-[35%] origin-top-left">
          <div
            ref={previewRef}
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap"
            style={{
              width: "1920px",
              height: "1080px",
            }}
          >
            <VíkendovkaLayout>
              <div className="absolute top-0 right-0 w-full h-full">
                <p className="absolute top-[42%] left-1/2 uppercase text-white font-youthRounded text-[4.35em] text-center -translate-x-1/2 -translate-y-1/2">
                  Víkendovka
                </p>

                <p className="absolute top-[55%] left-1/2 uppercase text-white font-youthRounded text-[7em] text-center -translate-x-1/2 -translate-y-1/2">
                  {+formatDate(saturdayDate).split(".")[0]}
                  <span>&mdash;</span>
                  {+formatDate(saturdayDate).split(".")[0] + 1}
                </p>

                <div className="absolute top-24 left-[36%] w-[250px] aspect-square rounded-full overflow-hidden">
                  {elements.element1.image && (
                    <Image
                      src={elements.element1.image}
                      alt="Image 1"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>

                <div className="absolute top-20 left-[64%] w-[175px] aspect-square rounded-full overflow-hidden">
                  {elements.element2.image && (
                    <Image
                      src={elements.element2.image}
                      alt="Image 2"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>

                <div className="absolute top-64 left-[85%] w-[225px] aspect-square rounded-full overflow-hidden">
                  {elements.element3.image && (
                    <Image
                      src={elements.element3.image}
                      alt="Image 3"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>

                <div className="absolute bottom-56 left-[13.5%] w-[225px] aspect-square rounded-full overflow-hidden">
                  {elements.element4.image && (
                    <Image
                      src={elements.element4.image}
                      alt="Image 4"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>

                <div className="absolute bottom-28 left-[43%] w-[210px] aspect-square rounded-full overflow-hidden">
                  {elements.element5.image && (
                    <Image
                      src={elements.element5.image}
                      alt="Image 5"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>

                <div className="absolute bottom-32 right-[10.5%] w-[280px] aspect-square rounded-full overflow-hidden">
                  {elements.element6.image && (
                    <Image
                      src={elements.element6.image}
                      alt="Image 6"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>

                <div className="absolute top-32 left-40 w-[200px] aspect-square rounded-full overflow-hidden">
                  {elements.element7.image && (
                    <Image
                      src={elements.element7.image}
                      alt="Image 7"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>

                <div className="absolute bottom-32 left-32 w-[150px] aspect-square rounded-full overflow-hidden">
                  {elements.element8.image && (
                    <Image
                      src={elements.element8.image}
                      alt="Image 8"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
              </div>
            </VíkendovkaLayout>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default ScreenFourElementsGenerator;
