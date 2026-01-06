
import React from 'react';
import { Category, AppState } from '../types';
import SoundView from './SoundView';
import FlameView from './FlameView';
import LightView from './LightView';
import FuelBedView from './FuelBedView';
import TempView from './TempView';
import ScheduleView from './ScheduleView';
import HomeView from './HomeView';

interface MainViewProps {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  togglePower: () => void;
}

const MainView: React.FC<MainViewProps> = ({ state, setState, togglePower }) => {
  const renderContent = () => {
    switch (state.activeCategory) {
      case Category.HOME:
        return <HomeView state={state} setState={setState} togglePower={togglePower} />;
      case Category.SOUND:
        return <SoundView state={state} setState={setState} />;
      case Category.FLAME:
        return <FlameView state={state} setState={setState} />;
      case Category.LIGHT:
        return <LightView state={state} setState={setState} type="Downlights" />;
      case Category.FUEL_BED:
        return <FuelBedView state={state} setState={setState} />;
      case Category.TEMPERATURE:
        return <TempView state={state} setState={setState} />;
      case Category.SCHEDULE:
        return <ScheduleView state={state} setState={setState} />;
      case Category.TIMER:
        return (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4 h-full">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 shrink-0">
               <span className="material-symbols-outlined text-primary text-4xl">timer</span>
            </div>
            <h2 className="text-white text-xl font-bold mb-1 shrink-0">Sleep Timer</h2>
            <p className="text-white/40 text-[10px] mb-4 leading-relaxed uppercase tracking-widest shrink-0">Auto Shutdown</p>
            <div className="grid grid-cols-2 gap-3 w-full overflow-y-auto no-scrollbar pb-2">
               {[15, 30, 45, 60, 90, 120].map(m => (
                 <button key={m} className="bg-white/5 border border-white/10 rounded-xl py-3 text-white text-sm font-semibold hover:bg-primary/20 active:scale-95 transition-all">
                   {m} min
                 </button>
               ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex-grow flex items-center justify-center text-white/30 italic text-base">
            Feature in development
          </div>
        );
    }
  };

  return (
    <div className="h-full w-full bg-white/5 glass-blur border border-white/10 rounded-[2rem] p-4 flex flex-col overflow-hidden relative shadow-2xl">
      {renderContent()}
    </div>
  );
};

export default MainView;
