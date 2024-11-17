"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LogoStatic } from "./LogoStatic";
import { useIsLottieLoading } from "./useIsLottieLoading";

export const LogoAnimated = () => {
  const { isLoading, callback } = useIsLottieLoading();

  return (
    <div className="relative">
      {isLoading && (
        <LogoStatic className={`absolute left-[calc(50%-128px)]`} />
      )}
      <DotLottieReact
        src="/logo-animated.lottie"
        loop
        autoplay
        className="h-64"
        dotLottieRefCallback={callback}
      />
    </div>
  );
};
