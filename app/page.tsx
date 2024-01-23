"use client";

import { motion } from "framer-motion";

const Home = () => (
  <motion.h1
    className="text-white text-3xl"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
    transition={{ duration: 1 }}
  >
    Hello, I&apos;m Patryk
  </motion.h1>
);

export default Home;
