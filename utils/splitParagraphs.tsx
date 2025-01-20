interface SplitParagraphProps {
  text: string;
  cssStyles: string;
}

const SplitParagraph: React.FC<SplitParagraphProps> = ({ text, cssStyles }) => {
  // Function to split the text into an array of segments at "n-"
  const splitText = (inputText: string): string[] => {
    return inputText.split(/n-/);
  };

  // Function to replace "p-" with a <br /> element
  const processSegment = (segment: string): React.ReactNode[] => {
    const parts = segment.split(/p-/);
    return parts.flatMap((part, index) =>
      index < parts.length - 1 ? [part, <br key={`br-${index}`} />] : [part]
    );
  };

  const segments = splitText(text);

  return (
    <div>
      {segments.map((segment, index) => (
        <p key={index} className={cssStyles}>
          {processSegment(segment)}
        </p>
      ))}
    </div>
  );
};

export default SplitParagraph;
