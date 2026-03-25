import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface OnboardingScreenProps {
  onComplete: (name: string) => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [name, setName] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length > 0) {
      localStorage.setItem('postgenius_username', trimmed);
      onComplete(trimmed);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-gradient-to-br from-[#2F4F4F] via-[#778899] to-[#87CEEB] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        className="w-full max-w-sm"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      >
        {/* Logo */}
        <motion.div
          className="flex flex-col items-center mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <img src="/logo.png" alt="PostGenius" className="w-20 h-20 rounded-3xl shadow-lg mb-4" />
          <h1 className="text-3xl font-bold text-white tracking-tight">PostGenius</h1>
          <p className="text-white/60 text-sm mt-1">AI-powered social content</p>
        </motion.div>

        {/* Card */}
        <motion.div
          className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-slate-800">Welcome!</h2>
          </div>
          <p className="text-sm text-slate-500 mb-5">What should we call you?</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div
              className={`relative rounded-2xl border-2 transition-colors ${
                isFocused ? 'border-primary shadow-sm' : 'border-slate-200'
              }`}
            >
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Your name"
                maxLength={24}
                autoFocus
                className="w-full px-4 py-3.5 bg-transparent text-slate-800 text-base font-medium placeholder:text-slate-300 outline-none rounded-2xl"
              />
            </div>

            <motion.button
              type="submit"
              disabled={name.trim().length === 0}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-base font-semibold transition-all ${
                name.trim().length > 0
                  ? 'bg-primary text-white shadow-md hover:shadow-lg active:scale-[0.98]'
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
              whileTap={name.trim().length > 0 ? { scale: 0.97 } : {}}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>

        <motion.p
          className="text-center text-white/40 text-xs mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          by Aarav-bit
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
