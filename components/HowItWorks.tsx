"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Create Your Family Profile",
    description:
      "Tell us about your children's ages, interests, and your family's goals to get personalized recommendations.",
    image: "/images/howitworks1.svg",
  },
  {
    number: "02",
    title: "Build Vision Boards Together",
    description:
      "Use our interactive canvas to set family goals and dreams across learning, creativity, exploration, social, activity, and fun.",
    image: "/images/howitworks2.svg",
  },
  {
    number: "03",
    title: "Enjoy Personalized Activities",
    description:
      "Receive AI-curated activities that match your vision board goals and family dynamics to start your journey!",
    image: "/images/howitworks1.svg",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to transform your family time into meaningful
            experiences.
          </p>
        </motion.div>

        <div className="space-y-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-12`}
            >
              <div className="flex-1">
                <span className="text-6xl font-heading font-bold text-gradient-cool opacity-60">
                  {step.number}
                </span>
                <h3 className="text-2xl font-heading font-bold text-foreground mt-2 mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="flex-1 flex justify-center">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full max-w-sm rounded-2xl"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
