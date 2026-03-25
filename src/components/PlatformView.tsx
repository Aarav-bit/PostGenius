import React from 'react';
import { Briefcase, Camera, MessageSquare, Zap, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface PlatformViewProps {
  onGenerate: (options: { platforms: string[], tone: string, style: string, length: string }) => void;
  file: File | null;
}

export function PlatformView({ onGenerate, file }: PlatformViewProps) {
  const [selected, setSelected] = React.useState<string[]>(['linkedin', 'reddit']);
  const [tone, setTone] = React.useState('Professional');
  const [style, setStyle] = React.useState('Minimalist');
  const [length, setLength] = React.useState('Medium');

  const previewUrl = React.useMemo(() => {
    if (file) {
      // create safe object URL for the uploaded file
      return URL.createObjectURL(file);
    }
    return "https://lh3.googleusercontent.com/aida-public/AB6AXuCEPVX2MaD5-NZy-Z9kSqVGCAWVkkhk1ckvcrdvnY07Q9brxMeCJ4wO8gZ4bT3WB81IL7E3KAWjxqmfHG97ZadPSt3wO29D1BwvZFkquLiDradht7j2ks40X735c21Thu65znmm3AWPXwFILyBB-VBRUDKS6FNFQ3U2Z3HSJxMsjJ88cFNbFSbSl60xRpvjniaPi7fFKYntSQSDs3VXVUapWQhVSFeIO9StdVw_WHN2cYEhVPkQBzQo-jk4kX-MjHQFvj7UNukmMn8w";
  }, [file]);

  const togglePlatform = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const platforms = [
    { id: 'linkedin', name: 'LinkedIn', desc: 'Professional Network', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'instagram', name: 'Instagram', desc: 'Visual Storytelling', icon: Camera, color: 'text-pink-600', bg: 'bg-pink-50' },
    { id: 'reddit', name: 'Reddit', desc: 'Community Engagement', icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'twitter', name: 'X / Twitter', desc: 'Real-time Updates', icon: Zap, color: 'text-slate-900', bg: 'bg-slate-100' },
  ];

  const OptionGroup = ({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (v: string) => void }) => (
    <div className="space-y-3">
      <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase px-1">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "px-5 py-3 min-h-12 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
              value === opt 
                ? "bg-primary text-white shadow-md scale-105" 
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-2xl mx-auto space-y-12 pb-40"
    >
      {/* Project Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm rotate-2 bg-white p-1">
            <img 
              src={previewUrl} 
              alt="Project thumbnail" 
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-on-surface font-bold text-2xl tracking-tight">Generated Project</h2>
            <p className="text-on-surface-variant text-sm mt-1">Ready to amplify your vision.</p>
          </div>
        </div>
        <button 
          onClick={() => setSelected(platforms.map(p => p.id))}
          className="text-primary font-bold text-sm hover:opacity-70 transition-opacity"
        >
          Select All
        </button>
      </div>

      {/* Customization Settings */}
      <div className="bg-surface-container-lowest p-8 rounded-[2.5rem] shadow-sm space-y-8">
        <OptionGroup 
          label="Tone" 
          options={['Professional', 'Casual', 'Witty', 'Inspirational']} 
          value={tone} 
          onChange={setTone} 
        />
        <OptionGroup 
          label="Style" 
          options={['Minimalist', 'Bold', 'Detailed', 'Storytelling']} 
          value={style} 
          onChange={setStyle} 
        />
        <OptionGroup 
          label="Length" 
          options={['Short', 'Medium', 'Long']} 
          value={length} 
          onChange={setLength} 
        />
      </div>

      {/* Platform List */}
      <div className="space-y-4">
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase px-4">Target Platforms</p>
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selected.includes(platform.id);
          return (
            <div 
              key={platform.id}
              onClick={() => togglePlatform(platform.id)}
              className="bg-surface-container-lowest p-8 rounded-3xl flex items-center justify-between hover:translate-y-[-2px] transition-all duration-300 cursor-pointer shadow-sm"
            >
              <div className="flex items-center gap-6">
                <div className={cn("w-14 h-14 flex items-center justify-center rounded-full", platform.bg, platform.color)}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-lg">{platform.name}</h3>
                  <p className="text-[10px] text-on-surface-variant font-bold tracking-widest uppercase mt-0.5">{platform.desc}</p>
                </div>
              </div>
              
              {/* Custom Toggle */}
              <div className={cn(
                "w-12 h-6 rounded-full relative transition-colors duration-300",
                isSelected ? "bg-primary" : "bg-slate-200"
              )}>
                <div className={cn(
                  "absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-300",
                  isSelected ? "translate-x-6" : "translate-x-0"
                )} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="fixed bottom-32 left-0 right-0 px-6 flex justify-center">
        <button 
          onClick={() => onGenerate({ platforms: selected, tone, style, length })}
          className="ethereal-gradient text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_24px_48px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3"
        >
          Generate Posts
          <Sparkles className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
