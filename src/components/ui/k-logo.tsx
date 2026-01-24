import Link from "next/link";
import Image from "next/image";
import { AuroraText } from "./aurora-text";

export function KLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-0">
      <Image
        src="/Kinstel_logo-G Font.svg"
        alt="Kinstel Logo"
        width={400}
        height={400}
        priority
        className="object-contain w-[100px]  md:w-[120px] h-auto"
      />
      {/* Kinstel hallow Letters */}
      {/* <AuroraText
        colors={["#F59E0B", "#D97706", "#FCD34D", "#F59E0B"]}
        className="font-logo -ml-2 text-lg md:text-2xl tracking-wide">
      <span className="font-logo -ml-2 text-lg md:text-2xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent animate-shimmer bg-[length:200%_100%]">
        INSTEL
      </AuroraText> */}
      {/* </span> */}
    </Link>
  );
}
