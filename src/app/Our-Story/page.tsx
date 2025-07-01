// src/components/OurStory.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Flame } from "lucide-react";
import Link from "next/link";

const OurStorySection = () => {
  return (
    <section className="relative py-20 md:py-28 bg-slate-950 text-white overflow-hidden">
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 0%, #d9770644 0%, #1e293b00 40%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
              Our Story
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            “Many compete, but none are my rivals.”
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative group"
          >
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/30 aspect-[4/3]">
              <Image
             
                    src="/peeled.png"
                alt="A delicious snack bite"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-700">
              <h3 className="text-base md:text-lg font-bold text-amber-400">Est. 2015</h3>
              <p className="text-slate-300 text-xs md:text-sm">
                A legacy of delicious obsession.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="text-left space-y-6"
          >
            <div className="flex items-center gap-3">
              <Flame className="w-8 h-8 text-amber-500" />
              <h3 className="text-2xl md:text-3xl font-bold leading-snug">
                From Our Kitchen to Yours
              </h3>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed">
              In 2015, I began Norwood Empire not in a grand factory or office, but in a humble home kitchen nestled in the highlands of Sri Lanka. With a deep love for our island&apos; unique flavors and a dream to share them with the world, I started crafting snacks that told a story – not just of taste, but of culture, community, and home.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              Our journey wasn&apos;t always easy. There were late nights, countless trials, But with every packet we sealed, every smile we received from a loyal customer, we found the strength to keep going. Today, Norwood Empire proudly delivers a range of snacks and sweets that capture the soul of Sri Lankan cuisine
            </p>
            {/* FIX APPLIED HERE: Removed the redundant, outer <p> tag */}
            <p className="text-lg text-slate-300 leading-relaxed">
              To the young dreamers out there – let this be a reminder: you don&apos;t need a perfect start, just a passionate heart. Trust your roots. Honor your story. And believe that small beginnings can grow into something truly meaningful.
            </p>
            
            <div className="!mt-8 flex items-center gap-4">
              <Image
                src="/ceo.png"
                alt="Wiranga Karavita, Founder & CEO"
                width={64}
                height={64}
                className="rounded-full object-cover w-16 h-16 border-2 border-slate-700"
              />
              <div className="text-lg text-slate-300 leading-tight">
                {/* <p className="font-bold text-white">– Wiranga Karavita</p> */}
                <p className="text-slate-400">Founder & CEO</p>
                <p className="italic text-slate-400">Norwood Empire (PVT) Ltd.</p>
              </div>
            </div>
            <Link href="/Products" passHref>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(245, 158, 11, 0.2)" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="inline-block mt-4 bg-amber-500 text-slate-900 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-amber-600 transition-all"
              >
                Explore Our Flavors
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;