"use client";

import { useEffect } from "react";
import { motion, useAnimate, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components";

const Home = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate([
        ["h1", { opacity: 1, y: 0, x: 0 }],
        ["h2", { opacity: 1, y: 0, x: 0 }, { at: "<" }],
      ]);
    }
  }, [animate, isInView, scope]);

  return (
    <div ref={scope} className="flex flex-col gap-4">
      <motion.h1
        className="text-white text-3xl"
        initial={{
          opacity: 0,
          y: "100%",
        }}
      >
        Hello, I&apos;m Patryk
      </motion.h1>
      <motion.h2
        className="text-white text-xl"
        initial={{
          opacity: 0,
          x: "100%",
        }}
      >
        Check some of my projects
      </motion.h2>
      <div className="flex gap-4">
        <Link href="/habits">
          <Button>Habits</Button>
        </Link>
        <a href="https://next-mile.vercel.app/">
          <Button>E-commerce</Button>
        </a>
      </div>
    </div>
  );
};

export default Home;
