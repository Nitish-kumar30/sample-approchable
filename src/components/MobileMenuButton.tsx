interface MobileMenuButtonProps {
  open: boolean;
  onClick: () => void;
  controlsId: string;
  className?: string;
}

export default function MobileMenuButton({ open, onClick, controlsId, className = '' }: MobileMenuButtonProps) {
  return (
    <button
      type="button"
      className={`header-menu-btn${className ? ` ${className}` : ''}`}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls={controlsId}
      onClick={onClick}
    >
      {open ? (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M5 5l10 10M15 5L5 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
