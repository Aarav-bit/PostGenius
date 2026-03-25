import React from 'react';
import { Upload, Network, BarChart3, Image as ImageIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomNavProps {
  activeTab: 'upload' | 'hub' | 'analytics' | 'collections';
  onTabChange: (tab: 'upload' | 'hub' | 'analytics' | 'collections') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'upload', icon: Upload, label: 'Upload' },
    { id: 'hub', icon: Network, label: 'Hub' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'collections', icon: ImageIcon, label: 'Collections' },
  ] as const;

  return (
    <nav className="fixed bottom-8 left-0 right-0 z-50 flex justify-center items-center px-6">
      <div className="bg-white/70 backdrop-blur-2xl shadow-[0_24px_48px_rgba(79,70,229,0.12)] rounded-full px-4 py-2 flex items-center gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 active:scale-90",
                isActive 
                  ? "bg-primary text-white shadow-lg" 
                  : "text-slate-400 hover:text-primary"
              )}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
