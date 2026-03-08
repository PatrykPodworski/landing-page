"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

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

  const handleSend = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch {
      return;
    }

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
        <div className="flex items-center justify-end">
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

      {showDialog && (
        <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-zinc-300 text-sm animate-fade-in">
          Thanks for your message! I will answer you shortly.
        </div>
      )}
    </div>
  );
};

export default ChatbotInput;
