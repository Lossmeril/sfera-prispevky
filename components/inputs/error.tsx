interface errorProps {
  errors: string[];
}

const ErrorDisplay: React.FC<errorProps> = ({ errors }) => {
  return (
    <ul className="text-xs italic ml-4 text-red-600 ">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  );
};
export default ErrorDisplay;
