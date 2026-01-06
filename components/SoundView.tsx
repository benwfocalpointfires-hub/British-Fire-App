
import React from 'react';
import { AppState } from '../types';

interface SoundViewProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const SoundView: React.FC<SoundViewProps> = ({ state, setState }) => {
  const presets = ['Crackling', 'Soft Ember', 'Burning Log', 'Campfire'];

  return (
    <div className="flex-grow flex flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-0.5 mb-2 text-primary shrink-0">
        <span className="material-symbols-outlined text-2xl drop-shadow-[0_0_8px_rgba(113,129,109,0.8)]">volume_up</span>
        <h2 className="text-white text-[10px] font-medium tracking-wide uppercase opacity-70">Sound Level</h2>
      </div>

      <div className="w-full mb-4 shrink-0 px-1">
        <div className="flex justify-between items-end mb-1">
          <label className="text-white/50 text-[9px] font-light">Volume</label>
          <span className="text-primary text-[9px] font-medium">{state.sound.volume}%</span>
        </div>
        <div className="relative">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={state.sound.volume}
            onChange={(e) => setState(prev => ({ ...prev, sound: { ...prev.sound, volume: parseInt(e.target.value) }}))}
            className="w-full"
            style={{
              background: `linear-gradient(to right, #71816D 0%, #71816D ${state.sound.volume}%, rgba(255,255,255,0.1) ${state.sound.volume}%, rgba(255,255,255,0.1) 100%)`,
              borderRadius: '999px',
              height: '4px'
            }}
          />
        </div>
      </div>

      <div className="flex-grow grid grid-cols-2 gap-2 overflow-y-auto no-scrollbar">
        {presets.map(p => (
          <button
            key={p}
            onClick={() => setState(prev => ({ ...prev, sound: { ...prev.sound, preset: p }}))}
            className={`rounded-xl p-2 flex flex-col items-center justify-center gap-1 transition-all duration-300 border ${
              state.sound.preset === p 
                ? 'bg-primary/20 border-primary/40' 
                : 'bg-white/5 border-white/5'
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${state.sound.preset === p ? 'text-primary' : 'text-white/40'}`}>
              {p === 'Crackling' ? 'fireplace' : p === 'Soft Ember' ? 'mode_heat' : p === 'Burning Log' ? 'forest' : 'camping'}
            </span>
            <span className={`text-[9px] font-light ${state.sound.preset === p ? 'text-white' : 'text-white/40'}`}>{p}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SoundView;
