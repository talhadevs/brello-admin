"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Village Rithm suitable for all ages?",
    answer:
      "Yes, Village Rithm supports families with children ages 3-17. We personalize recommendations so every activity matches developmental needs.",
  },
  {
    question: "How much time do activities typically take?",
    answer:
      "You can filter activities by time commitment from 15-minute quick connects to weekend adventures so you can slot them into any schedule.",
  },
  {
    question: "Do I need any special materials or supplies?",
    answer:
      "Most activities use common household items. When something extra helps, we share a mini checklist plus budget-friendly alternatives.",
  },
  {
    question: "What is Village Rithm used for?",
    answer:
      "Village Rithm is your family's curation studio: set shared goals, build interactive vision boards, discover activities, and grow connections with like-minded parents.",
  },
  {
    question: "Does Village Rithm really help to educate your child?",
    answer:
      "Absolutely. Every recommendation blends fun with learning drawing on child development research, SEL frameworks, and creativity prompts.",
  },
  {
    question: "What is the purpose of Village Rithm?",
    answer:
      "We empower families to craft meaningful experiences together through personalized planning, supportive communities, and engaging rewards.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-card"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-heading font-semibold text-foreground text-lg pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`text-muted-foreground transition-transform shrink-0 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
