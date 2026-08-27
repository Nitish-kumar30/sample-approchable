interface ExploreMoreCardProps {
  variant: 'free' | 'paid';
}

const EXPLORE_URLS = {
  free: 'https://learn.approachable.dev/courses?tab=free',
  paid: 'https://learn.approachable.dev/courses',
} as const;

export default function ExploreMoreCard({ variant }: ExploreMoreCardProps) {
  const isFree = variant === 'free';

  return (
    <a
      href={EXPLORE_URLS[variant]}
      className="course-card-v2 explore-more-card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="explore-more-banner" aria-hidden="true">
        <div className="explore-more-banner-inner">
          <span className="explore-more-plus">+</span>
          <span className="explore-more-label">More courses</span>
        </div>
      </div>

      <div className="course-card-body">
        <h3 className="course-card-title">Explore More</h3>
        <p className="course-card-desc">See all courses on our learning platform.</p>

        <div className="course-card-bottom">
          <div className="course-card-meta" />

          <span className={`course-card-footer${isFree ? ' course-card-footer-free' : ' course-card-footer-paid'}`}>
            Browse courses →
          </span>
        </div>
      </div>
    </a>
  );
}
