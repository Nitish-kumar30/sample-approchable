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
      className={`header-menu-btn${open ? ' header-menu-btn--open' : ''}${className ? ` ${className}` : ''}`}
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-controls={controlsId}
      onClick={onClick}
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          className="header-menu-btn-line header-menu-btn-line-top"
          d="M3 5h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="header-menu-btn-line header-menu-btn-line-mid"
          d="M3 10h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          className="header-menu-btn-line header-menu-btn-line-bot"
          d="M3 15h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
