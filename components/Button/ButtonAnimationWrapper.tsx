"use client";
import { motion, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";

const BACKGROUND_COLOR = "#FFFFFF28";
const ButtonAnimationWrapper = ({
  children,
  className,
}: ButtonAnimationWrapperProps) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate([
        ["rect", { pathLength: 1.01 }],
        ["button", { opacity: 1, x: 0 }],
      ]);
    }
  }, [animate, isInView]);

  const handleHoverStartAnimation = async () => {
    animate([
      ["circle", { r: "50%" }],
      ["circle", { r: ["50%", "66%", "50%"] }, { at: "+1" }],
    ]);
  };

  const handleHoverEndAnimation = async () => {
    animate([
      ["circle", { r: 0 }],
      ["button", { scale: 1 }, { at: "<" }],
    ]);
  };

  const handlePointerDownAnimation = () => {
    animate([
      ["circle", { r: "200%" }],
      ["button", { scale: 0.9 }, { at: "<" }],
    ]);
  };

  const handlePointerUpAnimation = () => {
    animate([
      ["circle", { r: "50%" }],
      ["button", { scale: 1 }, { at: "<" }],
    ]);
  };

  return (
    <div
      ref={scope}
      className={className}
      onPointerEnter={handleHoverStartAnimation}
      onPointerLeave={handleHoverEndAnimation}
      onPointerDown={handlePointerDownAnimation}
      onPointerUp={handlePointerUpAnimation}
    >
      <svg className="absolute overflow-hidden" width="100%" height="100%">
        <circle className="background" fill={BACKGROUND_COLOR} r={0} />
      </svg>
      <svg className="absolute overflow-visible" width="100%" height="100%">
        <motion.rect
          initial={{
            pathLength: 0,
          }}
          width="100%"
          height="100%"
          rx={5}
          fill="transparent"
          stroke="white"
          strokeWidth={1}
        />
      </svg>
      {children}
    </div>
  );
};

type ButtonAnimationWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default ButtonAnimationWrapper;
