import { GridProps } from "./postGridBasic";

export const PosterSignGrid: React.FC<GridProps> = ({
  children,
  mode = "dark",
}) => {
  return (
    <>
      <div
        className={`w-[130px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-[3px]`}
      >
        <div
          className={`h-[130px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px]`}
        ></div>
        <div
          className={`h-[1419px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px]`}
        ></div>
      </div>
      <div
        className={`w-[2266px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-[3px]`}
      >
        <div
          className={`h-[130px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px]`}
        ></div>
        <div
          className={`h-[1419px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px] flex flex-col overflow-hidden`}
        >
          {children}
        </div>
        <div className="w-full h-[237px] grid place-content-center">
          <img
            src={
              mode === "dark"
                ? "/img/logo/logo-black.svg"
                : "/img/logo/logo-white.svg"
            }
            alt="Logo SFÉRA"
            className="w-[550px]"
          />
        </div>
      </div>
      <div
        className={`w-[130px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        }`}
      >
        <div
          className={`h-[130px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px]`}
        ></div>
        <div
          className={`h-[1419px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px]`}
        ></div>
      </div>
    </>
  );
};
