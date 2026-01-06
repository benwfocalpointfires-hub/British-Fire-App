
import React from 'react';
import { AppState, Category } from '../types';

interface HomeViewProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  togglePower: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ state, setState, togglePower }) => {
  const handleTempChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, temp: { ...prev.temp, target: parseFloat(e.target.value) } }));
  };

  const handleSoundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, sound: { ...prev.sound, volume: parseInt(e.target.value) } }));
  };

  const selectCategory = (cat: Category) => {
    setState(prev => ({ ...prev, activeCategory: cat }));
  };

  const isPresetMode = state.activeCategory === Category.CREATE_PRESET || state.isCreatingPreset;
  // Normalized temperature percentage for the UI bar (15 to 32 range as set in slider)
  const tempPercent = ((state.temp.target - 15) / (32 - 15)) * 100;

  return (
    <div className="flex-1 flex flex-col gap-2 w-full max-w-md mx-auto h-full overflow-hidden">
      
      {/* Upper Grid Area: Left column of buttons and Right tall Thermometer */}
      <div className="flex gap-3 flex-[5] min-h-0 items-stretch">
        {/* Feature Buttons Column */}
        <div className="flex flex-col gap-2 flex-1 min-h-0">
          <button 
            onClick={() => selectCategory(Category.FLAME)}
            className="glass-blur rounded-[1.25rem] flex-1 w-full flex flex-col items-center justify-center transition-all duration-300 active:scale-[0.96] border border-white/5 hover:border-white/20"
          >
            <span className="material-symbols-outlined text-2xl text-primary mb-1">local_fire_department</span>
            <span className="text-[11px] text-white font-normal uppercase tracking-tighter opacity-70">Flame</span>
          </button>
          <button 
            onClick={() => selectCategory(Category.FUEL_BED)}
            className="glass-blur rounded-[1.25rem] flex-1 w-full flex flex-col items-center justify-center transition-all duration-300 active:scale-[0.96] border border-white/5 hover:border-white/20"
          >
            <span className="material-symbols-outlined text-2xl text-primary mb-1">grain</span>
            <span className="text-[11px] text-white font-normal uppercase tracking-tighter opacity-70">Fuel Bed</span>
          </button>
          <button 
            onClick={() => selectCategory(Category.LIGHT)}
            className="glass-blur rounded-[1.25rem] flex-1 w-full flex flex-col items-center justify-center transition-all duration-300 active:scale-[0.96] border border-white/5 hover:border-white/20"
          >
            <span className="material-symbols-outlined text-2xl text-primary mb-1">arrow_downward</span>
            <span className="text-[11px] text-white font-normal uppercase tracking-tighter opacity-70">Downlights</span>
          </button>
        </div>

        {/* Extended Tall Thermometer Pill */}
        <div className="w-24 h-full min-h-0">
          <div className="glass-blur rounded-[2rem] h-full flex flex-col items-center py-5 relative overflow-hidden border border-white/10 group">
            {/* Navigatable Temperature Icon */}
            <button 
              onClick={() => selectCategory(Category.TEMPERATURE)}
              className="z-20 mb-2 transition-transform active:scale-90 hover:scale-110"
              title="Expand Temperature Settings"
            >
              <span className="material-symbols-outlined text-primary text-xl opacity-60 drop-shadow-[0_0_8px_rgba(113,129,109,0.5)]">thermostat</span>
            </button>
            
            {/* Extended Slider Container */}
            <div className="relative flex-1 w-full flex justify-center items-end pb-3 min-h-0">
              {/* Central Background Tube */}
              <div className="absolute top-2 bottom-8 w-4 bg-white/5 rounded-t-full border border-white/5 backdrop-blur-sm z-0"></div>
              
              {/* Bulb Base */}
              <div className="absolute bottom-1 w-12 h-12 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm z-0"></div>
              
              {/* Animated Color Bulb */}
              <div className="absolute bottom-[10px] w-8 h-8 bg-accent-orange rounded-full z-10 shadow-[0_0_20px_rgba(255,107,0,0.4)] transition-colors duration-500"></div>
              
              {/* Vertical Fill Level */}
              <div 
                className="absolute bottom-[38px] w-2 bg-accent-orange rounded-t-full z-10 shadow-[0_0_15px_rgba(255,107,0,0.3)] transition-all duration-300 ease-out"
                style={{ height: `${tempPercent * 0.75}%`, minHeight: '4px' }}
              ></div>
              
              {/* Visual Ticks */}
              <div className="absolute top-4 bottom-14 right-[50%] translate-x-5 flex flex-col justify-between py-2 opacity-20 pointer-events-none h-[75%]">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`h-[1px] bg-white ${i % 2 === 0 ? 'w-3' : 'w-1.5'}`}></div>
                ))}
              </div>

              {/* Functional Invisible Slider */}
              <input 
                type="range" min="15" max="32" step="0.5" value={state.temp.target}
                onChange={handleTempChange}
                className="absolute inset-0 w-[500%] h-full opacity-0 cursor-pointer z-30 origin-center"
                style={{ transform: 'rotate(-90deg)' }}
              />
            </div>
            
            <button 
              onClick={() => selectCategory(Category.TEMPERATURE)}
              className="flex items-start z-10 mt-1 active:scale-95 transition-transform"
            >
               <span className="text-lg text-white font-bold tabular-nums">{Math.round(state.temp.target)}</span>
               <span className="text-xs text-white/40 font-bold mt-0.5 ml-0.5">°</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sound Control Bar */}
      <div className="h-20 glass-blur rounded-[1.25rem] w-full flex flex-col justify-center px-6 border border-white/5 shadow-lg shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {/* Navigatable Sound Icon */}
            <button 
              onClick={() => selectCategory(Category.SOUND)}
              className="flex items-center gap-2 group/sound transition-transform active:scale-95"
              title="Expand Sound Settings"
            >
              <span className="material-symbols-outlined text-lg text-primary transition-transform group-hover/sound:scale-110">volume_up</span>
              <span className="text-[10px] font-bold tracking-widest text-white/60 uppercase transition-colors group-hover/sound:text-white">Sound</span>
            </button>
          </div>
          <span className="text-xs font-bold text-white tabular-nums">{state.sound.volume}%</span>
        </div>
        <div className="w-full h-4 relative flex items-center">
          <div className="w-full h-[3px] bg-white/10 rounded-full"></div>
          <div className="absolute left-0 h-[3px] bg-primary rounded-full transition-all" style={{ width: `${state.sound.volume}%` }}></div>
          <input 
            type="range" min="0" max="100" value={state.sound.volume}
            onChange={handleSoundChange}
            className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-[3px] border-[#292D2C] -translate-x-1/2 pointer-events-none transition-transform"
            style={{ left: `${state.sound.volume}%` }}
          ></div>
        </div>
      </div>

      {/* Utility Grid: Timer/Schedule - Hidden in Preset Mode */}
      {!isPresetMode && (
        <div className="h-16 grid grid-cols-2 gap-3 shrink-0">
          <button 
            onClick={() => selectCategory(Category.TIMER)}
            className="glass-blur rounded-[1.25rem] flex items-center justify-center gap-2 transition-all active:scale-[0.96] border border-white/5"
          >
            <span className="material-symbols-outlined text-xl text-primary">timer</span>
            <span className="text-xs text-white/80 font-medium">Timer</span>
          </button>
          <button 
            onClick={() => selectCategory(Category.SCHEDULE)}
            className="glass-blur rounded-[1.25rem] flex items-center justify-center gap-2 transition-all active:scale-[0.96] border border-white/5"
          >
            <span className="material-symbols-outlined text-xl text-primary">schedule</span>
            <span className="text-xs text-white/80 font-medium">Events</span>
          </button>
        </div>
      )}

      {/* Footer Navigation Button */}
      <div className="flex justify-center shrink-0 mt-1 mb-2">
        <button 
          onClick={() => selectCategory(Category.HOME)}
          className="w-11 h-11 rounded-full glass-blur flex items-center justify-center relative active:scale-90 transition-transform border border-white/10 shadow-2xl"
        >
          <span className="material-symbols-outlined text-primary text-xl">home</span>
        </button>
      </div>

    </div>
  );
};

export default HomeView;
