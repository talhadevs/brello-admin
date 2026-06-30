"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const CTASection = () => {
  return (
    <section id="cta" className="py-24 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: "url(/images/readytotransform-bg.svg)" }}
      />
      <div className="absolute inset-0 bg-gradient-cool opacity-95" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-heading font-bold text-white mb-6"
        >
          Ready to Transform Your Family Time?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-white/80 text-lg mb-10 max-w-2xl mx-auto"
        >
          Join thousands of families who are already creating intentional,
          meaningful experiences that nurture growth, creativity, and joy.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          href="#"
          className="inline-flex items-center gap-3 bg-white text-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors shadow-hero-btn"
        >
          Start Your Family
          <ArrowUpRight size={20} />
        </motion.a>

        <div className="flex justify-center gap-6 mt-12">
          <img
            src="/images/readytotransform4.svg"
            alt=""
            className="w-20 h-20 rounded-full"
          />
          <img
            src="/images/readytotransform3.svg"
            alt=""
            className="w-20 h-20 rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
