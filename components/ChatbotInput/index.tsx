"use client";

import { useRef, useState } from "react";
import Button from "@/components/Button";

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
    <div className="flex flex-col gap-4 items-center w-full max-w-lg">
      <p className="text-slate-400 text-lg select-none">
        How can I help you today?
      </p>
      <div className="flex items-end gap-2 w-full">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type your message..."
          className="flex-1 resize-none overflow-hidden rounded-lg bg-slate-800 border border-slate-700 text-slate-50 px-4 py-2 text-base focus:outline-none focus:border-rose-500 transition-colors"
        />
        <Button label="Send" onClick={handleSend} />
      </div>
      {showDialog && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 text-sm animate-fade-in">
          Thanks for your message! I will answer you shortly.
        </div>
      )}
    </div>
  );
};

export default ChatbotInput;
