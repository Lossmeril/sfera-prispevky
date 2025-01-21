"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { toPng } from "html-to-image";

import { lengthValidate, uppercaseValidate } from "@/utils/validators";
import ErrorText from "@/components/error-text";
import { removeEmojis } from "@/utils/formatters";
import PostGrid from "@/components/posts/postGrid";
import GenerateImageButton, {
  InactiveGenerateButton,
} from "@/components/posts/imageGeneratorButton";

const TestimonialGenerator = () => {
  //--- STATES AND REFS --------------------------------------------------------------

  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const [image1, setImage1] = useState<File | null>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  //--- UPLOAD FUNCTION --------------------------------------------------------------
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  //--- VALIDATOR VARIABLES --------------------------------------------------------------

  const descLengthLong = 200;

  //--- VALIDATOR FUNCTIONS --------------------------------------------------------------
  const descLengthValidate = lengthValidate(
    text.length,
    descLengthLong,
    descLengthLong,
    false
  );

  const isTextSet = text !== "";
  const isTextNotUppercase = uppercaseValidate(text);
  const isAuthorNotUppercase = uppercaseValidate(author);

  //--- IMAGE GENERATOR --------------------------------------------------------------
  const handleGenerate = async () => {
    if (previewRef.current) {
      const pngData = await toPng(previewRef.current, {
        width: 1080,
        height: 1350,
      });
      const link = document.createElement("a");
      link.download =
        "SFÉRA_1080x1350px_" +
        author
          .split(":")[0]
          .replace(/ /g, "-")
          .replace(/[#%&:*!?]/, "")
          .toLowerCase() +
        "-prispevek.png";
      link.href = pngData;
      link.click();
    }
  };

  return (
    <div className="p-4 h-auto flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-10 border-r">
        {/* --- INPUT SECTION -------------------------------------------------------------- */}
        <h1 className="text-xl font-bold mb-4">Generátor: Reference</h1>

        {/* --- NAME, TYPE AND DESCRIPTION SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="mb-4">
            <label className="block font-semibold">
              Popisek<span className="text-sos"> *</span>
            </label>
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(removeEmojis(e.target.value))}
                className="border p-2 w-full relative"
                style={{
                  borderColor:
                    descLengthValidate && isTextNotUppercase ? "" : "red",
                }}
                maxLength={descLengthLong}
              />
              <p
                className="absolute right-3 top-2 text-slate-400"
                style={{ color: descLengthValidate ? "" : "var(--sos)" }}
              >
                {descLengthLong - text.length}
              </p>
              {!descLengthValidate ? (
                <ErrorText>
                  <>Prosím, zkrať referenci</>
                </ErrorText>
              ) : (
                <></>
              )}
            </div>
          </div>{" "}
          <div className="flex flex-col lg:flex-row flex-nowrap w-full gap-5">
            <div className="mb-4 w-full">
              <label className="block font-semibold">Jméno citovaného</label>
              <div className="relative">
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(removeEmojis(e.target.value))}
                  className="border p-2 w-full"
                  maxLength={50}
                  style={{
                    borderColor: isAuthorNotUppercase ? "" : "var(--sos)",
                  }}
                />
                <p className="absolute text-slate-400 right-3 top-2">
                  {50 - author.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- IMAGES SECTION --- */}
        <div className="w-full py-5 border-b">
          <div className="flex flex-row flex-nowrap gap-3">
            <div className="w-1/2">
              <div className="mb-4">
                <label className="block font-semibold">
                  Nahrajte autorovu fotografii:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, setImage1)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- DOWNLOAD SECTION --- */}
        <div className="w-full py-5">
          {
            // Is the text not overflowing?
            descLengthValidate &&
            // Is the description set?
            isTextSet &&
            // Is the description not all uppercase?
            isTextNotUppercase &&
            // Is the author's name not all uppercase?
            isAuthorNotUppercase ? (
              <GenerateImageButton
                postReference={previewRef}
                postTitle="reference"
              />
            ) : (
              <>
                <InactiveGenerateButton />
                {!isTextSet ? (
                  <ErrorText>Prosím, vyplň referenci</ErrorText>
                ) : (
                  <></>
                )}
                {!isTextNotUppercase ? (
                  <ErrorText>Referenci nepíšeme velkými písmeny</ErrorText>
                ) : (
                  <></>
                )}
                {!isAuthorNotUppercase ? (
                  <ErrorText>Jméno autora nepíšeme velkými písmeny</ErrorText>
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
        <div className="scale-[35%] lg:scale-50 origin-top-left lg:origin-[50%_25%]">
          <div
            ref={previewRef}
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap testimonial"
            style={{ width: "1080px", height: "1350px" }}
          >
            <PostGrid>
              <div className="mx-[120px] h-full flex flex-col py-[20px] justify-center items-center gap-10">
                {image1 && (
                  <div className="w-40 h-40 relative overflow-hidden mx-auto rounded-full">
                    <Image
                      src={URL.createObjectURL(image1)}
                      alt="Image 1"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="desc m-0 font-medium">{text}</p>
                {author && (
                  <div>
                    {author ? (
                      <h2 className="author font-medium">&mdash; {author}</h2>
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
            </PostGrid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialGenerator;
