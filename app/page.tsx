"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import Navbar from "@/components/Navbar";
import ParticleWeb from "@/components/ParticleWeb";
import Projects from "@/components/Projects";
import ScrollProgress from "@/components/ScrollProgress";
import Skills from "@/components/Skills";
import AskDevansh from "@/components/AskDevansh";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-black font-sans text-white">
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ParticleWeb />
          <ScrollProgress />
          <Navbar />

          <main>
            <Hero />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
          <AskDevansh />
        </motion.div>
      )}
    </div>
  );
}
