'use client';

import { useState, useEffect } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [count, setCount] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch('/api/subscribe')
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong');
        return;
      }

      setStatus('success');
      setCount(data.count);
      setEmail('');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong');
    }
  }

  return (
    <div
      className="rounded-xl p-5"
      style={{ backgroundColor: 'var(--bg-warm)', border: '1px solid var(--border)' }}
    >
      <h2 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        Stay in the loop
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
        Get notified about new posts and AI insights.
      </p>

      {status === 'success' ? (
        <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
          You&apos;re in! Thanks for subscribing.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg px-3 py-2 text-sm outline-none"
            style={{
              border: '1px solid var(--border)',
              backgroundColor: 'var(--bg)',
              color: 'var(--text-primary)',
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary text-sm"
            style={{ padding: '10px 16px' }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {status === 'error' && (
            <p className="text-xs" style={{ color: '#dc2626' }}>
              {errorMsg}
            </p>
          )}
        </form>
      )}

      {count !== null && count > 0 && (
        <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
          Join {count} {count === 1 ? 'other' : 'others'} who subscribed
        </p>
      )}
    </div>
  );
}
