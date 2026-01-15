import { GridProps } from "./postGridBasic";

interface PosterGridProps extends GridProps {
  sideText?: string;
}

export const PosterGrid: React.FC<PosterGridProps> = ({
  children,
  mode = "dark",
  sideText,
}) => {
  return (
    <>
      <div
        className={`w-[155px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-[3px]`}
      >
        <div
          className={`h-[115px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px]`}
        ></div>
        <div
          className={`h-[2186px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px] relative`}
        >
          <p
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 w-[2186px] text-center text-4xl font-medium ${mode === "dark" ? "text-black" : "text-white"}`}
          >
            {sideText}
          </p>
        </div>
      </div>
      <div
        className={`w-[1476px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-[3px]`}
      >
        <div
          className={`h-[115px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px]`}
        ></div>
        <div
          className={`h-[2186px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px] flex flex-col overflow-hidden`}
        >
          {children}
        </div>
        <div className="w-full h-[225px] grid place-content-center">
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
        className={`w-[155px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        }`}
      >
        <div
          className={`h-[115px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px]`}
        ></div>
        <div
          className={`h-[2186px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-[3px] relative`}
        >
          <p
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-90 w-[2186px] text-center text-4xl font-medium ${mode === "dark" ? "text-black" : "text-white"}`}
          >
            Vzdělávací centrum SFÉRA Pardubice
          </p>
        </div>
      </div>
    </>
  );
};
