import React, { forwardRef } from 'react';
import { AppState } from '../types';
import { LOGO_URL } from '../logo';

interface CardPreviewProps {
  state: AppState;
}

export const CardPreview = forwardRef<HTMLDivElement, CardPreviewProps>(({ state }, ref) => {
  const { name, role, company, photoUrl, backgroundUrl, settings } = state;

  return (
    <div 
      ref={ref}
      style={{ width: '1080px', height: '1080px' }}
      className="relative bg-black overflow-hidden flex flex-col font-sans"
    >
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <img 
          src={backgroundUrl || 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1080&auto=format&fit=crop'} 
          alt="NYC Background" 
          crossOrigin="anonymous"
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale"
        />
        {/* Yellow gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/80 to-yellow-600/20" />
      </div>

      {/* Grid Overlay for Tech Vibe */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="absolute inset-0 z-10 flex flex-col p-[80px]">
        {/* Header */}
        <div className="flex justify-between items-start w-full">
          <img 
            src={LOGO_URL || "/api/logo"} 
            alt="NEXTPredict Summit" 
            className="h-[120px] max-w-[500px] w-auto object-contain" 
            crossOrigin="anonymous" 
            onError={(e) => {
              // Fallback text if logo fails to load
              e.currentTarget.style.display = 'none';
              const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
              if (nextSibling) nextSibling.style.display = 'flex';
            }}
          />
          <div style={{ display: LOGO_URL ? 'none' : 'flex' }} className="items-center">
            <span className="text-yellow-400 text-[60px] font-black italic tracking-tighter leading-none">NEXT</span>
            <span className="text-white text-[60px] font-light tracking-tighter leading-none">Predict</span>
          </div>

          <div className="text-right flex flex-col items-end">
            <div className="text-yellow-400 font-bold text-2xl uppercase tracking-[0.2em] mb-1">New York</div>
            <div className="text-white text-xl font-medium tracking-widest pl-4">OCT 22-23</div>
            <div className="text-slate-400 text-sm font-medium tracking-widest uppercase mt-4 max-w-[200px] text-right">
              Convene 30 Hudson Yards
            </div>
          </div>
        </div>

        {/* Main Content: Split Layout */}
        <div className="flex-1 flex items-center justify-between mt-[40px]">
          
          {/* Left: Text */}
          <div className="flex flex-col justify-center w-[55%] pr-8">
            <div className="mb-8">
              <span className="bg-yellow-400 text-black px-6 py-2 text-2xl font-black uppercase tracking-[0.25em]">
                I'm Attending
              </span>
            </div>
            
            <h1 className="text-white text-[95px] font-black leading-[0.9] tracking-tight uppercase mb-8 break-words text-wrap">
              {name || 'Jane Doe'}
            </h1>
            
            <div className="flex flex-col gap-2">
              <p className="text-yellow-400 text-3xl font-medium tracking-wide uppercase">
                {role || 'Global Director'}
              </p>
              <p className="text-slate-300 text-2xl font-light tracking-widest uppercase">
                {company || 'Acme Corp'}
              </p>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="w-[45%] flex justify-end">
            <div className="relative w-[380px] h-[480px]">
              {/* Decorative offset border */}
              <div className="absolute inset-0 border-4 border-yellow-400 translate-x-[20px] translate-y-[20px] z-0" />
              
              <div className="w-full h-full bg-[#111] relative z-10 overflow-hidden outline outline-4 outline-black border border-[#222]">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Attendee"
                    crossOrigin="anonymous"
                    className="w-full h-full object-cover"
                    style={{
                      transform: `scale(${settings.zoom}) translate(${settings.offsetX - 50}%, ${settings.offsetY - 50}%)`,
                      transformOrigin: 'center',
                      filter: `
                        grayscale(${settings.grayscale}%) 
                        brightness(${settings.brightness}%) 
                        contrast(${settings.contrast}%) 
                        saturate(${settings.saturate}%)
                      `
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-[#111] opacity-80">
                     <svg className="w-24 h-24 text-[#333] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                     <p className="text-[#555] font-bold text-xl uppercase tracking-widest">Photo</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Footer Area / Additional Branding */}
        <div className="mt-auto pt-10 flex justify-between items-end w-full border-t border-white/20">
           <div className="text-slate-400 text-xl tracking-[0.3em] font-light uppercase">
             #NEXTPREDICT
           </div>
           <div className="text-slate-400 text-xl tracking-widest font-light">
             NEXTPREDICT.IO
           </div>
        </div>

      </div>
    </div>
  );
});

CardPreview.displayName = 'CardPreview';
