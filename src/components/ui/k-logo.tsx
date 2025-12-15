import Link from "next/link";
import Image from "next/image";

export function KLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-0">
      <Image
        src="/K-Logo.svg"
        alt="Kinstel Logo"
        width={35}
        height={30}
        className="object-contain"
      />
      <span className="font-logo -ml-2 text-2xl tracking-wide">INSTEL</span>
    </Link>
  );
}
