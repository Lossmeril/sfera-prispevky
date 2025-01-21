import React, { RefObject } from "react";
import { toPng } from "html-to-image";

interface GenerateImageButtonProps {
  postReference: RefObject<HTMLElement>;
  postTitle: string;
}

const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({
  postReference,
  postTitle,
}) => {
  const handleGenerate = async () => {
    if (postReference.current) {
      try {
        const pngData = await toPng(postReference.current, {
          width: 1080,
          height: 1350,
        });
        const link = document.createElement("a");
        link.download =
          "SFÉRA_1080x1350px_" +
          postTitle
            .split(":")[0]
            .replace(/ /g, "-")
            .replace(/[#%&:*!?]/g, "")
            .toLowerCase() +
          "-prispevek.png";
        link.href = pngData;
        link.click();
      } catch (error) {
        console.error("Failed to generate image:", error);
      }
    }
  };

  return (
    <button
      onClick={() => handleGenerate()}
      className="mt-4 border-2 border-black px-8 py-4 font-bold"
    >
      Stáhnout příspěvek (.png)
    </button>
  );
};

export default GenerateImageButton;

export const InactiveGenerateButton = () => {
  return (
    <button className="my-4 border-2 border-gray-400 bg-gray-300 px-8 py-4 font-bold text-gray-400">
      Stáhnout příspěvek (.png)
    </button>
  );
};
