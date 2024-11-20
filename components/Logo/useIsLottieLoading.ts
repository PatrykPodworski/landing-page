"use client";
import { useRef, useState } from "react";
import { LottieRefCurrentProps } from "lottie-react";

// TODO: Fix loading state
export const useIsLottieLoading = () => {
  const ref = useRef<LottieRefCurrentProps>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleOnClick = () => {
    if (ref.current && ref.current.animationItem) {
      ref.current.setDirection(
        ref.current.animationItem.playDirection === 1 ? -1 : 1
      );
    }
  };

  // useEffect(() => {
  //   const onLoad = () => {
  //     setIsLoading(false);
  //   };

  //   if (ref.current) {
  //     ref.current.animationLoaded;
  //   }

  //   return () => {
  //     if (ref) {
  //       ref.removeEventListener("load", onLoad);
  //     }
  //   };
  // }, [dotLottie]);

  return { isLoading, ref, handleOnClick };
};
