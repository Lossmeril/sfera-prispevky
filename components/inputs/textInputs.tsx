interface TextInputProps {
  text: string;
  setText: (text: string) => void;
  placeholder?: string;
  id?: string;
  displayMDashButton?: boolean;
}

export const TextInput = ({
  text,
  setText,
  placeholder,
  id,
  displayMDashButton = false,
}: TextInputProps) => {
  return (
    <>
      <input
        type="text"
        className="w-full border rounded-md p-2 mb-1"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        id={id}
      />
      {displayMDashButton && (
        <button
          onClick={() => setText(text + "—")}
          className="bg-gray-100 hover:bg-gray-200 px-2 py-1 border rounded-md text-xs font-medium transition-all"
        >
          Vložit dlouhou pomlčku
        </button>
      )}
    </>
  );
};

interface LongTextInputProps {
  text: string;
  setText: (text: string) => void;
  placeholder?: string;
  id?: string;
}

const LongTextInput = ({
  text,
  setText,
  id,
  placeholder,
}: LongTextInputProps) => {
  return (
    <div>
      <textarea
        className="w-full h-32 border rounded-md p-2 resize-none"
        value={text}
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        id={id}
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
        <button
          onClick={() => setText(text + "—")}
          className="bg-gray-100 hover:bg-gray-200 px-2 py-1 border rounded-md text-xs font-medium transition-all"
        >
          Vložit dlouhou pomlčku
        </button>
      </div>
    </div>
  );
};

export default LongTextInput;
