
import React from 'react';
import { AppState } from '../types';

interface TempViewProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
}

const TempView: React.FC<TempViewProps> = ({ state, setState }) => {
  const minTemp = 16;
  const maxTemp = 32;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, temp: { ...prev.temp, target: parseFloat(e.target.value) }}));
  };

  const percent = ((state.temp.target - minTemp) / (maxTemp - minTemp)) * 100;

  return (
    <div className="flex-grow flex flex-col overflow-hidden">
      <div className="flex flex-col items-center gap-1 mb-4 text-primary shrink-0">
        <span className="material-symbols-outlined text-3xl drop-shadow-[0_0_8px_rgba(113,129,109,0.8)]">thermostat</span>
        <h2 className="text-white text-[11px] font-medium tracking-wide uppercase opacity-70">Thermostat</h2>
      </div>

      <div className="flex-1 grid grid-cols-2 items-center px-1 overflow-hidden">
        <div className="flex flex-col items-center justify-center">
          <label className="text-primary text-[8px] font-bold tracking-[0.1em] uppercase mb-1">Target</label>
          <div className="flex items-start">
            <span className="text-5xl font-thin text-white tracking-tighter leading-none">{Math.round(state.temp.target)}</span>
            <span className="text-lg mt-1 ml-1 text-white/30 font-light">°</span>
          </div>
        </div>

        <div className="flex justify-center h-full items-center relative py-2">
            <div className="relative w-12 h-full max-h-[160px] flex flex-col items-center justify-end">
                <div className="w-4 flex-1 bg-black/40 border border-white/10 rounded-t-full relative overflow-hidden mb-[-10px]">
                    <div 
                        className="absolute bottom-0 w-full bg-accent-orange transition-all duration-200 ease-out"
                        style={{ height: `${10 + percent * 0.9}%` }}
                    />
                </div>
                <div className="w-10 h-10 rounded-full bg-accent-orange relative z-10 flex items-center justify-center border-[3px] border-[#292D2C] shadow-lg">
                    <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full blur-[1px]"></div>
                </div>
                <input 
                    type="range" 
                    min={minTemp} 
                    max={maxTemp} 
                    step="0.5" 
                    value={state.temp.target}
                    onChange={handleSliderChange}
                    className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                    style={{ writingMode: 'vertical-lr', direction: 'rtl' }}
                />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4 shrink-0">
        <button 
          onClick={() => setState(prev => ({ ...prev, temp: { ...prev.temp, unit: 'C' }}))}
          className={`py-2 rounded-xl text-[10px] font-medium transition-all ${
            state.temp.unit === 'C' ? 'bg-primary text-white' : 'bg-white/5 text-white/40'
          }`}
        >
          Celsius
        </button>
        <button 
          onClick={() => setState(prev => ({ ...prev, temp: { ...prev.temp, unit: 'F' }}))}
          className={`py-2 rounded-xl text-[10px] font-medium transition-all ${
            state.temp.unit === 'F' ? 'bg-primary text-white' : 'bg-white/5 text-white/40'
          }`}
        >
          Fahrenheit
        </button>
      </div>
    </div>
  );
};

export default TempView;
