
import React from 'react';
import { AppState } from '../types';

interface LightViewProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  type: string;
}

const LightView: React.FC<LightViewProps> = ({ state, setState, type }) => {
  const colors = ['#FFD700', '#FF6B00', '#FF0000', '#FFFFFF'];
  const movements = ['On', 'Breath', 'Flicker'];

  return (
    <div className="flex-grow flex flex-col justify-between p-1">
      <div className="flex flex-col items-center gap-0.5 text-primary shrink-0">
        <span className="material-symbols-outlined text-2xl drop-shadow-[0_0_8px_rgba(113,129,109,0.8)]">lightbulb</span>
        <h2 className="text-white text-[10px] font-medium tracking-wide uppercase opacity-70">Downlights</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 place-items-center py-4">
        {colors.map(c => (
          <button
            key={c}
            onClick={() => setState(prev => ({ ...prev, light: { ...prev.light, color: c }}))}
            className={`w-11 h-11 rounded-full transition-all duration-300 border-2 ${
                state.light.color === c ? 'scale-110 border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-transparent'
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      <div className="space-y-2 mt-auto">
        <label className="text-white/50 text-[9px] uppercase font-bold tracking-widest pl-1">Movement</label>
        <div className="flex bg-black/40 rounded-xl p-1 border border-white/5">
          {movements.map(m => (
            <button
              key={m}
              onClick={() => setState(prev => ({ ...prev, light: { ...prev.light, movement: m }}))}
              className={`flex-1 py-2 text-[10px] font-medium rounded-lg transition-all duration-300 ${
                state.light.movement.includes(m) ? 'bg-primary text-white' : 'text-white/40 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LightView;
