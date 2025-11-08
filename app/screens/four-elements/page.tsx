"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { constructFileName } from "@/utils/formatters";
import { ElementKey, Facility } from "@/utils/types";
import {
  bgColorsValidate,
  imageVarietyValidate,
  inputValidate,
  validate,
} from "@/utils/validators";

import { ScreenGridBasic } from "@/components/layoutTemplates/screenGridBasic";

import ElementSelector, {
  ElementSelectorElement,
  ElementSelectorGrid,
} from "@/components/inputs/elementSelector";
import ErrorDisplay from "@/components/inputs/error";
import GenerateImageButton from "@/components/inputs/generateImageButton";
import { Switch } from "@/components/inputs/switch";
import { TextInput } from "@/components/inputs/textInputs";

import { MenuBlock, MenuSection, PreviewSection } from "@/components/layout";
import LoadingSkeleton from "@/components/loadingSkeleton";

const ScreenFourElementsGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [elements, setElements] = useState<
    Record<ElementKey, ElementSelectorElement>
  >({
    element1: { bg: "white", image: null },
    element2: { bg: "white", image: null },
    element3: { bg: "white", image: null },
    element4: { bg: "white", image: null },
  });
  const [facility, setFacility] = useState<number>(0);

  const [eventType, setEventType] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [reservationsVisible, setReservationsVisible] = useState<boolean>(true);

  const previewRef = useRef<HTMLDivElement>(null);

  const result = validate({
    data: { elements, eventType, title, date },
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
            Generátor: Obrazovka na nádraží se čtyřmi prvky
          </h1>
        </MenuBlock>

        <MenuBlock>
          <h2 className="font-bold mb-2">Prvky a pozadí</h2>
          <ElementSelectorGrid>
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
              />
            </div>

            <div className="col-span-6 border rounded p-4 bg-neutral-50">
              <label
                className="block font-medium mb-1 text-sm"
                htmlFor="web-toggle"
              >
                Datum / čas akce
              </label>
              <TextInput
                text={date}
                setText={setDate}
                id="date"
                displayMDashButton
              />
            </div>

            <div className="col-span-2 border rounded p-4 bg-neutral-50">
              <label
                className="block font-medium mb-1 text-sm"
                htmlFor="web-toggle"
              >
                Rezervace?
              </label>
              <Switch
                enabled={reservationsVisible}
                onToggle={() => setReservationsVisible((prev) => !prev)}
                id="web-toggle"
              />
            </div>
          </div>
        </MenuBlock>

        <MenuBlock last>
          <GenerateImageButton
            previewRef={previewRef}
            validated={result.valid}
            forceSize={{ width: 1920, height: 1080 }}
            fileName={constructFileName(title, "obrazovka", 1920, 1080)}
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
            <ScreenGridBasic>
              <div className="flex flex-row flex-nowrap">
                <div
                  className="w-[442.5px] aspect-square border-black border-b-2 border-r-2 relative"
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
                  className="w-[442.5px] aspect-square border-black border-b-2 border-r-2 relative"
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
                  className="w-[442.5px] aspect-square border-black border-b-2 border-r-2 relative"
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
                  className="w-[442.5px] aspect-square border-black border-b-2 relative"
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
              <div className="h-[407.5px] flex flex-col">
                {facility !== 0 ? (
                  <div
                    className="w-full h-[65px] border-b-2 border-black flex flex-row justify-center items-center text-center"
                    style={{
                      backgroundColor: facilities[facility].colorBg,
                    }}
                  >
                    <p className="facility facility-screen text-white">
                      {facilities[facility].name}
                    </p>
                  </div>
                ) : (
                  <></>
                )}

                <div className="w-[90%] mx-auto h-full flex flex-col justify-center items-center text-center">
                  <p
                    className="text-[2em] above-heading line-clamp-1"
                    style={{ marginBottom: title !== "" ? "-20px" : "10px" }}
                  >
                    {eventType}
                  </p>

                  <p className="text-[5.32em] line-clamp-1 font-medium main-heading alt-glyphs px-2">
                    {title}
                  </p>

                  <p className="text-[2.27em] font-medium line-clamp-1">
                    {date}
                  </p>

                  <p className="text-[2.27em] font-medium line-clamp-1">
                    {"Více informací" +
                      (reservationsVisible ? " a rezervace" : "") +
                      " na www.sferapardubice.eu."}
                  </p>
                </div>
              </div>
            </ScreenGridBasic>
          </div>
        </div>
      </PreviewSection>
    </div>
  );
};

export default ScreenFourElementsGenerator;
