"use client";
import { ComponentProps, useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const useIsLottieLoading = () => {
  const [dotLottie, setDotLottie] = useState<Ref>(null);
  const [isLoading, setIsLoading] = useState(true);

  const callback: Callback = (dotLottie) => {
    setDotLottie(dotLottie);
  };

  useEffect(() => {
    const onLoad = () => {
      setIsLoading(false);
    };

    if (dotLottie) {
      dotLottie.addEventListener("load", onLoad);
    }

    return () => {
      if (dotLottie) {
        dotLottie.removeEventListener("load", onLoad);
      }
    };
  }, [dotLottie]);

  return { isLoading, callback };
};

type Callback = NonNullable<
  ComponentProps<typeof DotLottieReact>["dotLottieRefCallback"]
>;

type Ref = Parameters<Callback>[0];
