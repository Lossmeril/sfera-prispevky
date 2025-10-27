export interface SectionProps {
  children: React.ReactNode;
}

export const MenuSection: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className="w-full lg:w-1/2 border-r border-black">{children}</div>
  );
};

export const MenuBlock: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className="w-full border-b border-black px-10 py-4">{children}</div>
  );
};

export const PreviewSection: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className="w-full lg:w-1/2 pointer-events-none max-h-screen overflow-hidden p-10 bg-gray-200">
      {children}
    </div>
  );
};
