
import React, { useState } from 'react';
import { AppState, Category, Preset } from '../types';

interface ScheduleViewProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ state, setState }) => {
  const [openMenuIdx, setOpenMenuIdx] = useState<number | null>(null);

  const activatePreset = (idx: number) => {
    setState(prev => {
      const newPresets = prev.presets.map((p, i) => ({
        ...p,
        active: i === idx
      }));
      
      const activatedPreset = newPresets[idx];
      
      if (activatedPreset.settings) {
        return {
          ...prev,
          presets: newPresets,
          flame: { ...activatedPreset.settings.flame },
          temp: { ...prev.temp, target: activatedPreset.settings.temp },
          fuelBed: { ...activatedPreset.settings.fuelBed },
          light: { ...activatedPreset.settings.light },
          sound: { ...activatedPreset.settings.sound }
        };
      }
      return { ...prev, presets: newPresets };
    });
    setOpenMenuIdx(null);
  };

  const deletePreset = (idx: number) => {
    setState(prev => ({
      ...prev,
      presets: prev.presets.filter((_, i) => i !== idx)
    }));
    setOpenMenuIdx(null);
  };

  const editPreset = (idx: number) => {
    const preset = state.presets[idx];
    if (preset.settings) {
      setState(prev => ({
        ...prev,
        activeCategory: Category.CREATE_PRESET,
        isCreatingPreset: true,
        flame: { ...preset.settings!.flame },
        temp: { ...prev.temp, target: preset.settings!.temp },
        fuelBed: { ...preset.settings!.fuelBed },
        light: { ...preset.settings!.light },
        sound: { ...preset.settings!.sound }
      }));
    }
    setOpenMenuIdx(null);
  };

  return (
    <div className="flex-grow flex flex-col overflow-hidden relative">
      <h2 className="text-white text-[11px] font-bold uppercase tracking-widest text-center mb-3 opacity-60">Personalizations</h2>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pb-2">
        {state.presets.map((p, idx) => (
          <div 
            key={idx}
            className="relative"
          >
            <div 
              onClick={() => activatePreset(idx)}
              className={`rounded-2xl p-4 flex items-center gap-4 bg-black/40 border transition-all cursor-pointer active:scale-[0.98] ${
                  p.active 
                    ? 'ring-1 ring-primary/40 bg-primary/10 border-primary/20 shadow-[0_4px_20px_rgba(0,0,0,0.3)]' 
                    : 'border-white/5 shadow-lg'
              }`}
            >
              {/* Left Side: 3 dots menu replaces the icon */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuIdx(openMenuIdx === idx ? null : idx);
                }}
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shrink-0 ${
                  openMenuIdx === idx ? 'bg-primary text-white shadow-lg' : 'bg-white/5 text-white/30 hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">more_vert</span>
              </button>

              <div className="flex flex-col flex-1 min-w-0">
                <p className={`text-[13px] font-bold truncate transition-colors ${p.active ? 'text-white' : 'text-white/80'}`}>{p.name}</p>
                <p className="text-white/30 text-[10px] font-medium tracking-tight truncate">{p.desc}</p>
              </div>

              {p.active && (
                <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#71816D]"></div>
              )}
            </div>

            {/* Sub-box Details/Action Menu */}
            {openMenuIdx === idx && (
              <div className="absolute top-[10%] left-[54px] z-50 w-56 glass-blur active-glass rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 border border-primary/30 animate-in fade-in zoom-in-95 duration-200 origin-top-left">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="material-symbols-outlined text-[14px] text-primary">info</span>
                    <p className="text-white/60 text-[9px] uppercase font-bold tracking-[0.1em]">Details</p>
                  </div>
                  
                  {p.settings ? (
                    <div className="space-y-1.5 bg-black/20 rounded-xl p-2.5">
                      <div className="flex justify-between items-center text-[10px] text-white/90">
                        <span className="font-light">Temp Target</span>
                        <span className="font-bold text-primary">{p.settings.temp}°C</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-white/90">
                        <span className="font-light">Sound Vol</span>
                        <span className="font-bold text-primary">{p.settings.sound.volume}%</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-white/90">
                        <span className="font-light">Flame Speed</span>
                        <span className="font-bold text-primary">{p.settings.flame.speed}%</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-white/90">
                        <span className="font-light">Fuel Motion</span>
                        <span className="font-bold text-primary truncate max-w-[50px]">{p.settings.fuelBed.movement}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-white/20 text-[9px] italic p-1">No custom settings saved</p>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => editPreset(idx)}
                    className="flex items-center gap-2.5 w-full p-3 rounded-xl bg-white/5 text-white text-[11px] font-bold hover:bg-white/10 active:scale-95 transition-all border border-white/5"
                  >
                    <span className="material-symbols-outlined text-lg text-primary">edit_square</span>
                    Edit Configuration
                  </button>
                  <button 
                    onClick={() => deletePreset(idx)}
                    className="flex items-center gap-2.5 w-full p-3 rounded-xl bg-red-500/10 text-red-400 text-[11px] font-bold hover:bg-red-500/20 active:scale-95 transition-all border border-red-500/10"
                  >
                    <span className="material-symbols-outlined text-lg">delete_sweep</span>
                    Delete Preset
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        <button 
          onClick={() => setState(prev => ({ ...prev, activeCategory: Category.CREATE_PRESET, isCreatingPreset: true }))}
          className="w-full h-16 border border-dashed border-white/20 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-all group active:scale-[0.98] mt-2"
        >
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-primary text-xl">add</span>
          </div>
          <span className="text-white/50 font-bold text-[11px] uppercase tracking-widest">Create New Preset</span>
        </button>
      </div>

      {/* Overlay to close menu when clicking outside */}
      {openMenuIdx !== null && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setOpenMenuIdx(null)}
        />
      )}
    </div>
  );
};

export default ScheduleView;
