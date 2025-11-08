"use client";

import React from "react";

import { toPng } from "html-to-image";

interface GenerateImageButtonProps {
  previewRef: React.RefObject<HTMLDivElement>;
  validated?: boolean;
  fileName?: string;
  forceSize?: { width: number; height: number } | false;
}

const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({
  previewRef,
  validated = true,
  fileName = "generated_image",
  forceSize = false,
}) => {
  const [generatingLoading, setGeneratingLoading] =
    React.useState<boolean>(false);

  // 👇 helper function that handles both cases
  const generatePng = async () => {
    if (!previewRef.current) return;

    setGeneratingLoading(true);
    try {
      if (forceSize) {
        // --- FullHD version with internal oversampling ---
        const dataUrlHighRes = await toPng(previewRef.current, {
          cacheBust: true,
          pixelRatio: 2, // oversample for smooth edges
        });

        const img = new Image();
        img.src = dataUrlHighRes;
        await img.decode();

        // Create exactly 1920x1080 canvas
        const canvas = document.createElement("canvas");
        canvas.width = forceSize.width;
        canvas.height = forceSize.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas context unavailable");

        // Scale down high-res render into FullHD canvas
        ctx.drawImage(img, 0, 0, forceSize.width, forceSize.height);
        return canvas.toDataURL("image/png");
      } else {
        // --- Standard PNG generation ---
        return await toPng(previewRef.current, {
          cacheBust: true,
          pixelRatio: 3,
        });
      }
    } finally {
      setGeneratingLoading(false);
    }
  };

  return (
    <>
      <div
        className="fixed w-screen h-screen top-0 left-0 bg-slate-100 z-[100] opacity-70 grid place-content-center text-xl font-medium text-center"
        style={{ display: generatingLoading ? "block" : "none" }}
      >
        <p className="animate-pulse pointer-events-none">Generuji obrázek...</p>
      </div>

      <div className="w-full py-5">
        <button
          className="bg-gray-100 hover:bg-gray-200 border rounded-md transition-all px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={generatingLoading || !validated}
          onClick={async () => {
            const dataUrl = await generatePng();
            if (dataUrl) {
              const link = document.createElement("a");
              link.download = fileName + ".png";
              link.href = dataUrl;
              link.click();
            }
          }}
        >
          {forceSize
            ? `Stáhnout jako ${forceSize.width}x${forceSize.height} PNG`
            : "Stáhnout jako PNG"}
        </button>
      </div>
    </>
  );
};

export default GenerateImageButton;
