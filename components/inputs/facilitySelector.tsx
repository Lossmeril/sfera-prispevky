import LoadingSkeleton from "../loadingSkeleton";

interface FacilitySelectorProps {
  facilities: { id: number; name: string }[];
  facility: number;
  setFacility: (id: number) => void;
  loading: boolean;
}

const FacilitySelector: React.FC<FacilitySelectorProps> = ({
  facilities,
  facility,
  setFacility,
  loading,
}) => {
  return (
    <div className="w-full mt-2">
      {loading && <LoadingSkeleton height="h-10" />}
      {facilities.length === 0 && !loading && (
        <p>Žádné místnosti nejsou k dispozici.</p>
      )}
      {facilities.length > 0 && (
        <select
          className="border p-2 w-full rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
          value={facility}
          onChange={(e) => setFacility(Number(e.target.value))}
        >
          <option value={0}>-- Žádná specifická dílna/laboratoř --</option>
          {facilities
            .filter((facility) => facility.id !== 0)
            .map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default FacilitySelector;
