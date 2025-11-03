"use client";

import React from "react";

import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface GeneratePdfButtonProps {
  previewRef: React.RefObject<HTMLDivElement>;
  validated?: boolean;
  fileName?: string;
}

const GeneratePdfButton: React.FC<GeneratePdfButtonProps> = ({
  previewRef,
  validated = true,
  fileName = "sfera_post.pdf",
}) => {
  const [generatingLoading, setGeneratingLoading] =
    React.useState<boolean>(false);

  const handleGeneratePdf = async () => {
    if (!previewRef.current) return;
    setGeneratingLoading(true);

    try {
      // Convert the element to a high-resolution PNG using html-to-image
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        canvasWidth: previewRef.current.offsetWidth * 2,
        canvasHeight: previewRef.current.offsetHeight * 2,
        style: {
          transform: "scale(1)",
          transformOrigin: "top left",
          width: `${previewRef.current.offsetWidth}px`,
          height: `${previewRef.current.offsetHeight}px`,
        },
      });

      // Load image in jsPDF
      const pdf = new jsPDF({
        orientation:
          previewRef.current.offsetWidth > previewRef.current.offsetHeight
            ? "l"
            : "p",
        unit: "pt",
        format: [
          previewRef.current.offsetWidth,
          previewRef.current.offsetHeight,
        ],
      });

      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        previewRef.current.offsetWidth,
        previewRef.current.offsetHeight,
      );
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGeneratingLoading(false);
    }
  };

  return (
    <>
      {generatingLoading && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-slate-100 z-[100] opacity-70 grid place-content-center text-xl font-medium text-center">
          <p className="animate-pulse pointer-events-none">
            Generuji PDF soubor...
          </p>
        </div>
      )}

      <div className="w-full py-5">
        <button
          className="bg-gray-100 hover:bg-gray-200 border rounded-md transition-all px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={generatingLoading || !validated}
          onClick={handleGeneratePdf}
        >
          Stáhnout jako PDF
        </button>
      </div>
    </>
  );
};

export default GeneratePdfButton;
