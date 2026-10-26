import { Facility } from "@/utils/types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type UsageData = Record<string, unknown>;

// Uploaded files are logged as metadata only, the image itself can be several MB
export const describeFile = (file: File | null) =>
  file ? { name: file.name, type: file.type, size: file.size } : null;

// Facility 0 means "no facility selected"
export const describeFacility = (facilities: Facility[], facility: number) =>
  facility !== 0 ? (facilities[facility]?.name ?? null) : null;

// Logs a download into the Supabase "generator_usage" table.
// Fire-and-forget: a logging failure must never block the download.
export const logUsage = (
  preview: HTMLElement | null,
  data: UsageData = {},
): void => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !preview) return;

  const content = preview.innerText.trim();

  fetch(`${SUPABASE_URL}/rest/v1/generator_usage`, {
    method: "POST",
    keepalive: true,
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      created_at: new Date().toISOString(),
      template: window.location.pathname,
      content,
      data,
    }),
  }).catch((err) => console.error("Usage logging failed:", err));
};
