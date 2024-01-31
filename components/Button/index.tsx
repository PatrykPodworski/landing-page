"use client";

import { motion } from "framer-motion";
import ButtonAnimationWrapper from "./ButtonAnimationWrapper";

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <ButtonAnimationWrapper className="relative cursor-pointer">
      <motion.button
        onClick={onClick}
        className="text-white text-l px-4 py-2 z-10"
        initial={{
          opacity: 0,
          x: 16,
        }}
      >
        {label}
      </motion.button>
    </ButtonAnimationWrapper>
  );
};

type ButtonProps = {
  label: string;
  onClick?: () => void;
};

export default Button;
