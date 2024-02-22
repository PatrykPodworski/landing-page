"use client";

import { motion } from "framer-motion";
import ButtonAnimationWrapper from "./ButtonAnimationWrapper";

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <ButtonAnimationWrapper
      className="relative cursor-pointer"
      onClick={onClick}
    >
      <motion.div
        className="text-white text-l px-4 py-2 z-10"
        initial={{
          opacity: 0,
          x: 16,
        }}
      >
        {children}
      </motion.div>
    </ButtonAnimationWrapper>
  );
};

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};

export default Button;
