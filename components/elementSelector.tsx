"use client";

import { useEffect, useState } from "react";
import { ElementSet } from "@/utils/types";

interface ElementSelectorProps {
  label: string;
  imageUrl?: string;
  onSelect: (url: string) => void;
}

export default function ElementSelector({
  label,
  imageUrl,
  onSelect,
}: ElementSelectorProps) {
  const [open, setOpen] = useState(false);
  const [elementSets, setElementSets] = useState<ElementSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [browsingSet, setBrowsingSet] = useState<ElementSet | null>(null);

  useEffect(() => {
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
      <div
        className="flex flex-row h-14 hover:cursor-pointer hover:bg-neutral-200 transition-all"
        onClick={() => setOpen(true)}
      >
        <img
          src={
            imageUrl ? imageUrl : "https://placehold.co/400?text=Coming+Soon"
          }
          alt=""
          className="aspect-squareh-full object-cover border border-black border-r-0"
        />
        <div className="px-5 py-3 border border-black fit-content">{label}</div>
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
                <p>Načítání…</p>
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
                    className="border p-2 rounded mb-4"
                  >
                    <option value="">-- Vyberte sadu --</option>
                    {elementSets.map((set) => (
                      <option key={set.id} value={set.id}>
                        {set.name}
                      </option>
                    ))}
                  </select>

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
