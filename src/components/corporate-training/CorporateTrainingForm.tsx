'use client';

import { useState, type FormEvent } from 'react';
import styles from '@/app/corporate-training/corporate-training.module.css';
import type { CorporateInquiryFields } from '@/lib/corporate-inquiry';
import { validateCorporateInquiry } from '@/lib/corporate-inquiry';

const TIERS = ['CxO', 'Director', 'Management', 'Middle Manager'] as const;

const CONTACT_EMAIL = 'ranbeer@bigintsolutions.com';

type FormErrors = Partial<Record<keyof CorporateInquiryFields, string>>;

const INITIAL: CorporateInquiryFields = {
  company: '',
  contactName: '',
  email: '',
  phone: '',
  teamSize: '',
  tiers: [],
  industry: '',
  timing: '',
  requirements: '',
};

function focusFieldId(field: string): string {
  if (field === 'tiers') return 'tier-fieldset';
  if (field === 'teamSize') return 'teamSize';
  return field;
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className={styles.formError} role="alert">
      {error}
    </p>
  );
}

export default function CorporateTrainingForm() {
  const [form, setForm] = useState<CorporateInquiryFields>(INITIAL);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const surfaceClass = styles.inquiryFormHighContrast;

  function updateField<K extends keyof CorporateInquiryFields>(key: K, value: CorporateInquiryFields[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
    if (submitError) setSubmitError('');
  }

  function toggleTier(tier: string) {
    setForm((prev) => {
      const tiers = prev.tiers.includes(tier)
        ? prev.tiers.filter((t) => t !== tier)
        : [...prev.tiers, tier];
      return { ...prev, tiers };
    });
    if (errors.tiers) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.tiers;
        return next;
      });
    }
    if (submitError) setSubmitError('');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError('');

    const validation = validateCorporateInquiry(form);
    if (!validation.ok) {
      setErrors(validation.errors as FormErrors);
      const firstKey = Object.keys(validation.errors)[0];
      if (firstKey) {
        document.getElementById(focusFieldId(firstKey))?.focus();
      }
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, _honeypot: honeypot }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (data?.errors && typeof data.errors === 'object') {
          setErrors(data.errors as FormErrors);
        }
        setSubmitError(
          typeof data?.error === 'string'
            ? data.error
            : 'Something went wrong. Please try again or email us directly.',
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError('Network error. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className={`${styles.formSuccess} ${surfaceClass}`}>
        <h3>Thanks — we received your inquiry.</h3>
        <p>
          We&apos;ll come back with a tailored outline and dates within a few days. If you need to
          reach us directly, email{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <button
          type="button"
          className={`${styles.btn} ${styles.btnGhost}`}
          onClick={() => {
            setForm(INITIAL);
            setHoneypot('');
            setErrors({});
            setSubmitError('');
            setSubmitted(false);
          }}
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form className={`${styles.inquiryForm} ${surfaceClass}`} onSubmit={handleSubmit}>
      {submitError && (
        <p className={styles.formSubmitError} role="alert">
          {submitError}
        </p>
      )}

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="_honeypot">Leave this field empty</label>
        <input
          id="_honeypot"
          type="text"
          name="_honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="company">Company name</label>
          <input
            id="company"
            type="text"
            placeholder="Your organization"
            value={form.company}
            disabled={loading}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={errors.company ? 'company-error' : undefined}
            onChange={(e) => updateField('company', e.target.value)}
          />
          <FieldError id="company-error" error={errors.company} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="contactName">Contact name</label>
          <input
            id="contactName"
            type="text"
            placeholder="Your full name"
            value={form.contactName}
            disabled={loading}
            aria-invalid={errors.contactName ? true : undefined}
            aria-describedby={errors.contactName ? 'contactName-error' : undefined}
            onChange={(e) => updateField('contactName', e.target.value)}
          />
          <FieldError id="contactName-error" error={errors.contactName} />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={form.email}
            disabled={loading}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'email-error' : undefined}
            onChange={(e) => updateField('email', e.target.value)}
          />
          <FieldError id="email-error" error={errors.email} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="phone">Phone (optional)</label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 555 000 0000"
            value={form.phone}
            disabled={loading}
            onChange={(e) => updateField('phone', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formField}>
          <label htmlFor="teamSize">Approx. team size</label>
          <select
            id="teamSize"
            required
            value={form.teamSize}
            disabled={loading}
            aria-invalid={errors.teamSize ? true : undefined}
            aria-describedby={errors.teamSize ? 'teamSize-error' : undefined}
            onChange={(e) => updateField('teamSize', e.target.value)}
          >
            <option value="">Select team size</option>
            <option value="5–10">5–10 people</option>
            <option value="11–25">11–25 people</option>
            <option value="26–50">26–50 people</option>
            <option value="51–100">51–100 people</option>
            <option value="100+">100+ people</option>
          </select>
          <FieldError id="teamSize-error" error={errors.teamSize} />
        </div>
        <div className={styles.formField}>
          <label htmlFor="industry">Industry</label>
          <input
            id="industry"
            type="text"
            placeholder="e.g. Retail, Financial Services"
            value={form.industry}
            disabled={loading}
            aria-invalid={errors.industry ? true : undefined}
            aria-describedby={errors.industry ? 'industry-error' : undefined}
            onChange={(e) => updateField('industry', e.target.value)}
          />
          <FieldError id="industry-error" error={errors.industry} />
        </div>
      </div>

      <fieldset
        id="tier-fieldset"
        className={styles.tierFieldset}
        disabled={loading}
        aria-invalid={errors.tiers ? true : undefined}
        aria-describedby={errors.tiers ? 'tiers-error' : undefined}
      >
        <legend className={styles.formLabel}>Tiers to include</legend>
        <div className={styles.tierChecks}>
          {TIERS.map((tier) => (
            <label key={tier} className={styles.tierCheck}>
              <input
                type="checkbox"
                checked={form.tiers.includes(tier)}
                onChange={() => toggleTier(tier)}
              />
              <span>{tier}</span>
            </label>
          ))}
        </div>
        <FieldError id="tiers-error" error={errors.tiers} />
      </fieldset>

      <div className={styles.formField}>
        <label htmlFor="timing">Preferred timing</label>
        <input
          id="timing"
          type="text"
          placeholder="e.g. Q2 2026, flexible"
          value={form.timing}
          disabled={loading}
          onChange={(e) => updateField('timing', e.target.value)}
        />
      </div>

      <div className={styles.formField}>
        <label htmlFor="requirements">Company requirements &amp; goals</label>
        <textarea
          id="requirements"
          rows={5}
          placeholder="Tell us about your team's current AI experience, specific use cases you want covered, format preferences (virtual vs on-site), and any other requirements."
          value={form.requirements}
          disabled={loading}
          aria-invalid={errors.requirements ? true : undefined}
          aria-describedby={errors.requirements ? 'requirements-error' : undefined}
          onChange={(e) => updateField('requirements', e.target.value)}
        />
        <FieldError id="requirements-error" error={errors.requirements} />
      </div>

      <button type="submit" className={`${styles.btn} ${styles.btnAccent}`} disabled={loading}>
        {loading ? 'Sending…' : 'Send inquiry →'}
      </button>
    </form>
  );
}
