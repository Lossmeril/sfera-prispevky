interface ScreenGridProps {
  mode?: "dark" | "light";
  children: React.ReactNode;
}

export const ScreenGridBasic: React.FC<ScreenGridProps> = ({
  children,
  mode = "dark",
}) => {
  return (
    <>
      <div
        className={`w-[75px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-2`}
      >
        <div
          className={`h-[65px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[850px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
      </div>
      <div
        className={`w-[1770px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        } border-r-2`}
      >
        <div
          className={`h-[65px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[850px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2 flex flex-col overflow-hidden`}
        >
          {children}
        </div>
        <div className="w-full h-[165px] grid place-content-center">
          <img
            src="/img/logo/logo-black.svg"
            alt="Logo SFERA"
            className="w-[385px]"
          />
        </div>
      </div>
      <div
        className={`w-[75px] h-full ${
          mode === "dark" ? "border-black" : "border-white"
        }`}
      >
        <div
          className={`h-[65px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[850px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
      </div>
    </>
  );
};
