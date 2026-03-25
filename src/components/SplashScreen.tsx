import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  React.useEffect(() => {
    const timer = setTimeout(onFinish, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-[#2F4F4F] via-[#778899] to-[#87CEEB]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
      >
        <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl shadow-black/30 border-2 border-white/20">
          <img src="/logo.png" alt="PostGenius" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* App Name */}
      <motion.h1
        className="mt-6 text-3xl font-bold text-white tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        PostGenius
      </motion.h1>

      {/* Tagline */}
      <motion.p
        className="mt-2 text-sm text-white/60 font-medium"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        AI-Powered Social Content
      </motion.p>

      {/* Loading dots */}
      <motion.div
        className="mt-10 flex gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-white/50"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </motion.div>

      {/* Watermark */}
      <motion.p
        className="absolute bottom-10 text-[10px] text-white/30 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        by Aarav-bit
      </motion.p>
    </motion.div>
  );
}
