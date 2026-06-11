"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Hexagon, X, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "What's your tech stack?",
  "Available for freelance?",
  "Tell me about your projects",
];

export default function AskDevansh() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-4 right-4 md:left-8 md:right-auto z-200 md:w-85 max-h-[70vh] md:max-h-120 bg-space-dark border border-[#1c1c1c] rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(57,255,20,0.05)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-card-dark border-b border-[#111] px-4 py-3.5 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-0.75 h-0.75 bg-neon rounded-full"
                  />
                  <span className="font-mono text-[11px] text-white tracking-wider">
                    DEVANSH.AI
                  </span>
                </div>
                <span className="font-sans text-[11px] text-[#555] block mt-0.5">
                  Ask me anything
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#555] hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto max-h-80 p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-[#39FF14] scrollbar-track-transparent">
              {messages.length === 0 ? (
                <div className="flex flex-col gap-2 mt-auto">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(suggestion)}
                      className="text-left bg-card-dark border border-[#222] text-[#555] font-sans text-[12px] px-3 py-2 rounded-xl hover:border-neon hover:text-neon transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`font-sans text-[13px] px-3 py-2 max-w-[85%] ${
                      msg.role === "user"
                        ? "self-end bg-[#1a2e00] border border-neon text-white rounded-[12px_12px_2px_12px]"
                        : "self-start bg-card-dark border border-[#1c1c1c] text-[#ccc] rounded-[12px_12px_12px_2px]"
                    }`}
                  >
                    {msg.content}
                  </div>
                ))
              )}
              {isLoading && (
                <div className="self-start bg-card-dark border border-[#1c1c1c] text-[#ccc] rounded-[12px_12px_12px_2px] px-4 py-3 flex gap-1">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-1.5 h-1.5 bg-neon rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-1.5 h-1.5 bg-neon rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-1.5 h-1.5 bg-neon rounded-full"
                  />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-[#111] p-3 flex gap-2 shrink-0 bg-space-dark">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-black border border-[#1c1c1c] text-white font-sans text-[13px] px-3 py-2 rounded placeholder:text-[#333] focus:border-neon focus:outline-none transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="bg-transparent border border-neon text-neon hover:bg-neon hover:text-black font-mono text-[10px] px-4 py-2 flex items-center justify-center transition-colors rounded disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-neon"
                aria-label="Send message"
              >
                SEND
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div 
        className="fixed bottom-6 right-6 md:bottom-8 md:right-auto md:left-8 z-200 flex flex-row-reverse md:flex-row items-center gap-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-13 h-13 flex items-center justify-center bg-card-dark border border-neon rounded-full text-neon hover:bg-neon hover:text-black transition-colors"
          aria-label="Toggle chat"
        >
          <Hexagon size={20} className={isOpen ? "rotate-90 transition-transform" : "transition-transform"} />
          {/* Pulsing ring */}
          {!isOpen && (
            <motion.div
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="absolute inset-0 border border-neon rounded-full"
            />
          )}
        </button>

        {/* Tooltip */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-card-dark border border-[#1c1c1c] px-3 py-1.5 rounded font-mono text-[10px] tracking-wider whitespace-nowrap text-white"
            >
              Ask Devansh
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
