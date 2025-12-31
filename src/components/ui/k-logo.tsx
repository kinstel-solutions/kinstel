import Link from "next/link";
import Image from "next/image";
import { AuroraText } from "./aurora-text";

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
        priority
        className="object-contain w-6 md:w-[35px] h-auto"
      />
      <span className="font-logo -ml-2 text-lg md:text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent animate-shimmer bg-[length:200%_100%]">
        INSTEL
      </span>
    </Link>
  );
}
