"use client";

import { PropsWithChildren, useEffect } from "react";

const useSynchronizeHabits = () => {
  useEffect(() => {
    fetch("/api/habits", { method: "PUT" });

    const interval = setInterval(() => {
      fetch("/api/habits", { method: "PUT" });
    }, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, []);
};

const SynchronizeHabitsWrapper = ({ children }: PropsWithChildren) => {
  useSynchronizeHabits();
  return <>{children}</>;
};

export default SynchronizeHabitsWrapper;
