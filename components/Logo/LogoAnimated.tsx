"use client";
import Lottie from "lottie-react";
import { LogoStatic } from "./LogoStatic";
import { useIsLottieLoading } from "./useIsLottieLoading";
import logoAnimatedData from "./logo-animated.json";

export const LogoAnimated = () => {
  const { isLoading, ref, handleOnClick } = useIsLottieLoading();

  return (
    <div className="relative h-64 w-64">
      {isLoading && (
        <LogoStatic className={`absolute left-[calc(50%-128px)]`} />
      )}
      <Lottie
        onClick={handleOnClick}
        animationData={logoAnimatedData}
        className="h-64"
        lottieRef={ref}
      />
    </div>
  );
};
