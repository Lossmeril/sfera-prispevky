import React, { useEffect, useMemo, useState } from "react";

interface DateTimeRangeInputProps {
  text: string;
  setText: (text: string) => void;
  setValid: (valid: boolean) => void;
  id?: string;
  label?: string;
  className?: string;
}

/**
 * Outputs (Czech):
 * - "pátek 22. listopadu 2024 | 15.30—17.30"
 * - "pátek 22. listopadu 2024 | 15.30"
 * - "pátek 22. listopadu 2024"
 *
 * Assumptions:
 * - `text` is owned by parent via useState<string>
 * - This component always "drives" the string based on its internal fields.
 */

export const DateTimeRangeInput: React.FC<DateTimeRangeInputProps> = ({
  text,
  setText,
  setValid,
  id,
  label = "Datum a čas",
  className = "",
}) => {
  // Internal form values (HTML date/time inputs use ISO-ish strings)
  const [dateISO, setDateISO] = useState<string>(""); // YYYY-MM-DD
  const [startTime, setStartTime] = useState<string>(""); // HH:MM
  const [endTime, setEndTime] = useState<string>(""); // HH:MM

  // Czech locale formatting helpers
  const formatCzechDate = (isoDate: string): string => {
    const [yStr, mStr, dStr] = isoDate.split("-");
    const y = Number(yStr);
    const m = Number(mStr);
    const d = Number(dStr);
    if (!y || !m || !d) return "";

    const dt = new Date(y, m - 1, d);

    const parts = new Intl.DateTimeFormat("cs-CZ", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).formatToParts(dt);

    const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
    const day = parts.find((p) => p.type === "day")?.value ?? "";
    const month = parts.find((p) => p.type === "month")?.value ?? "";
    const year = parts.find((p) => p.type === "year")?.value ?? "";

    // Czech style: "pátek 22. listopadu 2024"
    return `${weekday} ${day}. ${month} ${year}`;
  };

  const formatTimeDot = (hhmm: string): string => {
    // "15:30" -> "15.30"
    if (!hhmm) return "";
    const [hh, mm] = hhmm.split(":");
    if (hh == null || mm == null) return "";
    return `${hh}.${mm}`;
  };

  const buildOutput = (isoDate: string, start: string, end: string): string => {
    const datePart = formatCzechDate(isoDate);
    if (!datePart) return "";

    const startPart = formatTimeDot(start);
    const endPart = formatTimeDot(end);

    if (startPart && endPart) return `${datePart} | ${startPart}—${endPart}`;
    if (startPart) return `${datePart} | ${startPart}`;
    return datePart;
  };

  // Keep output in sync with inputs
  const output = useMemo(
    () => buildOutput(dateISO, startTime, endTime),
    [dateISO, startTime, endTime],
  );

  const isValidTimeRange = useMemo(() => {
    if (!startTime || !endTime) return true;
    return startTime <= endTime;
  }, [startTime, endTime]);

  useEffect(() => {
    setValid(isValidTimeRange);
  }, [isValidTimeRange, setValid]);

  useEffect(() => {
    // Only update parent if it actually changed (avoids loops)
    if (output !== text) setText(output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output]);

  // Optional: basic sanity if end < start (same day)

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          id={id}
          type="date"
          className="w-full border rounded-md p-2"
          value={dateISO}
          onChange={(e) => setDateISO(e.target.value)}
        />

        <input
          type="time"
          className="w-full border rounded-md p-2"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          step={60} // minutes
        />

        <input
          type="time"
          className="w-full border rounded-md p-2"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          step={60} // minutes
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-600">
          Výstup: <span className="font-medium">{output || "—"}</span>
        </p>

        <button
          type="button"
          onClick={() => {
            setDateISO("");
            setStartTime("");
            setEndTime("");
            setText("");
          }}
          className="bg-gray-100 hover:bg-gray-200 px-2 py-1 border rounded-md text-xs font-medium transition-all"
        >
          Vymazat
        </button>
      </div>
    </div>
  );
};
