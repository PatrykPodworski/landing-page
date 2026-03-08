"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const GREETINGS = [
  { line1: "Hello!", line2: "I'm Patryk" },
  { line1: "Cześć!", line2: "Jestem Patryk" },
  { line1: "¡Hola!", line2: "Soy Patryk" },
];

type Phase = "typing-line1" | "typing-line2" | "idle" | "erasing";

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const GreetingAnimation = () => {
  const [langIndex, setLangIndex] = useState(0);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [phase, setPhase] = useState<Phase>("typing-line1");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const greeting = GREETINGS[langIndex];

  useEffect(() => {
    const after = (fn: () => void, ms: number) => {
      timeout.current = setTimeout(fn, ms);
    };

    if (phase === "typing-line1") {
      if (line1.length < greeting.line1.length) {
        after(() => setLine1(greeting.line1.slice(0, line1.length + 1)), rand(60, 130));
      } else {
        after(() => setPhase("typing-line2"), 200);
      }
    } else if (phase === "typing-line2") {
      if (line2.length < greeting.line2.length) {
        after(() => setLine2(greeting.line2.slice(0, line2.length + 1)), rand(60, 130));
      } else {
        after(() => setPhase("idle"), 0);
      }
    } else if (phase === "erasing") {
      if (line2.length > 0) {
        after(() => setLine2(line2.slice(0, -1)), rand(25, 55));
      } else if (line1.length > 0) {
        after(() => setLine1(line1.slice(0, -1)), rand(25, 55));
      } else {
        after(() => {
          setLangIndex((i) => (i + 1) % GREETINGS.length);
          setPhase("typing-line1");
        }, 0);
      }
    }

    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [phase, line1, line2, greeting]);

  const advance = useCallback(() => {
    if (phase === "idle") setPhase("erasing");
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") advance();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const cursorOnLine1 = phase === "typing-line1" || (phase === "erasing" && line2.length === 0);
  const cursorOnLine2 = phase === "typing-line2" || (phase === "erasing" && line2.length > 0);

  return (
    <div className="w-72 cursor-pointer select-none" onClick={advance}>
      <p className="text-slate-50 text-4xl font-bold">
        {line1}
        {cursorOnLine1 && <span className="animate-blink">|</span>}
      </p>
      <p className="text-slate-50 text-4xl">
        {line2}
        {cursorOnLine2 && <span className="animate-blink">|</span>}
      </p>
    </div>
  );
};

export default GreetingAnimation;
