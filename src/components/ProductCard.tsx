'use client'; // Ensure this is a Client Component if you're using the App Router

import { useRouter } from 'next/navigation';
import { Item } from '@/lib/types';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { ScanLine, ArrowRightCircle } from 'lucide-react';

interface ModernProductCardProps {
  item: Item;
  index: number;
}

const ModernProductCard = ({ item, index }: ModernProductCardProps) => {
  const router = useRouter();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // Handler for keyboard accessibility on the CTA
  const handleCTAKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push('/Contact-Us');
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-black/25 backdrop-blur-lg shadow-2xl shadow-black/40 transition-all duration-500 hover:border-cyan-400/40 hover:shadow-cyan-400/10"
    >
      {/* ===== Image Section ===== */}
      <div className="relative h-60 w-full overflow-hidden">
        <NextImage
          src={item.imageBase64 || '/placeholder-image.png'}
          alt={item.name}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
          unoptimized={item.imageBase64?.startsWith('data:image')}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent"></div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="flex flex-grow flex-col p-5">
        {/* Main content: Name, Code, Description */}
        <div className="flex-grow">
          <h3
            className="text-lg font-bold tracking-tight text-white"
            title={item.name}
          >
            {item.name}
          </h3>

          {item.itemCode && (
            <div className="mt-2 flex items-center font-mono text-xs text-cyan-400/80">
              <ScanLine size={14} className="mr-2 opacity-70" />
              <span>CODE: {item.itemCode}</span>
            </div>
          )}

          <p className="mt-4 text-sm leading-relaxed text-slate-300 line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Footer & Call to Action */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div
            onClick={() => router.push('/Contact-Us')}
            onKeyDown={handleCTAKeydown}
            role="button"
            tabIndex={0}
            aria-label={`Inquire about ${item.name}`}
            className="flex cursor-pointer items-center justify-between text-slate-300 transition-colors duration-300 hover:text-white focus:outline-none focus:text-white"
          >
            <span className="text-sm font-medium">Inquire for Details</span>
            <ArrowRightCircle
              size={20}
              className="transform opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ModernProductCard;