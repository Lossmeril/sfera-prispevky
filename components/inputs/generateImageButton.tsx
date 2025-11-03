"use client";

import React from "react";

import { toPng } from "html-to-image";

interface GenerateImageButtonProps {
  previewRef: React.RefObject<HTMLDivElement>;
  validated?: boolean;
}

const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({
  previewRef,
  validated = true,
}) => {
  const [generatingLoading, setGeneratingLoading] =
    React.useState<boolean>(false);

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
          disabled={generatingLoading && !validated}
          onClick={async () => {
            if (previewRef.current) {
              setGeneratingLoading(true);
              try {
                const dataUrl = await toPng(previewRef.current, {
                  cacheBust: true,
                });
                const link = document.createElement("a");
                link.download = "sfera_post_one_element.png";
                link.href = dataUrl;
                link.click();
              } finally {
                setGeneratingLoading(false);
              }
            }
          }}
        >
          Stáhnout jako PNG
        </button>
      </div>
    </>
  );
};

export default GenerateImageButton;
