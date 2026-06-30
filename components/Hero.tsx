"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(135deg, hsl(210, 70%, 35%) 0%, hsl(160, 45%, 35%) 100%), url(/images/hero-family.jpg)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--hero-overlay)" }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-tight mb-8"
        >
          A personalized, AI-powered growth platform for families to co-create
          meaningful experiences through learning, creativity, fun, and
          exploration.
        </motion.h1>

        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          href="#features"
          className="inline-flex items-center gap-3 bg-gradient-cool text-white px-8 py-4 rounded-full text-lg font-semibold shadow-hero-btn hover:opacity-90 transition-all"
        >
          Start your family journey
          <ArrowUpRight size={20} />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;
