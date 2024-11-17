"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LogoStatic } from "./LogoStatic";
import { DEFAULT_LOGO_SIZE } from "./DEFAULT_LOGO_SIZE";
import { useIsLottieLoading } from "./useIsLottieLoading";

export const LogoAnimated = () => {
  const { isLoading, callback } = useIsLottieLoading();

  return (
    <div className="relative">
      {isLoading && (
        <LogoStatic
          className={`absolute left-[calc(50%-${DEFAULT_LOGO_SIZE}px/2)]`}
        />
      )}
      <DotLottieReact
        src="/logo-animated.lottie"
        loop
        autoplay
        className={`h-[${DEFAULT_LOGO_SIZE}px]`}
        dotLottieRefCallback={callback}
      />
    </div>
  );
};
