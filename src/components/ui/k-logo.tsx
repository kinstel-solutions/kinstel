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
        className="object-contain"
      />
      <AuroraText
        colors={["#F59E0B", "#D97706", "#FCD34D", "#F59E0B"]}
        className="font-logo -ml-2 text-2xl tracking-wide">
        INSTEL
      </AuroraText>
    </Link>
  );
}
