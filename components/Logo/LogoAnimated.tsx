"use client";
import dynamic from "next/dynamic";
import { LogoStatic } from "./LogoStatic";
import logoAnimatedData from "./logo-animated.json";
import { useAnimatedLogo } from "./useAnimatedLogo";
import type { LottieComponentProps } from "lottie-react";

const Lottie = dynamic<LottieComponentProps>(() => import("lottie-react"), {
  ssr: false,
});

export const LogoAnimated = () => {
  const { isLoading, ref, handleOnClick, onDomLoaded } = useAnimatedLogo();

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
        onDOMLoaded={onDomLoaded}
      />
    </div>
  );
};
