interface PostGridProps {
  mode?: "dark" | "light";
  children: React.ReactNode;
}

export const PosterSignGrid: React.FC<PostGridProps> = ({
  children,
  mode = "dark",
}) => {
  return (
    <>
      <div
        className={`w-[130px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-2`}
      >
        <div
          className={`h-[130px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[1419px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
      </div>
      <div
        className={`w-[2266px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-2`}
      >
        <div
          className={`h-[130px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[1419px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2 flex flex-col overflow-hidden`}
        >
          {children}
        </div>
        <div className="w-full h-[237px] grid place-content-center">
          <img
            src="/img/logo/logo-black.svg"
            alt="Logo SFERA"
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
          } border-b-2`}
        ></div>
        <div
          className={`h-[1419px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
      </div>
    </>
  );
};
