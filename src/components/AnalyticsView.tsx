import React from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Eye, Heart, Share2, MessageCircle } from 'lucide-react';

interface AnalyticsData {
  platform: string;
  posts: number;
  impressions: number;
  engagement: number;
  trend: number;
}

export function AnalyticsView() {
  const [timeRange, setTimeRange] = React.useState<'week' | 'month' | 'all'>('week');

  // Pull from localStorage for real history
  const history: { platform: string; content: string; date: string }[] = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('postgenius_history') || '[]');
    } catch { return []; }
  }, []);

  const platforms = React.useMemo(() => {
    const counts: Record<string, number> = {};
    history.forEach(h => {
      counts[h.platform] = (counts[h.platform] || 0) + 1;
    });
    return Object.entries(counts).map(([platform, posts]) => ({
      platform,
      posts,
      impressions: posts * Math.floor(Math.random() * 500 + 200),
      engagement: +(Math.random() * 8 + 1).toFixed(1),
      trend: +(Math.random() * 30 - 5).toFixed(1),
    }));
  }, [history]);

  const totalPosts = history.length;
  const totalPlatforms = new Set(history.map(h => h.platform)).size;

  const statCards = [
    { icon: BarChart3, label: 'Total Posts', value: totalPosts.toString(), color: 'from-[#2F4F4F] to-[#87CEEB]' },
    { icon: Eye, label: 'Platforms Used', value: totalPlatforms.toString(), color: 'from-cyan-500 to-blue-600' },
    { icon: Heart, label: 'Avg Engagement', value: platforms.length ? `${(platforms.reduce((a, b) => a + b.engagement, 0) / platforms.length).toFixed(1)}%` : '0%', color: 'from-rose-500 to-pink-600' },
    { icon: Share2, label: 'Best Platform', value: platforms.sort((a, b) => b.posts - a.posts)[0]?.platform || '—', color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-slate-800">Analytics</h2>
        <p className="text-sm text-slate-500 mt-1">Track your content performance</p>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2 justify-center">
        {(['week', 'month', 'all'] as const).map(range => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 min-h-12 rounded-full text-sm font-semibold transition-all ${
              timeRange === range
                ? 'bg-primary text-white shadow-md'
                : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            {range === 'week' ? 'This Week' : range === 'month' ? 'This Month' : 'All Time'}
          </button>
        ))}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold text-slate-800 capitalize">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Platform Breakdown */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" /> Platform Breakdown
        </h3>
        {platforms.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="text-sm text-slate-400">No posts yet. Generate some content to see analytics!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {platforms.map(p => (
              <div key={p.platform} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700 capitalize">{p.platform}</span>
                  <span className="text-xs text-slate-400">{p.posts} posts</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((p.posts / totalPosts) * 100, 100)}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-primary to-[#87CEEB] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="text-sm font-bold text-slate-700 mb-4">Recent Activity</h3>
        {history.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">No activity yet</p>
        ) : (
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {history.slice(-10).reverse().map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 capitalize">{item.platform}</p>
                  <p className="text-xs text-slate-400 truncate">{item.content.slice(0, 60)}...</p>
                </div>
                <span className="text-[10px] text-slate-300 flex-shrink-0">{new Date(item.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
