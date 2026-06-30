"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const Community = () => {
  return (
    <section
      className="py-24 px-6"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
            You&apos;re Not Alone on This Journey
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Connect with Village Rithm, share experiences, and find
            encouragement in a safe, supportive space.
          </p>
          <a
            href="#cta"
            className="inline-flex items-center gap-2 bg-gradient-warm text-secondary-foreground px-6 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
          >
            Start Your Journey
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="/images/youarenotalone.svg"
            alt="Community support illustration"
            className="w-full max-w-md"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
