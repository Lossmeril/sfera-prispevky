interface PostGridProps {
  children: React.ReactNode;
}

const PostGrid: React.FC<PostGridProps> = ({ children }) => {
  return (
    <>
      <div className="w-[100px] h-full border-black border-r-2">
        <div className="h-[235px] w-full border-black border-b-2"></div>
        <div className="h-[880px] w-full border-black border-b-2"></div>
      </div>
      <div className="w-[880px] h-full border-black border-r-2">
        <div className="h-[235px] w-full border-black border-b-2"></div>
        <div className="h-[880px] w-full border-black border-b-2 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
      <div className="w-[100px] h-full border-black ">
        <div className="h-[235px] w-full border-black border-b-2"></div>
        <div className="h-[880px] w-full border-black border-b-2"></div>
      </div>
    </>
  );
};

export default PostGrid;
