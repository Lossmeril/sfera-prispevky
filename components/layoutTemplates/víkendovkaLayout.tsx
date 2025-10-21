interface VíkendovkaLayoutProps {
  children: React.ReactNode;
}

const VíkendovkaLayout: React.FC<VíkendovkaLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="w-[1920px] h-[1080px] bg-black">{children}</div>
    </>
  );
};

export default VíkendovkaLayout;
