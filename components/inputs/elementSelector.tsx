"use client";

import { useEffect, useState } from "react";
import { Color, ElementSet } from "@/utils/types";
import LoadingSkeleton from "../loadingSkeleton";
import { SectionProps } from "../layout";

export type ElementSelectorElement = {
  bg: string;
  image: string | null;
};

interface ElementSelectorProps {
  label: string;
  imageUrl?: string;
  onSelect: (url: string) => void;
  onColorSelect: (color: string) => void;
}

export default function ElementSelector({
  label,
  imageUrl,
  onSelect,
  onColorSelect,
}: ElementSelectorProps) {
  const [open, setOpen] = useState(false);

  const [elementSets, setElementSets] = useState<ElementSet[]>([]);
  const [loading, setLoading] = useState(true);

  const [accentColors, setAccentColors] = useState<Color[]>([]);
  const [colorsLoading, setColorsLoading] = useState(true);

  const [browsingSet, setBrowsingSet] = useState<ElementSet | null>(null);

  useEffect(() => {
    const fetchAccentColors = async () => {
      try {
        const res = await fetch(
          "https://branding.sferagrafika.eu/api/accentColors"
        );
        if (!res.ok) throw new Error("Failed to fetch items");
        const data: Color[] = await res.json();
        setAccentColors(data);
      } catch (err) {
        console.error(err);
      } finally {
        setColorsLoading(false);
      }
    };
    fetchAccentColors();

    if (!open) return;
    const fetchElementSets = async () => {
      try {
        const res = await fetch(
          "https://branding.sferagrafika.eu/api/elementSets"
        );
        if (!res.ok) throw new Error("Failed to fetch items");
        const data: ElementSet[] = await res.json();
        setElementSets(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchElementSets();
  }, [open]);

  const handleSelect = (url: string) => {
    onSelect(url);
    setOpen(false);
  };

  return (
    <>
      {/* The button */}
      <div className="flex flex-col gap-2">
        <div
          className="flex flex-row h-14 hover:cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all max-w-full overflow-hidden border rounded-md font-medium"
          onClick={() => setOpen(true)}
        >
          <img
            src={imageUrl ? imageUrl : "/img/element-placeholder.svg"}
            alt=""
            className="aspect-square h-full object-cover border "
          />
          <div className="px-5 py-3 border-l grid place-content-center text-xs">
            {imageUrl
              ? imageUrl.split("/").pop()?.split("_")[0] +
                "_" +
                imageUrl.split("/").pop()?.split("_")[1]
              : label}
          </div>
        </div>

        {colorsLoading && <LoadingSkeleton height="h-10" />}
        {accentColors.length > 0 && (
          <select
            className="border p-2 mb-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
            onChange={(event) => onColorSelect(event.target.value)}
          >
            {accentColors.map((color) => (
              <option key={color.id} value={color.hex}>
                {color.nameSimple}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* The modal */}
      {open && (
        <div className="w-screen h-screen fixed top-0 left-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          ></div>

          {/* Modal content */}
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        bg-white rounded-md shadow-md w-4/5 h-4/5 p-10 z-50 overflow-hidden border"
          >
            <button
              className="absolute top-6 right-6 text-gray-500 hover:text-black"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <div className="w-full h-full flex flex-col">
              <p className="font-bold text-2xl mb-4">Vyberte prvek</p>

              {loading ? (
                <>
                  <label className="block">Sada:</label>
                  <LoadingSkeleton height="h-10" />
                </>
              ) : (
                <>
                  <label className="block mb-2">Sada:</label>
                  <select
                    value={browsingSet?.id || ""}
                    onChange={(e) =>
                      setBrowsingSet(
                        elementSets.find(
                          (set) => set.id === Number(e.target.value)
                        ) || null
                      )
                    }
                    className="border p-2 mb-4 rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
                  >
                    <option value="">-- Vyberte sadu --</option>
                    {elementSets.map((set) => (
                      <option key={set.id} value={set.id}>
                        {set.name}
                      </option>
                    ))}
                  </select>

                  {browsingSet && browsingSet.name === "Unique" && (
                    <p className="w-full bg-red-200 p-3 mb-4">
                      Unikátní prvky musí být používané pouze v rámci propagace
                      akcí, pro které byly vytvořeny. Použití mimo tento rámec
                      musí být konzultováno s Michalem.
                    </p>
                  )}

                  {/* Elements grid */}
                  <div className="grid grid-cols-6 gap-2 overflow-y-auto">
                    {browsingSet?.elements?.map((element) => (
                      <div
                        key={element.id}
                        className="p-2 hover:bg-slate-100 cursor-pointer rounded"
                        onClick={() => handleSelect(element.variants[2].url)}
                      >
                        <img
                          src={element.variants[1].url}
                          alt={element.name}
                          className="w-full h-auto rounded"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export const ElementSelectorGrid: React.FC<SectionProps> = ({ children }) => {
  return <div className="grid grid-cols-4 gap-2">{children}</div>;
};
