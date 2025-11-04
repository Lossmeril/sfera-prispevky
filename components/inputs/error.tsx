interface errorProps {
  errors: string[];
}

const ErrorDisplay: React.FC<errorProps> = ({ errors }) => {
  return (
    <div className="flex flex-col gap-1 text-xs italic text-red-600/50 ml-2">
      {errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  );
};
export default ErrorDisplay;
