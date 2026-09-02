'use client';

export default function AdminSecretForm() {
  return (
    <form
      className="admin-secret-form"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const secret = new FormData(form).get('secret');
        if (typeof secret !== 'string' || !secret.trim()) return;
        const url = new URL(window.location.href);
        url.searchParams.set('secret', secret.trim());
        window.location.href = url.toString();
      }}
    >
      <label className="admin-secret-label" htmlFor="admin-secret">Admin secret</label>
      <div className="admin-secret-row">
        <input
          id="admin-secret"
          name="secret"
          type="password"
          className="admin-secret-input"
          placeholder="Enter admin secret"
          autoComplete="current-password"
        />
        <button type="submit" className="btn-primary admin-secret-btn">View submissions</button>
      </div>
    </form>
  );
}
