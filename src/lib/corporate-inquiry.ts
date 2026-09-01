export const FORM_TYPE = 'corporate-training-inquiry';

export type CorporateInquiryFields = {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  teamSize: string;
  industry: string;
  timing: string;
  requirements: string;
};

export type CorporateInquiryRecord = CorporateInquiryFields & {
  id: string;
  formType: typeof FORM_TYPE;
  submittedAt: string;
  meta: {
    source: string;
    userAgent?: string;
  };
};

type ValidationSuccess = { ok: true; data: CorporateInquiryFields };
type ValidationFailure = { ok: false; errors: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateCorporateInquiry(body: unknown): ValidationSuccess | ValidationFailure {
  if (!body || typeof body !== 'object') {
    return { ok: false, errors: { form: 'Invalid submission payload' } };
  }

  const raw = body as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const company = asString(raw.company);
  const contactName = asString(raw.contactName);
  const email = asString(raw.email);
  const phone = asString(raw.phone);
  const teamSize = asString(raw.teamSize);
  const industry = asString(raw.industry);
  const timing = asString(raw.timing);
  const requirements = asString(raw.requirements);

  if (!company) errors.company = 'Company name is required';
  if (!contactName) errors.contactName = 'Contact name is required';
  if (!email) errors.email = 'Email is required';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address';
  if (!teamSize) errors.teamSize = 'Select a team size';
  if (!industry) errors.industry = 'Industry is required';
  if (!requirements) errors.requirements = 'Please describe your requirements';

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      company,
      contactName,
      email,
      phone,
      teamSize,
      industry,
      timing,
      requirements,
    },
  };
}

export function isHoneypotTriggered(body: unknown): boolean {
  if (!body || typeof body !== 'object') return false;
  const honeypot = (body as Record<string, unknown>)._honeypot;
  return typeof honeypot === 'string' && honeypot.trim().length > 0;
}
