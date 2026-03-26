import Image from "next/image";
import { DEFAULT_LOGO_SIZE } from "./DEFAULT_LOGO_SIZE";

export const LogoStatic = ({ className, width, height, alt = "podwor.ski logo" }: LogoStaticProps) => (
  <Image
    src="/logo.svg"
    className={className}
    alt={alt}
    width={width ?? DEFAULT_LOGO_SIZE}
    height={height ?? DEFAULT_LOGO_SIZE}
  />
);

type LogoStaticProps = {
  className?: string;
  width?: number;
  height?: number;
  alt?: string;
};
