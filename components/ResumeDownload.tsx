"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type LineData = {
  text: string;
  color: string;
  delayBefore: number;
  typeWriter: boolean;
  highlightCheck?: boolean;
  bold?: boolean;
};

const SEQUENCE: LineData[] = [
  { text: "$ export-resume --format=pdf --name=\"Devansh_Singh\"", color: "#888888", delayBefore: 0, typeWriter: false },
  { text: "> Initializing export pipeline...", color: "#555555", delayBefore: 200, typeWriter: true },
  { text: "> Compiling experience data............  ?", color: "#555555", delayBefore: 0, typeWriter: true, highlightCheck: true },
  { text: "> Bundling skills & projects..........  ?", color: "#555555", delayBefore: 0, typeWriter: true, highlightCheck: true },
  { text: "> Running quality checks...............  ?", color: "#555555", delayBefore: 0, typeWriter: true, highlightCheck: true },
  { text: "> Generating PDF.......................  ?", color: "#555555", delayBefore: 150, typeWriter: true, highlightCheck: true },
  { text: "SUCCESS: Resume compiled in 0.5s", color: "#39FF14", delayBefore: 250, typeWriter: false, bold: true },
  { text: "> Initiating download...", color: "#555555", delayBefore: 0, typeWriter: true },
  { text: "? Devansh_Singh_Resume.pdf downloaded successfully", color: "#39FF14", delayBefore: 100, typeWriter: false },
  { text: "Press any key to close_", color: "#333333", delayBefore: 400, typeWriter: false },
];

export default function ResumeDownload({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<{ text: string; config: LineData }[]>([]);
  const [isDone, setIsDone] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const runSequence = async () => {
      for (let i = 0; i < SEQUENCE.length; i++) {
        if (!isMounted) return;
        const config = SEQUENCE[i];

        if (config.delayBefore > 0) {
          await new Promise((r) => setTimeout(r, config.delayBefore));
        }

        if (!isMounted) return;

        if (config.typeWriter) {
          // Initialize empty line
          setLines((prev) => [...prev, { text: "", config }]);
          
          let currentText = "";
          for (let char of config.text) {
            currentText += char;
            if (!isMounted) return;
            
            setLines((prev) => {
              const newLines = [...prev];
              newLines[newLines.length - 1].text = currentText;
              return newLines;
            });
            
            await new Promise((r) => setTimeout(r, 10));
          }
        } else {
          setLines((prev) => [...prev, { text: config.text, config }]);
        }

        if (i === 7) { // After "Initiating download..."
          const link = document.createElement("a");
          link.href = "/Devansh_Singh_Resume.pdf";
          link.download = "Devansh_Singh_Resume.pdf";
          link.click();
        }
      }
      
      if (isMounted) {
        setIsDone(true);
        doneRef.current = true;
      }
    };

    runSequence();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      if (doneRef.current) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("click", handleInteraction);
    return () => {
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("click", handleInteraction);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-300 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
    >
      <div 
        className="w-[min(600px,90vw)] bg-space-dark border border-[#1c1c1c] rounded-md shadow-[0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-card-dark border-b border-[#111] px-4 py-2.5 flex items-center relative">
          <div className="flex gap-1.5 absolute left-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28ca42]" />
          </div>
          <div className="w-full text-center">
            <span className="font-mono text-[11px] text-[#555]">devansh@portfolio: ~/resume</span>
          </div>
        </div>

        <div className="px-6 py-5 font-mono text-[12px] leading-[1.8] min-h-80">
          {lines.map((lineObj, idx) => {
            const { text, config } = lineObj;
            
            // Format text
            let renderContent: React.ReactNode = text;
            
            if (config.highlightCheck && text.includes("?")) {
              const parts = text.split("?");
              renderContent = (
                <>
                  {parts[0]}
                  <span className="text-neon">?</span>
                  {parts[1] || ""}
                </>
              );
            }
            
            if (idx === SEQUENCE.length - 1) { // Last line blinking cursor
              renderContent = (
                <>
                  {text.replace("_", "")}
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-2 h-3.5 bg-[#333] ml-px align-middle"
                  />
                </>
              );
            }

            return (
              <div 
                key={idx} 
                style={{ color: config.color }} 
                className={config.bold ? "font-bold" : ""}
              >
                {renderContent}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
