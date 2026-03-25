import React from 'react';
import { ArrowLeft, Trash2, Info, X, ChevronDown } from 'lucide-react';

interface TopBarProps {
  onBack?: () => void;
  showBack?: boolean;
  userName?: string;
}

const AVATAR_OPTIONS = [
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Aarav',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Leo',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Luna',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Max',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Zoe',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Kai',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Nova',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Milo',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Ruby',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Finn',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Ella',
  'https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Sage',
];

const DEFAULT_AVATAR = AVATAR_OPTIONS[0];

export function TopBar({ onBack, showBack = true, userName = 'User' }: TopBarProps) {
  const [showProfile, setShowProfile] = React.useState(false);
  const [showAvatars, setShowAvatars] = React.useState(false);
  const [avatar, setAvatar] = React.useState(() => localStorage.getItem('postgenius_avatar') || DEFAULT_AVATAR);
  const profileRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false);
        setShowAvatars(false);
      }
    };
    if (showProfile) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showProfile]);

  const postCount = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('postgenius_history') || '[]').length;
    } catch { return 0; }
  }, [showProfile]);

  const platformCount = React.useMemo(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem('postgenius_history') || '[]').map((p: any) => p.platform)).size;
    } catch { return 0; }
  }, [showProfile]);

  const handleSelectAvatar = (url: string) => {
    setAvatar(url);
    localStorage.setItem('postgenius_avatar', url);
    setShowAvatars(false);
  };

  const handleClearHistory = () => {
    localStorage.setItem('postgenius_history', JSON.stringify([]));
    setShowProfile(false);
    window.location.reload();
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-nav shadow-[0_24px_48px_rgba(79,70,229,0.06)]" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className="flex items-center justify-between px-4 py-3 w-full max-w-md mx-auto">
        {/* Left: Back button or spacer */}
        <div className="w-11 h-11 flex items-center justify-center flex-shrink-0">
          {showBack && (
            <button 
              onClick={onBack}
              className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-surface-container-low transition-colors active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          )}
        </div>

        {/* Center: Logo + Title */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          <img src="/logo.png" alt="PostGenius" className="w-8 h-8 rounded-xl shadow-sm" />
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">PostGenius</h1>
        </div>

        <div className="relative" ref={profileRef}>
          <button 
            onClick={() => { setShowProfile(!showProfile); setShowAvatars(false); }}
            className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary/10 active:scale-95 transition-transform"
          >
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </button>

          {showProfile && (
            <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-[100]">
              {/* User Info */}
              <div className="p-4 bg-gradient-to-br from-primary/5 to-surface-container-low border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0 bg-white">
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-slate-800">{userName}</p>
                    <p className="text-xs text-slate-400">Content Creator</p>
                  </div>
                  <button onClick={() => setShowProfile(false)} className="ml-auto w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/60">
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
                <div className="mt-3 flex gap-6">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{postCount}</p>
                    <p className="text-[10px] text-slate-400">Posts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{platformCount}</p>
                    <p className="text-[10px] text-slate-400">Platforms</p>
                  </div>
                </div>
              </div>

              {/* Avatar Picker */}
              <div className="p-3 border-b border-slate-50">
                <button
                  onClick={() => setShowAvatars(!showAvatars)}
                  className="w-full flex items-center justify-between px-3 py-2.5 min-h-11 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                >
                  <span>Change Avatar</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showAvatars ? 'rotate-180' : ''}`} />
                </button>
                {showAvatars && (
                  <div className="grid grid-cols-4 gap-2 mt-2 px-1">
                    {AVATAR_OPTIONS.map((url) => (
                      <button
                        key={url}
                        onClick={() => handleSelectAvatar(url)}
                        className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all active:scale-90 ${
                          avatar === url ? 'border-primary shadow-md scale-105' : 'border-slate-100 hover:border-primary/30'
                        }`}
                      >
                        <img src={url} alt="Avatar" className="w-full h-full object-cover bg-slate-50" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <button
                  onClick={handleClearHistory}
                  className="w-full flex items-center gap-3 px-3 py-2.5 min-h-11 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All History
                </button>
                <div className="flex items-center gap-3 px-3 py-2.5 min-h-11 rounded-xl text-sm text-slate-500">
                  <Info className="w-4 h-4" />
                  <span>PostGenius v1.0</span>
                  <span className="ml-auto text-[10px] text-slate-300">by Aarav-bit</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
