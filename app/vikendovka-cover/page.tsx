"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { toPng } from "html-to-image";

import ErrorText from "@/components/error-text";
import VíkendovkaLayout from "@/components/posts/víkendovkaLayout";
import { formatDate } from "@/utils/formatters";
import { baseElementSets } from "@/datasets/elements";

type Element = {
  prefix: string;
  number: number;
};

const WeekendCoverGenerator = () => {
  //--- STATES AND REFS --------------------------------------------------------------

  const [saturdayDate, setSaurdayDate] = useState("2024-04-21");

  const [randomElements, setRandomElements] = useState<Element[]>([
    { prefix: "SOS_", number: 1 },
    { prefix: "SOS_", number: 2 },
    { prefix: "Přírodopis_", number: 1 },
    { prefix: "Hřiště_", number: 2 },
    { prefix: "IT VR_", number: 9 },
    { prefix: "Chemie_", number: 5 },
    { prefix: "Fyzika_", number: 2 },
  ]);

  function generateRandomElements(): void {
    let generatedElements: Element[] = [...randomElements];

    generatedElements.forEach((element, index) => {
      const randomSet =
        baseElementSets[Math.floor(Math.random() * baseElementSets.length)];

      const randomElementNumber = Math.floor(
        Math.random() * randomSet.numberOfElements
      );

      generatedElements[index] = {
        prefix: randomSet.elementPrefix,
        number: randomElementNumber + 1,
      };
    });

    console.log("generatedElements", generatedElements);

    setRandomElements(generatedElements);
  }

  const previewRef = useRef<HTMLDivElement>(null);

  //--- IMAGE GENERATOR --------------------------------------------------------------
  const handleGenerate = async () => {
    if (previewRef.current) {
      const pngData = await toPng(previewRef.current, {
        width: 1920,
        height: 1080,
      });
      const link = document.createElement("a");

      link.download = `SFÉRA_1920x1080px_víkend-${
        +formatDate(saturdayDate).split(".")[0] +
        "-" +
        (+formatDate(saturdayDate).split(".")[0] + 1)
      }-cover.png`;
      link.href = pngData;
      link.click();
    }
  };

  //--- VALIDATION LOGIC --------------------------------------------------------------
  const isSaturday = (dateString: string): boolean => {
    const date = new Date(dateString);
    return date.getDay() === 6;
  };

  const saturdayValidated = isSaturday(saturdayDate);

  return (
    <div className="p-4 h-auto flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-10 border-r">
        {/* --- INPUT SECTION -------------------------------------------------------------- */}
        <h1 className="text-xl font-bold mb-4">Generátor: Cover víkendovky</h1>

        {/* --- DATE AND TIME SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="flex flex-col lg:flex-row flex-nowrap gap-3">
            <div className="mb-4 w-full lg:w-1/3">
              <label className="block font-semibold">Sobotní datum</label>
              <div className="relative">
                <input
                  type="date"
                  value={saturdayDate}
                  onChange={(e) => setSaurdayDate(e.target.value)}
                  className="border p-2 w-full relative"
                  style={{
                    borderColor: saturdayValidated ? "" : "var(--sos)",
                  }}
                />
                {!saturdayValidated ? (
                  <ErrorText>
                    <>Datum musí být sobota</>
                  </ErrorText>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => generateRandomElements()}
            className="mt-4 border-2 border-black px-8 py-4 font-bold"
          >
            Randomizovat prvky
          </button>

          <div className="bg-accent-pink p-5 mt-5">
            <p>
              Prosím, ujistěte se, že{" "}
              <strong>
                všechny prvky jsou viditelné, žádný z nich není zakázaným prvkem
                a grafika neobsahuje duplicity.
              </strong>
            </p>
          </div>
        </div>

        {/* --- DOWNLOAD SECTION --- */}
        <div className="w-full py-5">
          {
            // Is the date saturday?
            saturdayDate && saturdayValidated ? (
              <button
                onClick={() => handleGenerate()}
                className="mt-4 border-2 border-black px-8 py-4 font-bold"
              >
                Stáhnout obrázek (.png)
              </button>
            ) : (
              <>
                <button className="my-4 border-2 border-gray-400 bg-gray-300 px-8 py-4 font-bold text-gray-400">
                  Stáhnout obrázek (.png)
                </button>
                {!saturdayValidated ? (
                  <ErrorText>Prosím, zadejte datum soboty</ErrorText>
                ) : (
                  <></>
                )}
              </>
            )
          }
        </div>
      </div>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <div className="w-full lg:w-1/2 pointer-events-none max-h-screen overflow-hidden">
        <div className="scale-[35%] lg:scale-20 origin-top-left lg:origin-[25%_25%]">
          <div
            ref={previewRef}
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap testimonial"
            style={{ width: "1920px", height: "1080px" }}
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

                <div className="absolute top-32 left-40 w-[200px] aspect-square rounded-full overflow-hidden">
                  <Image
                    src={
                      "/img/elements/" +
                      randomElements[0].prefix +
                      "motiv" +
                      randomElements[0].number +
                      ".png"
                    }
                    fill
                    alt=""
                  />
                </div>

                <div className="absolute top-24 left-[36%] w-[250px] aspect-square rounded-full overflow-hidden">
                  <Image
                    src={
                      "/img/elements/" +
                      randomElements[1].prefix +
                      "motiv" +
                      randomElements[1].number +
                      ".png"
                    }
                    fill
                    alt=""
                  />
                </div>

                <div className="absolute top-20 left-[64%] w-[175px] aspect-square rounded-full overflow-hidden">
                  <Image
                    src={
                      "/img/elements/" +
                      randomElements[2].prefix +
                      "motiv" +
                      randomElements[2].number +
                      ".png"
                    }
                    fill
                    alt=""
                  />
                </div>

                <div className="absolute top-64 left-[85%] w-[225px] aspect-square rounded-full overflow-hidden">
                  <Image
                    src={
                      "/img/elements/" +
                      randomElements[3].prefix +
                      "motiv" +
                      randomElements[3].number +
                      ".png"
                    }
                    fill
                    alt=""
                  />
                </div>

                <div className="absolute bottom-56 left-[13.5%] w-[225px] aspect-square rounded-full overflow-hidden">
                  <Image
                    src={
                      "/img/elements/" +
                      randomElements[4].prefix +
                      "motiv" +
                      randomElements[4].number +
                      ".png"
                    }
                    fill
                    alt=""
                  />
                </div>

                <div className="absolute bottom-28 left-[43%] w-[210px] aspect-square rounded-full overflow-hidden">
                  <Image
                    src={
                      "/img/elements/" +
                      randomElements[5].prefix +
                      "motiv" +
                      randomElements[5].number +
                      ".png"
                    }
                    fill
                    alt=""
                  />
                </div>

                <div className="absolute bottom-32 right-[10.5%] w-[280px] aspect-square rounded-full overflow-hidden">
                  <Image
                    src={
                      "/img/elements/" +
                      randomElements[6].prefix +
                      "motiv" +
                      randomElements[6].number +
                      ".png"
                    }
                    fill
                    alt=""
                  />
                </div>
              </div>
            </VíkendovkaLayout>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekendCoverGenerator;
