import React from 'react';
import { motion } from 'motion/react';
import { Copy, Trash2, FolderOpen, Search, Check } from 'lucide-react';

interface SavedPost {
  platform: string;
  content: string;
  date: string;
}

export function CollectionsView() {
  const [posts, setPosts] = React.useState<SavedPost[]>([]);
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState<string>('all');
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  React.useEffect(() => {
    try {
      const history = JSON.parse(localStorage.getItem('postgenius_history') || '[]');
      setPosts(history);
    } catch { setPosts([]); }
  }, []);

  const platforms = React.useMemo(() => {
    const set = new Set(posts.map(p => p.platform));
    return ['all', ...Array.from(set)];
  }, [posts]);

  const filtered = React.useMemo(() => {
    return posts
      .filter(p => filter === 'all' || p.platform === filter)
      .filter(p => !search || p.content.toLowerCase().includes(search.toLowerCase()) || p.platform.toLowerCase().includes(search.toLowerCase()))
      .reverse();
  }, [posts, filter, search]);

  const handleCopy = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const handleDelete = (idx: number) => {
    const realIdx = posts.length - 1 - idx;
    const updated = [...posts];
    updated.splice(realIdx, 1);
    setPosts(updated);
    localStorage.setItem('postgenius_history', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setPosts([]);
    localStorage.setItem('postgenius_history', JSON.stringify([]));
  };

  const platformColors: Record<string, string> = {
    twitter: 'bg-sky-100 text-sky-700',
    linkedin: 'bg-blue-100 text-blue-700',
    instagram: 'bg-pink-100 text-pink-700',
    reddit: 'bg-orange-100 text-orange-700',
    facebook: 'bg-teal-100 text-teal-700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-slate-800">Collections</h2>
        <p className="text-sm text-slate-500 mt-1">Your saved generated posts</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
        <input
          type="text"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 min-h-12 bg-white rounded-2xl border border-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
        />
      </div>

      {/* Platform Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {platforms.map(p => (
          <button
            key={p}
            onClick={() => setFilter(p)}
            className={`px-4 py-2 min-h-10 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 capitalize ${
              filter === p
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Posts Count & Clear */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">{filtered.length} post{filtered.length !== 1 ? 's' : ''}</p>
        {posts.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Posts List */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <FolderOpen className="w-14 h-14 text-slate-200 mx-auto mb-4" />
          <p className="text-sm text-slate-400 font-medium">No saved posts yet</p>
          <p className="text-xs text-slate-300 mt-1">Generated posts will appear here</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post, i) => (
            <motion.div
              key={`${post.platform}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold capitalize ${platformColors[post.platform] || 'bg-slate-100 text-slate-600'}`}>
                  {post.platform}
                </span>
                <span className="text-[10px] text-slate-300">{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-3 whitespace-pre-wrap">{post.content}</p>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => handleCopy(post.content, i)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-50 transition-colors text-slate-400"
                >
                  {copiedIdx === i ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleDelete(i)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors text-slate-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
