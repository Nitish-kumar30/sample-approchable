import { unstable_cache } from 'next/cache';
import { COHORT } from '@/lib/cohort-config';

export type LandingCohort = {
  cohortName: string;
  waitlist: boolean;
  soldOut: boolean;
  priceInr: string;
  priceUsd: string;
  priceInrAmount: string;
  priceUsdAmount: string;
  originalInr: string;
  originalUsd: string;
  discountLabel: string;
  seatsLeft: number;
  maxSeats: number;
  startLabel: string;
  cohortLabel: string;
  bonusMasteryInr: string;
  bonusMasteryUsd: string;
  bonusN8nInr: string;
  bonusN8nUsd: string;
};

const OFFER_TAG = 'current-cohort-offer';

const FALLBACK: LandingCohort = {
  cohortName: 'Cohort Waitlist',
  waitlist: false,
  soldOut: COHORT.state === 'soldout',
  priceInr: COHORT.priceIndiaLate,
  priceUsd: COHORT.priceIntlLate,
  priceInrAmount: '9999',
  priceUsdAmount: '169',
  originalInr: COHORT.originalPriceIndia,
  originalUsd: COHORT.originalPriceIntl,
  discountLabel: 'save 50%',
  seatsLeft: COHORT.seatsLeft,
  maxSeats: COHORT.seatsTotal,
  startLabel: COHORT.dateShort,
  cohortLabel: 'Cohort 8',
  bonusMasteryInr: '₹1,500',
  bonusMasteryUsd: '$70',
  bonusN8nInr: '₹3,000',
  bonusN8nUsd: '$99',
};

type OfferRow = {
  cohort_name?: string | null;
  price_inr_paise?: number | null;
  price_usd_cents?: number | null;
  max_seats?: number | null;
  seats_left?: number | null;
  status?: string | null;
  start_label?: string | null;
  original_price_inr_paise?: number | null;
  original_price_usd_cents?: number | null;
  discount_label?: string | null;
  bonus_mastery_inr_paise?: number | null;
  bonus_mastery_usd_cents?: number | null;
  bonus_n8n_inr_paise?: number | null;
  bonus_n8n_usd_cents?: number | null;
  cohort_label?: string | null;
};

function formatInr(paise: number | null | undefined, fallback: string): string {
  if (!paise || paise <= 0) return fallback;
  return `₹${Math.round(paise / 100).toLocaleString('en-IN')}`;
}

function formatUsd(cents: number | null | undefined, fallback: string): string {
  if (!cents || cents <= 0) return fallback;
  return `$${Math.round(cents / 100).toLocaleString('en-US')}`;
}

function amount(minor: number | null | undefined, fallback: string): string {
  if (!minor || minor <= 0) return fallback;
  return String(Math.round(minor / 100));
}

function discountFromPrices(current: number | null | undefined, original: number | null | undefined): string {
  if (!current || !original || original <= current) return '';
  const percent = Math.round((1 - current / original) * 100);
  return percent > 0 ? `save ${percent}%` : '';
}

function toLandingCohort(row: OfferRow): LandingCohort {
  const cohortName = row.cohort_name?.trim() || FALLBACK.cohortName;
  const customDiscount = row.discount_label?.trim();
  return {
    cohortName,
    waitlist: /waitlist/i.test(cohortName),
    soldOut: row.status === 'soldout',
    priceInr: formatInr(row.price_inr_paise, FALLBACK.priceInr),
    priceUsd: formatUsd(row.price_usd_cents, FALLBACK.priceUsd),
    priceInrAmount: amount(row.price_inr_paise, FALLBACK.priceInrAmount),
    priceUsdAmount: amount(row.price_usd_cents, FALLBACK.priceUsdAmount),
    originalInr: formatInr(row.original_price_inr_paise, ''),
    originalUsd: formatUsd(row.original_price_usd_cents, ''),
    discountLabel: customDiscount || discountFromPrices(row.price_inr_paise, row.original_price_inr_paise),
    seatsLeft: row.seats_left ?? FALLBACK.seatsLeft,
    maxSeats: row.max_seats ?? FALLBACK.maxSeats,
    startLabel: row.start_label?.trim() || FALLBACK.startLabel,
    cohortLabel: row.cohort_label?.trim() || FALLBACK.cohortLabel,
    bonusMasteryInr: formatInr(row.bonus_mastery_inr_paise, ''),
    bonusMasteryUsd: formatUsd(row.bonus_mastery_usd_cents, ''),
    bonusN8nInr: formatInr(row.bonus_n8n_inr_paise, ''),
    bonusN8nUsd: formatUsd(row.bonus_n8n_usd_cents, ''),
  };
}

async function loadOfferRow(): Promise<LandingCohort> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !anonKey) throw new Error('Supabase env is not set');

  const url = new URL('/rest/v1/current_cohort_offer', supabaseUrl);
  url.searchParams.set('id', 'eq.1');
  url.searchParams.set(
    'select',
    [
      'cohort_name',
      'price_inr_paise',
      'price_usd_cents',
      'max_seats',
      'seats_left',
      'status',
      'start_label',
      'original_price_inr_paise',
      'original_price_usd_cents',
      'discount_label',
      'bonus_mastery_inr_paise',
      'bonus_mastery_usd_cents',
      'bonus_n8n_inr_paise',
      'bonus_n8n_usd_cents',
      'cohort_label',
    ].join(','),
  );

  const response = await fetch(url, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
  });
  if (!response.ok) throw new Error(`Offer request failed: ${response.status}`);
  const rows = (await response.json()) as OfferRow[];
  const row = rows[0];
  if (!row) throw new Error('Offer row is missing');
  return toLandingCohort(row);
}

const getCachedOffer = unstable_cache(loadOfferRow, ['current-cohort-offer'], {
  tags: [OFFER_TAG],
});

export async function getLandingCohort(): Promise<LandingCohort> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return FALLBACK;
  }
  try {
    return await getCachedOffer();
  } catch (error) {
    console.error('Using fallback cohort copy:', error);
    return FALLBACK;
  }
}
