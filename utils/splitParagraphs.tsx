interface SplitParagraphProps {
  text: string;
  cssStyles: string;
}

const SplitParagraph: React.FC<SplitParagraphProps> = ({ text, cssStyles }) => {
  // Split paragraphs by p-
  const splitText = (inputText: string): string[] => {
    return inputText.split(/p-/);
  };

  // Replace n- with a line break
  const processSegment = (segment: string): React.ReactNode[] => {
    const parts = segment.split(/n-/);
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
