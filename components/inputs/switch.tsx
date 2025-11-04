interface switchProps {
  enabled: boolean;
  onToggle: () => void;
  id?: string;
}

export const Switch: React.FC<switchProps> = ({ enabled, onToggle, id }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={onToggle}
      className={`${
        enabled ? "bg-blue-600" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
      id={id}
    >
      <span
        className={`${
          enabled ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  );
};
