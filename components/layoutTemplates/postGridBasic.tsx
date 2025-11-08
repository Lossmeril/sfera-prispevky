export interface GridProps {
  mode?: "dark" | "light";
  children: React.ReactNode;
}

export const PostGridSimple: React.FC<GridProps> = ({
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
          className={`h-[235px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[880px] w-full ${
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
          className={`h-[235px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[880px] w-full ${
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
          className={`h-[235px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
        <div
          className={`h-[880px] w-full ${
            mode === "dark" ? "border-black" : "border-white"
          } border-b-2`}
        ></div>
      </div>
    </>
  );
};
