import React from 'react';
import { AnimatePresence } from 'motion/react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { PlatformView } from './components/PlatformView';
import { ResultsView } from './components/ResultsView';
import { AnalyticsView } from './components/AnalyticsView';
import { CollectionsView } from './components/CollectionsView';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';

type View = 'upload' | 'hub' | 'analytics' | 'collections';

export default function App() {
  const [userName, setUserName] = React.useState<string | null>(() => localStorage.getItem('postgenius_username'));
  const [showSplash, setShowSplash] = React.useState(!!userName); // Only show splash if user already onboarded
  const [activeTab, setActiveTab] = React.useState<View>('upload');
  const [step, setStep] = React.useState<number>(0); // 0: Home, 1: Platforms, 2: Results

  const [uploadedFile, setUploadedFile] = React.useState<File | null>(null);
  const [generatedPosts, setGeneratedPosts] = React.useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleBack = () => {
    if (activeTab !== 'upload') {
      setActiveTab('upload');
      setStep(0);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleGenerate = async (options: { platforms: string[], tone: string, style: string, length: string }) => {
    setIsGenerating(true);
    setStep(2);
    setGeneratedPosts({});

    try {
      const groqKey = import.meta.env.VITE_GROQ_API_KEY;

      const creativitySeed = Math.random().toString(36).substring(2, 8);

      const prompt = `You are a modern, top-tier social media copywriter (think fast-growing startups, trendy creators, and modern brands). Generate unique, engaging posts for these platforms: ${options.platforms.join(', ')}.

STYLE GUIDELINES:
- Tone: ${options.tone}
- Style: ${options.style} (must feel authentic, not AI-generated)
- Length: ${options.length}

CONTEXT: Write an engaging, highly-relatable modern post about everyday productivity, creativity, lifestyle, or personal growth. DO NOT hallucinate details about sunny weather, mornings, or generic sunshine metaphors. Act like a real, cool human sharing thoughts.

CRITICAL RULES:
1. NEVER mention any filename, file extensions.
2. Each platform's post MUST be completely unique — different hooks, angles, and wording.
3. Use platform-specific modern best practices:
   - Twitter/X: Punchy, highly relatable, 1-2 line breaks, zero or 1 hashtag.
   - LinkedIn: Hook-driven storytelling. Short punchy paragraphs. Zero emojis. 2-3 hashtags max at the end.
   - Instagram: Aesthetic and minimalist caption. Strong hook first. One or two emojis max in the entire post. NO hashtag walls. Use exactly 3 highly specific, niche hashtags at the very bottom. 
   - Reddit: Conversational, raw, zero emojis. Start a debate or ask a genuine question.
   - Facebook: Story-driven, aimed at community interaction.
4. NO CHEESY AI PHRASES like "Morning sunshine", "Soak up the sun", "Unlock your potential", or "Let your imagination run wild".
5. Start each post with a strong hook that stops the scroll.
6. Creativity seed: ${creativitySeed}

Output ONLY a valid JSON object where keys are lowercase platform names and values are the post strings. No markdown, no explanation.`;

      const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      };

      let messagesContent: any = prompt;
      let model = 'llama-3.3-70b-versatile';

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: messagesContent }],
          temperature: 0.7,
          response_format: { type: "json_object" }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || `Groq API Error: ${response.status}`);
      }
      const text = data.choices?.[0]?.message?.content;
      if (!text) throw new Error("No response from Groq. Try again.");
      const parsed = JSON.parse(text);
      setGeneratedPosts(parsed);

      // Save to localStorage for Analytics & Collections
      try {
        const history = JSON.parse(localStorage.getItem('postgenius_history') || '[]');
        const now = new Date().toISOString();
        Object.entries(parsed).forEach(([platform, content]) => {
          if (platform !== 'error') {
            history.push({ platform, content, date: now });
          }
        });
        localStorage.setItem('postgenius_history', JSON.stringify(history));
      } catch (e) { console.warn('Failed to save history', e); }
    } catch (err: any) {
      console.error(err);
      setGeneratedPosts({ error: err.message || "Failed to generate posts." });
    } finally {
      setIsGenerating(false);
    }
  };

  const renderContent = () => {
    // Analytics and Collections are top-level tabs
    if (activeTab === 'analytics') return <AnalyticsView />;
    if (activeTab === 'collections') return <CollectionsView />;

    // Upload tab uses step-based navigation
    switch (step) {
      case 0:
        return <HomeView onUpload={(file) => { setUploadedFile(file); setStep(1); }} />;
      case 1:
        return <PlatformView onGenerate={handleGenerate} file={uploadedFile} />;
      case 2:
        return <ResultsView posts={generatedPosts} isGenerating={isGenerating} onRegenerate={() => setStep(1)} />;
      default:
        return <HomeView onUpload={(file) => { setUploadedFile(file); setStep(1); }} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {!userName && (
          <OnboardingScreen
            onComplete={(name) => {
              setUserName(name);
              setShowSplash(true);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {userName && showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="min-h-screen bg-surface selection:bg-primary/10">
        <TopBar
          onBack={handleBack}
          showBack={step > 0 || activeTab !== 'upload'}
          userName={userName || 'User'}
        />

        <main className="pt-28 pb-32 px-2 max-w-md mx-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </main>

        {/* Watermark */}
        <div className="fixed bottom-24 left-0 right-0 flex justify-center pointer-events-none z-40">
          <span className="text-[10px] font-medium text-slate-300/60 tracking-widest uppercase">Aarav-bit</span>
        </div>

        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            if (tab === 'upload') setStep(0);
          }}
        />
      </div>
    </>
  );
}
