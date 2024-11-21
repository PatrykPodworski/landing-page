"use client";
import { useRef, useState } from "react";
import { LottieRefCurrentProps } from "lottie-react";

export const useAnimatedLogo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<LottieRefCurrentProps>(null);
  const previousSpeed = useRef<number>(0);

  const handleOnClick = () => {
    if (ref.current && ref.current.animationItem) {
      const speed = ref.current.animationItem.playSpeed;
      const newSpeed = getNewSpeed(speed, previousSpeed.current);

      previousSpeed.current = speed;
      ref.current.setSpeed(newSpeed);
    }
  };

  const onDomLoaded = () => {
    setIsLoading(false);
  };

  return { isLoading, ref, handleOnClick, onDomLoaded };
};

const getNewSpeed = (speed: number, previousSpeed: number) => {
  if (
    (speed === 1 && previousSpeed === 2) ||
    (speed === -1 && previousSpeed === -2)
  ) {
    return speed * -1;
  }

  if (speed > 0 && speed > previousSpeed && speed < 5) {
    return speed + 1;
  }

  if (speed < 0 && speed < previousSpeed && speed > -5) {
    return speed - 1;
  }

  return speed > 0 ? speed - 1 : speed + 1;
};
