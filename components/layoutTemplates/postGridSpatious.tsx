import { GridProps } from "./postGridBasic";

export const PostGridSpatious: React.FC<GridProps> = ({
  children,
  mode = "dark",
}) => {
  return (
    <>
      <div
        className={`w-[100px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-2`}
      >
        <div
          className={`h-[125px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[1100px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
      </div>
      <div
        className={`w-[880px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-2`}
      >
        <div
          className={`h-[125px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[1100px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2 flex flex-col overflow-hidden`}
        >
          {children}
        </div>
      </div>
      <div
        className={`w-[100px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        }`}
      >
        <div
          className={`h-[125px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[1100px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
      </div>
    </>
  );
};
