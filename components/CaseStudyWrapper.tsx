"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CaseStudyWrapperProps = {
  children: ReactNode;
};

export default function CaseStudyWrapper({ children }: CaseStudyWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
