import React, { useState } from 'react';
import { AppState, ImageSettings } from '../types';
import { PhotoUploader } from './PhotoUploader';
import { Slider } from './ui/Slider';
import { Settings2, User, ZoomIn, Sun, Contrast, Droplet, Palette, Sparkles } from 'lucide-react';

interface ControlsProps {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  updateSettings: (updates: Partial<ImageSettings>) => void;
}

export function Controls({ state, updateState, updateSettings }: ControlsProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Photo Section */}
      <section className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-yellow-500" />
          Attendee Details
        </h2>
        
        <PhotoUploader 
          currentPhoto={state.photoUrl} 
          onPhotoSelect={(url) => updateState({ photoUrl: url })} 
        />

        <div className="space-y-4 mt-6">
          <div>
            <label className="block text-sm font-medium text-[#888] mb-1.5">Full Name</label>
            <input
              type="text"
              value={state.name}
              onChange={(e) => updateState({ name: e.target.value })}
              placeholder="e.g. Jane Doe"
              className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#888] mb-1.5">Role</label>
              <input
                type="text"
                value={state.role}
                onChange={(e) => updateState({ role: e.target.value })}
                placeholder="CEO"
                className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#888] mb-1.5">Company</label>
              <input
                type="text"
                value={state.company}
                onChange={(e) => updateState({ company: e.target.value })}
                placeholder="Acme Corp"
                className="w-full bg-[#0a0a0a] border border-[#333] text-white rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Adjustments Section */}
      <section className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-yellow-500" />
          Photo Adjustments
        </h2>

        <div className="space-y-6">
          <Slider
            label="Zoom"
            icon={<ZoomIn className="w-4 h-4" />}
            value={state.settings.zoom}
            min={0.5}
            max={3}
            step={0.05}
            onChange={(val) => updateSettings({ zoom: val })}
          />
          
          <div className="grid grid-cols-2 gap-6">
            <Slider
              label="Position X"
              value={state.settings.offsetX}
              min={0}
              max={100}
              onChange={(val) => updateSettings({ offsetX: val })}
            />
             <Slider
              label="Position Y"
              value={state.settings.offsetY}
              min={0}
              max={100}
              onChange={(val) => updateSettings({ offsetY: val })}
            />
          </div>

          <div className="w-full h-px bg-[#333] my-4" />

          <Slider
            label="Grayscale"
            icon={<Droplet className="w-4 h-4" />}
            value={state.settings.grayscale}
            min={0}
            max={100}
            onChange={(val) => updateSettings({ grayscale: val })}
          />
          <Slider
            label="Brightness"
            icon={<Sun className="w-4 h-4" />}
            value={state.settings.brightness}
            min={50}
            max={150}
            onChange={(val) => updateSettings({ brightness: val })}
          />
          <Slider
            label="Contrast"
            icon={<Contrast className="w-4 h-4" />}
            value={state.settings.contrast}
            min={50}
            max={150}
            onChange={(val) => updateSettings({ contrast: val })}
          />
          <Slider
            label="Saturation"
            icon={<Palette className="w-4 h-4" />}
            value={state.settings.saturate}
            min={0}
            max={200}
            onChange={(val) => updateSettings({ saturate: val })}
          />
        </div>
      </section>
    </div>
  );
}
