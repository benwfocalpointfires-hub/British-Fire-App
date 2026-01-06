
import React from 'react';
import { AppState } from '../types';

interface FlameViewProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const FlameView: React.FC<FlameViewProps> = ({ state, setState }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center gap-4 overflow-hidden px-1">
      <div className="flex flex-col items-center gap-0.5 text-primary">
        <span className="material-symbols-outlined text-3xl drop-shadow-[0_0_12px_rgba(113,129,109,0.8)]">local_fire_department</span>
        <h2 className="text-white text-[10px] font-medium tracking-wide uppercase opacity-70">Flame Settings</h2>
      </div>

      <div className="w-full flex flex-col gap-0.5">
        <label className="text-white/50 text-[9px] font-medium mb-1">Color</label>
        <div className="relative h-6 flex items-center">
            <input 
                type="range"
                className="w-full absolute z-10 opacity-100 h-1"
                style={{ 
                    background: 'linear-gradient(to right, #FFD700, #FFA500, #FF4500, #FF0000)',
                    height: '6px',
                    borderRadius: '20px'
                }}
                min="0" max="100" value={state.flame.color}
                onChange={(e) => setState(prev => ({ ...prev, flame: { ...prev.flame, color: parseInt(e.target.value) }}))}
            />
        </div>
        <div className="flex justify-between text-[8px] text-white/30 px-1 mt-0.5">
          <span>Warm</span>
          <span>Deep</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-0.5">
        <label className="text-white/50 text-[9px] font-medium mb-1">Speed</label>
        <input 
            type="range"
            className="w-full"
            style={{
                background: `linear-gradient(to right, #71816D 0%, #71816D ${state.flame.speed}%, rgba(255,255,255,0.1) ${state.flame.speed}%, rgba(255,255,255,0.1) 100%)`,
                height: '4px'
            }}
            min="0" max="100" value={state.flame.speed}
            onChange={(e) => setState(prev => ({ ...prev, flame: { ...prev.flame, speed: parseInt(e.target.value) }}))}
        />
        <div className="flex justify-between text-[8px] text-white/30 px-1 mt-0.5">
          <span>Steady</span>
          <span>Lively</span>
        </div>
      </div>
    </div>
  );
};

export default FlameView;
