
import React from 'react';
import { AppState } from '../types';

interface FuelBedViewProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const FuelBedView: React.FC<FuelBedViewProps> = ({ state, setState }) => {
  const colors = ['#FFD700', '#FF6B00', '#FF0000', '#007AFF', '#FF00FF'];
  const movements = ['Static', 'Flicker', 'Wave', 'Pulse'];

  return (
    <div className="flex-grow flex flex-col p-1">
      <div className="flex flex-col items-center gap-1 mb-2 text-primary shrink-0">
        <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xl drop-shadow-[0_0_8px_rgba(113,129,109,0.8)]">grid_view</span>
            <h2 className="text-white text-[10px] font-medium tracking-wide uppercase opacity-70">Fuel Bed</h2>
        </div>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center py-2">
        <span className="text-white/30 text-[8px] uppercase tracking-[0.2em] font-bold mb-3">Colour</span>
        <div className="flex flex-wrap justify-center gap-3">
            {colors.map(c => (
            <button
                key={c}
                onClick={() => setState(prev => ({ ...prev, fuelBed: { ...prev.fuelBed, color: c }}))}
                className={`w-9 h-9 rounded-full transition-all duration-300 border-2 ${
                    state.fuelBed.color === c ? 'scale-110 border-white shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
            />
            ))}
        </div>
      </div>

      <div className="space-y-2 mt-auto">
        <label className="text-white/50 text-[9px] uppercase font-bold tracking-widest pl-1">Movement</label>
        <div className="grid grid-cols-2 gap-1.5">
          {movements.map(m => (
            <button
              key={m}
              onClick={() => setState(prev => ({ ...prev, fuelBed: { ...prev.fuelBed, movement: m }}))}
              className={`py-2 text-[10px] font-medium rounded-lg border transition-all duration-200 ${
                state.fuelBed.movement === m ? 'bg-primary border-primary text-white' : 'bg-black/30 border-white/5 text-white/40'
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

export default FuelBedView;
