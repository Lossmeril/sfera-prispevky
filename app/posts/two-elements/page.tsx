"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PostGridSimple } from "@/components/posts/postGrid";
import { Facility } from "@/utils/apiTypes";

const PostTwoElementsGenerator = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);

  const [element1No, setElement1No] = useState("");
  const [element2No, setElement2No] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://branding.sferagrafika.eu/api/facilities"
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
    <div className="p-4 h-auto flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 p-10 border-r">
        <h1 className="text-xl font-bold mb-4">
          Generátor: Příspěvek se dvěma prvky
        </h1>
        {facilities.length > 0 ? (
          <div className="mb-4">
            <label className="block mb-2 font-medium">První prvek:</label>
            <select
              className="w-full p-2 border"
              value={element1No}
              onChange={(e) => setElement1No(e.target.value)}
            >
              <option value="">Vyberte prvek</option>
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <p>Načítání...</p>
        )}
      </div>

      {/* --- LIVE PREVIEW SECTION -------------------------------------------------------------- */}
      <div className="w-full lg:w-1/2 pointer-events-none max-h-screen overflow-hidden">
        <div className="scale-[35%] lg:scale-50 origin-top-left lg:origin-[50%_25%]">
          <div
            className="relative pointer-events-none border bg-white flex flex-row flex-nowrap"
            style={{ width: "1080px", height: "1350px" }}
          >
            <PostGridSimple>
              <div className="flex flex-row flex-nowrap">
                <div className="w-[440px] aspect-square border-black border-b-2 border-r-2 relative">
                  {/* {image1 && (
                      <Image
                        src={URL.createObjectURL(image1)}
                        alt="Image 1"
                        className="object-cover"
                        fill
                      />
                      
                    )} */}

                  {element1No && (
                    <Image
                      src={element1No}
                      alt="Image 1"
                      className="object-cover"
                      fill
                    />
                  )}
                </div>
                <div className="w-[440px] aspect-square border-black border-b-2 relative">
                  {/* {elementSet2 && (
                    <Image
                      src={
                        "/img/elements/" +
                        elementSet2.elementPrefix +
                        "motiv" +
                        element2No +
                        ".png"
                      }
                      alt="Image 2"
                      className="object-cover"
                      fill
                    />
                  )} */}
                </div>
              </div>
              {/* {facility !== 0 ? (
                <div
                  className="w-full h-32 border-b-2 border-black flex flex-row justify-center items-center text-center"
                  style={{
                    backgroundColor:
                      "var(--" + facilities[facility - 1].colorBgVarName + ")",
                  }}
                >
                  <p className="facility text-white">
                    {facilities[facility - 1].name}
                  </p>
                </div>
              ) : (
                <></>
              )} */}
            </PostGridSimple>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTwoElementsGenerator;
