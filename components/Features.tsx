"use client";

import { motion } from "framer-motion";
import { Sparkles, Users, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Interactive Vision Board",
    description:
      "Build a visual canvas for a fun and engaging way to set goals and aspirations.",
  },
  {
    icon: Sparkles,
    title: "AI Personalization",
    description:
      "Intelligently curated and recommended activities, content, and experiences aligned with your family's unique profile.",
  },
  {
    icon: Users,
    title: "Community and Growth",
    description:
      "Network of like-minded parents via shared interest groups. Learn from others or contribute your own journey.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 px-6"
      style={{ background: "var(--gradient-section)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-cool flex items-center justify-center mb-6">
                <feature.icon size={28} className="text-primary-foreground" />
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
