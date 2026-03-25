import React from 'react';
import { CloudUpload, Sparkles, Palette } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeViewProps {
  onUpload: (file: File) => void;
}

export function HomeView({ onUpload }: HomeViewProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full space-y-12"
    >
      {/* Hero Text */}
      <div className="text-center space-y-4 px-4">
        <h2 className="text-[3.5rem] font-extrabold tracking-tight text-on-surface leading-[1.1]">
          Turn your media into <span className="inline-block text-transparent bg-clip-text ethereal-gradient">viral posts!</span>
        </h2>
        <p className="text-on-surface-variant text-lg max-w-xs mx-auto opacity-70 leading-relaxed">
          Our AI analyzes your visuals to craft the perfect hook, caption, and hashtags for maximum engagement.
        </p>
      </div>

      {/* Upload Area */}
      <div className="px-4">
        <div 
          onClick={handleUploadClick}
          className="cursor-pointer w-full aspect-square rounded-[3rem] bg-white border-2 border-dashed border-slate-100 flex flex-col items-center justify-center p-8 shadow-[0_24px_48px_rgba(79,70,229,0.02)] transition-transform active:scale-[0.98]"
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*,video/*" 
            className="hidden" 
          />
          <div className="w-20 h-20 rounded-full bg-[#E2DFFF] flex items-center justify-center mb-8">
            <CloudUpload className="w-8 h-8 text-primary" />
          </div>
          <button 
            className="ethereal-gradient text-white font-bold py-5 px-12 rounded-full shadow-[0_20px_40px_rgba(79,70,229,0.3)] pointer-events-none"
          >
            Upload Image or Reel
          </button>
          <p className="mt-6 text-[10px] font-bold text-slate-300 tracking-[0.2em] uppercase">
            Tap anywhere to start
          </p>
        </div>
      </div>

      {/* Media Preview Card */}
      <div className="px-4">
        <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-surface-container-high shadow-2xl">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhFBshkFqKKsKdOjwxXGzFUnCM_FiE_sN27fxrCrvWuslDo2xhSAch9azfSUE89ZNwDfDr-ZHhiYlzfwWqsZWJs1Xp6ApQAWQgZ9YEMMKjaRbOD6VZDsHd2NFxO0FLYP-K1hpoRd6rNStFwrVe5Lwg_xmnJCFkCIghFIcCTzQ5yCpdplbUFF9lTCyYKa01HbKV4bKHYdNqWirOnwCWWmTtOqK37BLqKsqKp7PP8qUDJx299m7_jPKEcBuBmMg2Gh1hJ7ncsoeoMceu" 
            alt="Media preview" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-10 left-10 flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <span className="text-white text-base font-semibold tracking-wide">Processing High Quality...</span>
          </div>
        </div>
      </div>

      {/* Intelligence Status */}
      <div className="px-4 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-xs font-bold text-on-surface uppercase tracking-[0.15em]">AI Context Mapping</span>
            <span className="text-3xl font-bold text-primary">84%</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '84%' }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-primary rounded-full"
            />
          </div>
          <p className="text-on-surface-variant text-base leading-relaxed opacity-80">
            Detecting visual themes, lighting moods, and brand alignment to generate authentic copy.
          </p>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-2 gap-4 pb-12">
          <div className="p-8 rounded-[2.5rem] bg-white border border-slate-50 shadow-sm flex flex-col items-start">
            <Sparkles className="w-6 h-6 text-secondary mb-4" />
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Sentiment</h4>
            <p className="text-base font-bold text-on-surface">Inspirational</p>
          </div>
          <div className="p-8 rounded-[2.5rem] bg-white border border-slate-50 shadow-sm flex flex-col items-start">
            <Palette className="w-6 h-6 text-primary mb-4" />
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Palette</h4>
            <p className="text-base font-bold text-on-surface">Slate Teal</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
