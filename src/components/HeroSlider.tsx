"use client";

import { motion } from "framer-motion";

// All the Swiper imports have been removed.

const HeroVideo = () => {
  // Define the video source and text content directly
  const videoSrc = "/Norwood intro.mp4";
const title = "“Many compete,";
const subtitle = "but none are my rivals.”";



  return (
    // The main container sets the size and acts as the animation entry point
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="w-full h-[500px] md:h-[600px] lg:h-[700px] relative overflow-hidden"
    >
      {/* The video element now serves as the background */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        suppressHydrationWarning={true} // Kept as a best practice to prevent extension-related errors
      >
        Your browser does not support the video tag.
      </video>

      {/* The gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* The text content, positioned on top */}
      <div className="relative z-10 h-full flex items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
          className="text-white px-6 sm:px-10 md:px-16 max-w-md md:max-w-lg lg:max-w-xl"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            {title}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="text-xl sm:text-2xl mt-3 text-yellow-400"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroVideo;