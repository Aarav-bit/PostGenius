import React from 'react';
import { Instagram, Briefcase, X, MessageSquare, Copy, Share2, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultsViewProps {
  posts: Record<string, string>;
  isGenerating: boolean;
  onRegenerate: () => void;
}

export function ResultsView({ posts, isGenerating, onRegenerate }: ResultsViewProps) {
  if (isGenerating) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="w-full flex flex-col items-center justify-center min-h-[60vh] space-y-6"
      >
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <h2 className="text-2xl font-bold text-on-surface">Crafting your content...</h2>
        <p className="text-on-surface-variant max-w-sm text-center">
          Our AI is analyzing your inputs and generating optimized posts for your selected platforms.
        </p>
      </motion.div>
    );
  }

  const hasError = posts.error !== undefined;
  if (hasError) {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <h2 className="text-2xl font-bold text-red-500">Oops!</h2>
        <p className="text-on-surface-variant max-w-sm">{posts.error}</p>
        <button 
          onClick={onRegenerate}
          className="px-6 py-3 bg-slate-100 rounded-full font-bold hover:bg-slate-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  const renderContent = (platform: string, content: string) => {
    switch(platform) {
      case 'instagram':
        return (
          <article key={platform} className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full ethereal-gradient flex items-center justify-center text-white">
                <Instagram className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-widest uppercase text-on-surface">Instagram</span>
            </div>
            <p className="text-on-surface leading-relaxed text-lg whitespace-pre-wrap">{content}</p>
          </article>
        );
      case 'linkedin':
        return (
          <article key={platform} className="bg-surface-container-lowest rounded-3xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-widest uppercase text-on-surface">LinkedIn</span>
            </div>
            <p className="text-on-surface leading-relaxed text-lg whitespace-pre-wrap">{content}</p>
          </article>
        );
      case 'twitter':
        return (
          <article key={platform} className="bg-surface-container-lowest rounded-3xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                <X className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-widest uppercase text-on-surface">X / Twitter</span>
            </div>
            <p className="text-on-surface leading-relaxed text-lg whitespace-pre-wrap">{content}</p>
          </article>
        );
      case 'reddit':
        return (
          <article key={platform} className="bg-surface-container-lowest rounded-3xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#FF4500] flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <span className="font-bold text-xs tracking-widest uppercase text-on-surface">Reddit</span>
            </div>
            <p className="text-on-surface leading-relaxed text-lg whitespace-pre-wrap">{content}</p>
          </article>
        );
      default:
        return (
          <article key={platform} className="bg-surface-container-lowest rounded-3xl shadow-sm p-6 mb-6">
            <h3 className="font-bold mb-2 capitalize">{platform}</h3>
            <p className="whitespace-pre-wrap">{content}</p>
          </article>
        );
    }
  };

  const platforms = Object.keys(posts).filter(k => k !== 'error');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto pb-32"
    >
      <section className="mb-12 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-on-surface mb-4">
          Your Content <span className="inline-block text-transparent bg-clip-text ethereal-gradient">Radiates</span>
        </h2>
        <p className="text-on-surface-variant text-lg">
          Generated specially for your selected platforms.
        </p>
      </section>

      <div className="space-y-6">
        {platforms.map(platform => renderContent(platform, posts[platform]))}
      </div>

      <div className="mt-16 text-center">
        <button 
          onClick={onRegenerate}
          className="inline-flex items-center gap-3 px-10 py-5 ethereal-gradient text-white rounded-full font-bold text-lg shadow-[0_24px_48px_rgba(79,70,229,0.3)] hover:scale-105 transition-all active:scale-95"
        >
          <Sparkles className="w-5 h-5" />
          Create New Posts
        </button>
      </div>
    </motion.div>
  );
}
