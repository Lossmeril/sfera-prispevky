import React, { useEffect, useMemo, useState } from "react";

interface DateTimeRangeInputProps {
  text: string;
  setText: (text: string) => void;
  setValid: (valid: boolean) => void;
  id?: string;
  label?: string;
  className?: string;
}

export const DateTimeRangeInput: React.FC<DateTimeRangeInputProps> = ({
  text,
  setText,
  setValid,
  id,
  label = "Datum a čas",
  className = "",
}) => {
  const [dateISO, setDateISO] = useState<string>(""); // YYYY-MM-DD

  type Span = { start: string; end: string };
  const [spans, setSpans] = useState<Span[]>([
    { start: "", end: "" },
    { start: "", end: "" },
    { start: "", end: "" },
  ]);

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

    return `${weekday} ${day}. ${month} ${year}`;
  };

  const formatTimeDot = (hhmm: string): string => {
    if (!hhmm) return "";
    const [hh, mm] = hhmm.split(":");
    if (hh == null || mm == null) return "";
    return `${hh}.${mm}`;
  };

  const spanToString = (span: Span): string => {
    const startPart = formatTimeDot(span.start);
    const endPart = formatTimeDot(span.end);
    if (!startPart) return "";
    if (endPart) return `${startPart}—${endPart}`;
    return startPart;
  };

  const buildOutput = (isoDate: string, allSpans: Span[]): string => {
    const datePart = formatCzechDate(isoDate);
    if (!datePart) return "";

    const renderedSpans = allSpans.map(spanToString).filter(Boolean);
    if (renderedSpans.length === 0) return datePart;

    return `${datePart} | ${renderedSpans.join(" | ")}`;
  };

  const isValid = useMemo(() => {
    // Valid if every span with both times respects start <= end
    for (const s of spans) {
      if (s.start && s.end && s.start > s.end) return false;
    }
    return true;
  }, [spans]);

  const output = useMemo(() => buildOutput(dateISO, spans), [dateISO, spans]);

  useEffect(() => {
    setValid(isValid);
  }, [isValid, setValid]);

  useEffect(() => {
    if (output !== text) setText(output);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output]);

  const setSpan = (index: number, patch: Partial<Span>) => {
    setSpans((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch };
      return next;
    });
  };

  const clearAll = () => {
    setDateISO("");
    setSpans([
      { start: "", end: "" },
      { start: "", end: "" },
      { start: "", end: "" },
    ]);
    setText("");
  };

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      <div className="grid grid-cols-1 gap-2">
        <input
          id={id}
          type="date"
          className="w-full border rounded-md p-2"
          value={dateISO}
          onChange={(e) => setDateISO(e.target.value)}
        />

        {/* Up to 3 spans */}
        {spans.map((span, idx) => {
          const spanInvalid = !!(
            span.start &&
            span.end &&
            span.start > span.end
          );

          return (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2"
              aria-label={`Časový úsek ${idx + 1}`}
            >
              <input
                type="time"
                className={`w-full border rounded-md p-2 ${
                  spanInvalid ? "border-red-500" : ""
                }`}
                value={span.start}
                onChange={(e) => setSpan(idx, { start: e.target.value })}
                step={60}
                placeholder="Od"
                aria-invalid={spanInvalid}
              />

              <input
                type="time"
                className={`w-full border rounded-md p-2 ${
                  spanInvalid ? "border-red-500" : ""
                }`}
                value={span.end}
                onChange={(e) => setSpan(idx, { end: e.target.value })}
                step={60}
                placeholder="Do"
                aria-invalid={spanInvalid}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-gray-600">
          <p>
            Výstup: <span className="font-medium">{output || "—"}</span>
          </p>
          {!isValid && (
            <p className="text-red-600 mt-1">
              Některý časový úsek má konec dříve než začátek.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={clearAll}
          className="bg-gray-100 hover:bg-gray-200 px-2 py-1 border rounded-md text-xs font-medium transition-all"
        >
          Vymazat
        </button>
      </div>
    </div>
  );
};
