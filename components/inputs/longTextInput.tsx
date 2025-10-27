interface LongTextInputProps {
  text: string;
  setText: (text: string) => void;
}

const LongTextInput = ({ text, setText }: LongTextInputProps) => {
  return (
    <div>
      <textarea
        className="w-full h-32 border rounded-md p-2 resize-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="flex flex-row gap-4 mt-2">
        <button
          onClick={() => setText(text + "¶")}
          className="bg-gray-100 hover:bg-gray-200 px-2 py-1 border rounded-md text-xs font-medium transition-all"
        >
          Vložit nový odstavec
        </button>
        <button
          onClick={() => setText(text + "↵")}
          className="bg-gray-100 hover:bg-gray-200 px-2 py-1 border rounded-md text-xs font-medium transition-all"
        >
          Zalomit řádek
        </button>
      </div>
    </div>
  );
};

export default LongTextInput;
