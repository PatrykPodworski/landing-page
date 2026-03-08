"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const SUGGESTION_CHIPS = [
  { label: "Write", icon: "✏️" },
  { label: "Learn", icon: "🧠" },
  { label: "Code", icon: "</>" },
  { label: "Life stuff", icon: "📋" },
  { label: "Claude's choice", icon: "🌟" },
];

const ChatbotInput = () => {
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (!message.trim()) return;

    console.log(message);
    setMessage("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setShowDialog(true);
    setTimeout(() => setShowDialog(false), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center w-full max-w-2xl">
      <div className="w-full rounded-2xl bg-zinc-700/50 border border-zinc-600/50 p-4 flex flex-col gap-3">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="How can I help you today?"
          className="w-full resize-none overflow-hidden bg-transparent text-zinc-100 text-base placeholder-zinc-400 focus:outline-none"
        />
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-200 hover:bg-zinc-600/50 transition-colors"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="9" y1="3" x2="9" y2="15" />
              <line x1="3" y1="9" x2="15" y2="9" />
            </svg>
          </button>
          <motion.button
            type="button"
            onClick={handleSend}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {SUGGESTION_CHIPS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-600/50 text-zinc-300 text-sm hover:bg-zinc-700/50 hover:text-zinc-100 transition-colors cursor-pointer"
          >
            <span className="text-xs">{chip.icon}</span>
            {chip.label}
          </button>
        ))}
      </div>

      {showDialog && (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-300 text-sm animate-fade-in">
          Thanks for your message! I will answer you shortly.
        </div>
      )}
    </div>
  );
};

export default ChatbotInput;
