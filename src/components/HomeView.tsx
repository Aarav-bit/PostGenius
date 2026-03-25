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


    </motion.div>
  );
}
