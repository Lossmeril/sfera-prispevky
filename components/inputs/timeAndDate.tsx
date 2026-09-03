import React, { useEffect, useMemo, useState } from "react";

import {
  DAYS,
  DayKey,
  FREQUENCY_LABELS,
  FREQUENCY_ORDER,
  Frequency,
  buildRecurrenceString,
  dayNominative,
} from "@/utils/czechRecurrence";

interface DateTimeRangeInputProps {
  text: string;
  setText: (text: string) => void;
  setValid: (valid: boolean) => void;
  id?: string;
  label?: string;
  className?: string;
}

type Mode = "once" | "recurring";

type Span = { start: string; end: string };

const EMPTY_SPANS: Span[] = [
  { start: "", end: "" },
  { start: "", end: "" },
  { start: "", end: "" },
];

// -------------------------------------------------------------------------
// Czech date formatting (one-off mode)
// -------------------------------------------------------------------------

// cs-CZ with a day number present yields the genitive month ("4. září",
// "2. ledna"), which is exactly what a date phrase needs.
const dateParts = (isoDate: string, withWeekday: boolean) => {
  const [y, m, d] = isoDate.split("-").map(Number);
  if (!y || !m || !d) return null;

  const dt = new Date(y, m - 1, d);
  const parts = new Intl.DateTimeFormat("cs-CZ", {
    weekday: withWeekday ? "long" : undefined,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(dt);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return {
    weekday: get("weekday"),
    day: get("day"),
    month: get("month"),
    year: get("year"),
  };
};

const formatCzechDate = (isoDate: string): string => {
  const p = dateParts(isoDate, true);
  if (!p) return "";
  return `${p.weekday} ${p.day}. ${p.month} ${p.year}`;
};

const formatCzechDateRange = (startISO: string, endISO: string): string => {
  if (!startISO) return "";
  if (!endISO || endISO === startISO || startISO > endISO)
    return formatCzechDate(startISO);

  const a = dateParts(startISO, false);
  const b = dateParts(endISO, false);
  if (!a || !b) return formatCzechDate(startISO);

  // "4.–6. září 2025"
  if (a.year === b.year && a.month === b.month)
    return `${a.day}.–${b.day}. ${b.month} ${b.year}`;

  // "30. srpna – 2. září 2025"
  if (a.year === b.year)
    return `${a.day}. ${a.month} – ${b.day}. ${b.month} ${b.year}`;

  // "30. prosince 2025 – 2. ledna 2026"
  return `${a.day}. ${a.month} ${a.year} – ${b.day}. ${b.month} ${b.year}`;
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

// "18.00—20.00 | 21.00" — the rendered time part shared by both modes.
const spansToString = (spans: Span[]): string =>
  spans.map(spanToString).filter(Boolean).join(" | ");

// Glue a date/recurrence phrase together with its time part.
const withTimes = (datePart: string, spans: Span[]): string => {
  if (!datePart) return "";
  const timePart = spansToString(spans);
  return timePart ? `${datePart} | ${timePart}` : datePart;
};

// -------------------------------------------------------------------------

export const DateTimeRangeInput: React.FC<DateTimeRangeInputProps> = ({
  text,
  setText,
  setValid,
  id,
  label = "Datum a čas",
  className = "",
}) => {
  const [mode, setMode] = useState<Mode>("once");

  // one-off mode
  const [startISO, setStartISO] = useState<string>("");
  const [endISO, setEndISO] = useState<string>("");

  // recurring mode
  const [frequency, setFrequency] = useState<Frequency>("every");
  const [days, setDays] = useState<DayKey[]>([]);

  // shared by both modes
  const [spans, setSpans] = useState<Span[]>(EMPTY_SPANS);

  const spanOrderInvalid = useMemo(
    () => spans.some((s) => s.start && s.end && s.start > s.end),
    [spans],
  );
  const hasAnyTime = useMemo(() => spans.some((s) => !!s.start), [spans]);
  const rangeOrderInvalid = !!startISO && !!endISO && endISO < startISO;

  // Is the "what" part (date / weekdays) filled in for the active mode?
  const subjectFilled = mode === "once" ? !!startISO : days.length > 0;

  const isValid =
    subjectFilled && hasAnyTime && !spanOrderInvalid && !rangeOrderInvalid;

  const output = useMemo(() => {
    const datePart =
      mode === "once"
        ? formatCzechDateRange(startISO, endISO)
        : buildRecurrenceString(frequency, days);
    return withTimes(datePart, spans);
  }, [mode, startISO, endISO, frequency, days, spans]);

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

  const toggleDay = (key: DayKey) => {
    setDays((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const clearAll = () => {
    setStartISO("");
    setEndISO("");
    setSpans(EMPTY_SPANS);
    setFrequency("every");
    setDays([]);
    setText("");
  };

  const tabClass = (active: boolean) =>
    `flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
      active ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
    }`;

  // Up to 3 time spans; at least one is required in both modes.
  const timeFields = (
    <div className="grid grid-cols-1 gap-2 mt-2">
      <span className="block text-xs text-gray-600">Čas (alespoň jeden)</span>
      {spans.map((span, idx) => {
        const spanInvalid = !!(span.start && span.end && span.start > span.end);

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
  );

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}

      {/* Mode switch */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-md mb-3">
        <button
          type="button"
          className={tabClass(mode === "once")}
          aria-pressed={mode === "once"}
          onClick={() => setMode("once")}
        >
          Jednorázově
        </button>
        <button
          type="button"
          className={tabClass(mode === "recurring")}
          aria-pressed={mode === "recurring"}
          onClick={() => setMode("recurring")}
        >
          Opakovaně
        </button>
      </div>

      {mode === "once" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <span className="block text-xs text-gray-600 mb-1">Od data</span>
            <input
              id={id}
              type="date"
              className={`w-full border rounded-md p-2 ${
                rangeOrderInvalid ? "border-red-500" : ""
              }`}
              value={startISO}
              onChange={(e) => setStartISO(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">
              Do data (volitelné)
            </label>
            <input
              type="date"
              className={`w-full border rounded-md p-2 ${
                rangeOrderInvalid ? "border-red-500" : ""
              }`}
              value={endISO}
              min={startISO || undefined}
              onChange={(e) => setEndISO(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label
              htmlFor={id ? `${id}-frequency` : undefined}
              className="block text-xs text-gray-600 mb-1"
            >
              Frekvence
            </label>
            <select
              id={id ? `${id}-frequency` : undefined}
              className="w-full border rounded-md p-2 bg-white"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as Frequency)}
            >
              {FREQUENCY_ORDER.map((f) => (
                <option key={f} value={f}>
                  {FREQUENCY_LABELS[f]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-xs text-gray-600 mb-1">
              Dny v týdnu (lze vybrat více)
            </span>
            <div className="flex flex-wrap gap-1">
              {DAYS.map((d) => {
                const active = days.includes(d.key);
                return (
                  <button
                    key={d.key}
                    type="button"
                    aria-pressed={active}
                    aria-label={dayNominative(d.key)}
                    onClick={() => toggleDay(d.key)}
                    className={`w-11 py-1.5 text-sm font-medium border rounded-md transition-all ${
                      active
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {d.short}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {timeFields}

      <div className="flex items-start justify-between mt-2 gap-3">
        <div className="text-xs text-gray-600">
          <p>
            Výstup: <span className="font-medium">{output || "—"}</span>
          </p>
          {rangeOrderInvalid && (
            <p className="text-red-600 mt-1">
              Konec rozsahu je dříve než jeho začátek.
            </p>
          )}
          {spanOrderInvalid && (
            <p className="text-red-600 mt-1">
              Některý časový úsek má konec dříve než začátek.
            </p>
          )}
          {mode === "recurring" && days.length === 0 && (
            <p className="text-red-600 mt-1">Vyberte alespoň jeden den.</p>
          )}
          {subjectFilled && !hasAnyTime && (
            <p className="text-red-600 mt-1">Zadejte alespoň jeden čas.</p>
          )}
        </div>

        <button
          type="button"
          onClick={clearAll}
          className="bg-gray-100 hover:bg-gray-200 px-2 py-1 border rounded-md text-xs font-medium transition-all shrink-0"
        >
          Vymazat
        </button>
      </div>
    </div>
  );
};
