"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, CheckCircle2 } from "lucide-react";

const FEATURES = [
  "Concept Based Learning",
  "NCERT Focused",
  "Board Preparation",
  "15+ Years Experience",
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
      {/* Ambient background: faint bonded-molecule grid, not a generic radial blob */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(10,61,145,0.08)_1px,transparent_0)] bg-[length:32px_32px]" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 -left-32 h-72 w-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-medium text-primary shadow-soft mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            15+ Years Experience
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
            className="font-heading text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.1] text-dark tracking-tight"
          >
            Master Chemistry
            <br />
            with <span className="text-gradient">Confidence</span>
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
            className="mt-5 font-mono text-lg text-accent font-medium"
          >
            Learn Chemistry the Conceptual Way
          </motion.p>

          <motion.p
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
            className="mt-4 text-lg text-dark/60 max-w-xl leading-relaxed"
          >
            No rote memorization. Neeraj Sharma breaks down every reaction,
            mechanism, and formula into concepts that actually make sense —
            built for CBSE boards, JEE, and NEET aspirants.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            custom={4}
            variants={fadeUp}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/resources"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-soft-lg hover:bg-primary-700 transition-all hover:-translate-y-0.5"
            >
              <Download className="h-4.5 w-4.5" />
              Download Free Notes
            </Link>
            <Link
              href="/notes"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white px-7 py-3.5 text-base font-semibold text-primary hover:border-primary/40 transition-all hover:-translate-y-0.5"
            >
              Explore Premium Notes
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.ul
            initial="hidden"
            animate="show"
            custom={5}
            variants={fadeUp}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3"
          >
            {FEATURES.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-dark/70"
              >
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                {feature}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right: Teacher illustration with floating glass stat cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-br from-primary/10 via-white to-accent/10 p-2 shadow-soft-lg">
            <Image
              src="/images/neeraj-sir-hero.png"
              alt="Neeraj Sharma, Chemistry Teacher with 15+ years of experience"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-contain rounded-[1.5rem]"
            />
          </div>

          {/* Floating glass stat card 1 */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 -left-4 sm:left-0 glass rounded-2xl px-4 py-3 shadow-glass"
          >
            <p className="font-mono text-2xl font-bold text-primary">1000+</p>
            <p className="text-xs text-dark/60 font-medium">Students Guided</p>
          </motion.div>

          {/* Floating glass stat card 2 */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute bottom-10 -right-4 sm:right-0 glass rounded-2xl px-4 py-3 shadow-glass"
          >
            <p className="font-mono text-2xl font-bold text-accent">15+</p>
            <p className="text-xs text-dark/60 font-medium">Years Teaching</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
