interface SupportFooterProps {
  className?: string;
  innerClassName?: string;
}

export default function SupportFooter({ className = 'support-footer', innerClassName }: SupportFooterProps) {
  return (
    <footer className={className}>
      <div className={innerClassName}>
        <p>
          © 2026 Approachable.dev. All rights reserved. For support, contact:{' '}
          <a href="mailto:ranbeer@gmail.com">ranbeer@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}
