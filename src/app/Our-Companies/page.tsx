"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import clsx from "clsx";

interface Brand {
  name: string;
  tagline: string;
  description: string | string[];
  image: string | StaticImageData;
  accentColor: string;
  link: string;
}



const childBrands: Brand[] = [
  {
    name: "Norwood Lanka Teas International",
    tagline: "The Art of Ceylon Tea",
    description:
      "Norwood Lanka Teas International is a proud subsidiary of Norwood Empire Pvt Ltd, dedicated to delivering the finest Ceylon tea to the world. As one of Sri Lanka’s leading tea brands, we combine generations of tea craftsmanship with modern innovation to offer rich, authentic flavors that define premium quality.",
    image: "/teas.jpg",
    accentColor: "text-green-400",
    link: "/#",
  },
  {
    name: "Norwood Candy",
    tagline: "A Legacy of Sweetness",
    description: [
      "Norwood Candy, a proud subsidiary of Norwood Empire Pvt Ltd, stands as one of Sri Lanka’s leading names in candy manufacturing and distribution.",
      "From the traditional richness of coconut and milk toffee, to the satisfying crunch of our peanut and chocolate cookies, and the childhood delight of colorful lollipops, every product we make is a blend of nostalgia and quality.",
      "We serve both the local market and wholesale partners, ensuring our candies reach every corner of Sri Lanka, spreading happiness one bite at a time.",
    ],
    image: "/candy.jpg",
    accentColor: "text-pink-400",
    link: "/#",
  },
  {
    name: "Freestyle Edu",
    tagline: "The Future of Learning",
    description: [
      "Freestyle Edu is Sri Lanka’s first-ever educational social media platform, proudly built under Norwood Empire Pvt Ltd. Designed to support A/L students and passionate learners across the country, Freestyle Edu brings together the power of social networking and academic support in one engaging space.",
      "On Freestyle Edu, students and teachers can share educational content, ask questions, post updates, and stay connected — just like on popular social platforms, but with a clear focus on learning and personal growth. It’s more than a platform — it’s a revolution in education, driven by the youth, for the youth.",
    ],
    image: "/free.png",
    accentColor: "text-blue-400",
    link: "https://www.freestyle.lk",
  },
];

function BrandSection({
  brand,
  isReversed,
}: {
  brand: Brand;
  isReversed: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div
      ref={ref}
      className="group grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className={clsx(
          "rounded-2xl overflow-hidden shadow-2xl shadow-black/30",
          isReversed && "md:order-last"
        )}
      >
        <motion.div style={{ y: imageY }}>
          {/* explicit width/height so it renders */}
          <Image
            src={brand.image}
            alt={`Promotional image for ${brand.name}`}
            width={1200}
            height={900}
            className="object-cover w-full h-auto transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </motion.div>
      </div>

      <div className="text-center md:text-left">
        <p className={`font-semibold tracking-wider ${brand.accentColor} mb-3`}>
          {brand.tagline.toUpperCase()}
        </p>
        <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          {brand.name}
        </h3>
        <div className="text-slate-300/80 leading-relaxed mb-8 space-y-5">
          {Array.isArray(brand.description)
            ? brand.description.map((p, i) => <p key={i}>{p}</p>)
            : <p>{brand.description}</p>}
        </div>
        
        {/* Render a button only if the link is not a placeholder */}
        {brand.link && brand.link !== "/#" && (
          <Link href={brand.link} passHref target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0px 10px 25px rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center bg-white/10 border border-white/20 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:bg-white/20 transition-all"
            >
              Visit Website
              <ArrowRight className="ml-2.5 w-5 h-5" />
            </motion.button>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function CompanyShowcasePage() {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className="relative bg-slate-950 text-white min-h-screen overflow-x-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-0 left-0 h-[500px] w-[500px] bg-amber-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "10s", animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/3 left-1/4 h-[400px] w-[400px] bg-green-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "12s", animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10">
        {/* Hero */}
        <section className="py-28 md:py-40 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-black mb-5 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-amber-300 via-orange-400 to-red-400">
                Our Family of Brands
              </span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto">
              A collective of specialized companies, each a leader in its field, united by a passion for quality and innovation.
            </motion.p>
          </div>
        </section>

      
              
      
        {/* Subsidiary Brands */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Specialized Divisions</h2>
              <div className="mt-4 h-1.5 w-24 bg-gradient-to-r from-amber-400 to-orange-500 mx-auto rounded-full" />
            </motion.div>
            <div className="space-y-24 md:space-y-32">
              {childBrands.map((brand, idx) => (
                <BrandSection key={brand.name} brand={brand} isReversed={idx % 2 !== 0} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}