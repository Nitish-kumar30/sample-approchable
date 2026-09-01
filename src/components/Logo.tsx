import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="logo-wrap">
      <Image src="/logo.png" alt="Approachable" width={43} height={43} priority />
      <div>
        <div className="logo-name">Approachable</div>
        <div className="logo-sub">making AI approachable for everyone</div>
      </div>
    </Link>
  );
}
