import { NextResponse } from "next/server";
import {
  FALLBACK,
  toLandingCohort,
  type LandingCohort,
  type OfferRow,
} from "@/lib/current-cohort-offer";

const OFFER_COLUMNS = [
  "cohort_name",
  "price_inr_paise",
  "price_usd_cents",
  "max_seats",
  "seats_left",
  "status",
  "start_label",
  "original_price_inr_paise",
  "original_price_usd_cents",
  "bonus_mastery_inr_paise",
  "bonus_mastery_usd_cents",
  "bonus_n8n_inr_paise",
  "bonus_n8n_usd_cents",
  "cohort_label",
  "price_increase_at",
] as const;

function readSupabaseEnv() {
  return {
    supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  };
}

async function loadOfferRow(): Promise<LandingCohort> {
  const { supabaseUrl, anonKey } = readSupabaseEnv();
  if (!supabaseUrl || !anonKey) throw new Error("Supabase env is not set");

  const url = new URL("/rest/v1/current_cohort_offer", supabaseUrl);
  url.searchParams.set("id", "eq.1");
  url.searchParams.set("select", OFFER_COLUMNS.join(","));

  const response = await fetch(url, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Offer request failed: ${response.status}`);
  const rows = (await response.json()) as OfferRow[];
  const row = rows[0];
  if (!row) throw new Error("Offer row is missing");
  return toLandingCohort(row);
}

export const dynamic = "force-dynamic";

export async function GET() {
  const { supabaseUrl, anonKey } = readSupabaseEnv();
  if (!supabaseUrl || !anonKey) {
    return NextResponse.json(FALLBACK, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    return NextResponse.json(await loadOfferRow(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Using fallback cohort copy:", error);
    return NextResponse.json(FALLBACK, { headers: { "Cache-Control": "no-store" } });
  }
}
