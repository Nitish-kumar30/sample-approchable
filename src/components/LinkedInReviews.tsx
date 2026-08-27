'use client';

export default function LinkedInReviews() {
  const openLightbox = (src: string) => {
    const fn = (window as unknown as Record<string, (s: string) => void>).__openLightbox;
    if (fn) fn(src);
  };

  return (
    <>
      <p className="linkedin-reviews-hint">Click any image to expand</p>
      <div className="linkedin-reviews-grid">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={n}
            src={`/img/linkedin-review-${n}.png`}
            alt={`LinkedIn review from cohort alumni ${n}`}
            className="linkedin-review-thumb"
            onClick={() => openLightbox(`/img/linkedin-review-${n}.png`)}
          />
        ))}
      </div>
    </>
  );
}
