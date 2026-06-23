import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download, LayoutTemplate, Share2 } from 'lucide-react';
import { AppState, DEFAULT_SETTINGS } from './types';
import { Controls } from './components/Controls';
import { CardPreview } from './components/CardPreview';

export default function App() {
  const [state, setState] = useState<AppState>({
    name: '',
    role: '',
    company: '',
    photoUrl: null,
    settings: DEFAULT_SETTINGS,
  });

  const [isExporting, setIsExporting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  React.useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        setScale(width / 1080);
      }
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  const updateState = useCallback((updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateSettings = useCallback((updates: Partial<AppState['settings']>) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }));
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsExporting(true);
      
      const element = cardRef.current;
      // The element is now exactly 1080x1080, so pixelRatio defaults to 1 for a 1080x1080 export.
      
      const dataUrl = await toPng(element, {
        pixelRatio: 1,
        cacheBust: true,
        style: {
          transform: 'none',
        }
      });
      
      const link = document.createElement('a');
      link.download = `NEXTPredict-I-Am-Attending-${state.name.replace(/\s+/g, '-') || 'Card'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('Failed to generate the image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#eee] selection:bg-yellow-400 selection:text-black font-sans overflow-x-hidden">
      
      {/* Navbar Minimalist */}
      <nav className="bg-[#0a0a0a] border-b border-[#222] px-6 pl-8 py-4 sticky top-0 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center shadow-[0_0_15px_rgba(252,203,59,0.3)]">
             <LayoutTemplate className="w-4 h-4 text-slate-900 font-bold" />
           </div>
           <h1 className="font-semibold text-lg tracking-tight">
             <span className="text-white">NEXT</span><span className="text-yellow-400">Predict</span>
             <span className="text-slate-500 font-medium ml-2 text-sm border-l border-slate-700 pl-2">Social Hub</span>
           </h1>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        <div className="mb-8 mt-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
            Generate your Attendee Card
          </h1>
          <p className="text-[#888] max-w-2xl text-lg">
            Customize your professional &quot;I'm Attending&quot; artwork for the upcoming Summit.
            Download instantly for LinkedIn or Twitter without watermarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 xl:gap-12 items-start mt-4">
          
          {/* Left Panel: Sticky Preview Canvas */}
          <div className="order-1 flex flex-col items-center lg:items-start sticky top-[72px] lg:top-24 z-30 bg-black/90 backdrop-blur-md pb-4 pt-4 lg:py-0">
             
             {/* Action Bar Above Canvas */}
             <div className="w-full max-w-[480px] xl:max-w-[540px] flex flex-row items-center justify-between mb-3 lg:mb-6 bg-[#111] border border-[#222] p-2.5 lg:p-4 rounded-xl lg:rounded-2xl shadow-sm gap-2 mx-auto lg:mx-0">
               <div className="flex items-center gap-1.5 text-xs lg:text-sm text-[#888]">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">Live Preview active</span>
                  <span className="sm:hidden">Preview</span>
               </div>
               
               <button
                 onClick={handleDownload}
                 disabled={isExporting}
                 className="px-4 lg:px-6 py-2 lg:py-2.5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 text-xs lg:text-sm font-bold rounded-lg lg:rounded-xl transition-all shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] active:scale-95 disabled:hover:scale-100 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
               >
                 {isExporting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                      Wait...
                    </>
                 ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      Save
                    </>
                 )}
               </button>
             </div>

             {/* The Canvas - scale exactly from 1080px to fit view */}
             <div 
               ref={wrapperRef}
               className="w-full max-w-[480px] xl:max-w-[540px] aspect-square bg-[#111] border border-[#333] rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative mx-auto lg:mx-0"
             >
                <div 
                  className="absolute top-0 left-0 origin-top-left"
                  style={{ transform: `scale(${scale})` }}
                >
                  <CardPreview ref={cardRef} state={state} />
                </div>
             </div>
             
             <p className="hidden lg:flex text-center w-full max-w-lg lg:max-w-none text-xs text-slate-500 mt-4 items-center justify-center gap-1.5">
               <Share2 className="w-3 h-3" />
               Artwork generates as 1080x1080 HD PNG
             </p>
          </div>

          {/* Right Panel: Controls */}
          <div className="order-2 w-full max-w-lg mx-auto lg:max-w-none">
            <Controls 
              state={state} 
              updateState={updateState} 
              updateSettings={updateSettings} 
            />
          </div>

        </div>
      </main>
    </div>
  );
}

