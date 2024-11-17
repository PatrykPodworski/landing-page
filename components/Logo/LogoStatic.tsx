import Image from "next/image";
import { DEFAULT_LOGO_SIZE } from "./DEFAULT_LOGO_SIZE";

export const LogoStatic = ({ className, width, height }: LogoStaticProps) => (
  <Image
    src="/logo.svg"
    className={className}
    alt="podwor.ski logo"
    width={width ?? DEFAULT_LOGO_SIZE}
    height={height ?? DEFAULT_LOGO_SIZE}
  />
);

type LogoStaticProps = {
  className?: string;
  width?: number;
  height?: number;
};
