
import React, { useState } from 'react';
import { Category, AppState, Preset } from './types';
import Sidebar from './components/Sidebar';
import MainView from './components/MainView';
import HomeView from './components/HomeView';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isOn: true,
    activeCategory: Category.HOME,
    isCreatingPreset: false,
    sound: {
      volume: 70,
      preset: 'Crackling'
    },
    flame: {
      color: 50,
      speed: 50
    },
    light: {
      color: '#FF6B00',
      movement: 'Breathing'
    },
    fuelBed: {
      color: '#FF6B00',
      movement: 'Static'
    },
    temp: {
      target: 24,
      unit: 'C'
    },
    presets: [
      { 
        name: 'Cozy Reading', 
        desc: 'Soft crackle • 22°C', 
        icon: 'menu_book', 
        active: true,
        settings: {
          flame: { color: 20, speed: 30 },
          temp: 22,
          fuelBed: { color: '#FFD700', movement: 'Static' },
          light: { color: '#FFFFFF', movement: 'On' },
          sound: { volume: 30, preset: 'Crackling' }
        }
      },
      { 
        name: 'Late Night Glow', 
        desc: 'Deep amber • 20°C', 
        icon: 'nightlight', 
        active: false,
        settings: {
          flame: { color: 85, speed: 20 },
          temp: 20,
          fuelBed: { color: '#FF4500', movement: 'Pulse' },
          light: { color: '#FF6B00', movement: 'Breath' },
          sound: { volume: 15, preset: 'Soft Ember' }
        }
      },
    ]
  });

  const [isNaming, setIsNaming] = useState(false);
  const [newName, setNewName] = useState('');

  const togglePower = () => {
    if (state.activeCategory === Category.CREATE_PRESET || state.isCreatingPreset) {
      setIsNaming(true);
      return;
    }
    setState(prev => ({ ...prev, isOn: !prev.isOn }));
  };

  const setCategory = (category: Category) => {
    if (category === state.activeCategory) return;
    const isEnteringPresetGrid = category === Category.CREATE_PRESET;
    const isReturningToMain = category === Category.HOME || category === Category.SCHEDULE;
    
    setIsNaming(false);
    setState(prev => ({ 
      ...prev, 
      activeCategory: category,
      isCreatingPreset: isEnteringPresetGrid ? true : (isReturningToMain ? false : prev.isCreatingPreset)
    }));
  };

  const isHome = state.activeCategory === Category.HOME || state.activeCategory === Category.CREATE_PRESET;

  const handleBack = () => {
    if (isNaming) {
      setIsNaming(false);
    } else if (state.isCreatingPreset) {
      if (state.activeCategory === Category.CREATE_PRESET) {
        setCategory(Category.SCHEDULE);
      } else {
        setState(prev => ({ ...prev, activeCategory: Category.CREATE_PRESET }));
      }
    } else {
      setCategory(Category.HOME);
    }
  };

  const savePreset = () => {
    if (!newName.trim()) return;
    const newPreset: Preset = {
      name: newName,
      desc: `${state.temp.target}°C • ${state.sound.volume}% vol`,
      icon: 'settings_suggest',
      active: false,
      settings: {
        flame: { ...state.flame },
        temp: state.temp.target,
        fuelBed: { ...state.fuelBed },
        light: { ...state.light },
        sound: { ...state.sound }
      }
    };
    setState(prev => ({
      ...prev,
      presets: [...prev.presets, newPreset],
      activeCategory: Category.SCHEDULE,
      isCreatingPreset: false
    }));
    setIsNaming(false);
    setNewName('');
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-[#292D2C] font-sans overflow-hidden select-none">
      <div className="w-full max-w-[500px] h-[100dvh] bg-[#292D2C] flex flex-col relative overflow-hidden px-6 pb-4 pt-[calc(env(safe-area-inset-top)+1rem)]">
        
        {/* Header Navigation */}
        <div className="flex justify-between items-center shrink-0 z-50 mb-2 h-10">
          <button 
            onClick={handleBack}
            className={`w-10 h-10 rounded-full glass-blur flex items-center justify-center relative active:scale-95 transition-transform group hover:border-white/20 ${
              state.activeCategory === Category.HOME && !state.isCreatingPreset ? 'opacity-30 pointer-events-none' : ''
            }`}
          >
            <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white transition-colors" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
          </button>
          
          <button 
            onClick={() => state.isCreatingPreset ? setIsNaming(true) : setCategory(Category.SCHEDULE)}
            className="w-10 h-10 rounded-full glass-blur flex items-center justify-center relative active:scale-95 transition-transform group hover:border-white/20"
          >
            <span className="material-symbols-outlined text-primary text-2xl group-hover:text-white transition-colors">local_fire_department</span>
            <span className="material-symbols-outlined text-[10px] text-white/70 absolute top-[10px] right-[10px]" style={{ fontWeight: 900 }}>add</span>
          </button>
        </div>

        {/* Global Naming Input Overlay */}
        {isNaming && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] animate-in fade-in duration-300" onClick={() => setIsNaming(false)}>
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[400px]" onClick={e => e.stopPropagation()}>
              <div className="w-full glass-blur active-glass border-primary/40 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl">
                <div className="space-y-1">
                  <h3 className="text-white text-base font-bold text-center">Save Custom Preset</h3>
                  <p className="text-white/40 text-[10px] uppercase font-bold tracking-[0.2em] text-center">Name your configuration</p>
                </div>
                <input 
                  type="text" autoFocus placeholder="e.g. Winter Night" value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && savePreset()}
                  className="bg-transparent border-b border-white/20 text-white text-2xl px-2 py-4 outline-none placeholder:text-white/5 text-center font-medium focus:border-primary transition-colors"
                />
                <div className="flex gap-3">
                  <button onClick={() => setIsNaming(false)} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-white/60 text-xs font-bold uppercase tracking-wider active:scale-95">Cancel</button>
                  <button onClick={savePreset} className="flex-1 py-4 bg-primary rounded-2xl text-white text-xs font-bold uppercase tracking-wider active:scale-95 shadow-lg">Save</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Central Power/Add Section */}
        <div className={`flex flex-col items-center shrink-0 mb-4 transition-all duration-700 ${isHome ? 'mt-2' : 'mt-0 scale-50 -translate-y-12'}`}>
          <button onClick={togglePower} className="relative group">
            <div className={`w-28 h-28 rounded-full glass-blur flex items-center justify-center transition-all duration-300 active:scale-95 border-2 ${state.isOn || state.isCreatingPreset ? 'active-glass shadow-[0_0_25px_rgba(113,129,109,0.3)]' : 'border-white/5 opacity-50'}`}>
              <span className={`material-symbols-outlined text-6xl transition-colors ${state.isOn || state.isCreatingPreset ? 'text-primary drop-shadow-[0_0_15px_rgba(113,129,109,0.3)]' : 'text-white/20'}`}>
                {state.isCreatingPreset ? 'add' : 'power_settings_new'}
              </span>
            </div>
          </button>
          <h1 className="text-white text-[10px] font-medium mt-3 tracking-[0.3em] uppercase opacity-80">
            {state.isCreatingPreset ? 'Configuring Preset' : 'My Fire'}
          </h1>
        </div>

        {/* Dynamic Main View */}
        <div className={`relative flex-1 flex flex-col overflow-hidden transition-all duration-700 ${state.isOn || state.isCreatingPreset ? 'opacity-100' : 'opacity-20 pointer-events-none'}`}>
          <div className="relative flex-1 w-full min-h-0">
            <div className={`absolute inset-0 w-full h-full transition-all duration-700 ${isHome ? 'opacity-100 scale-100' : 'opacity-0 scale-95 translate-y-20 pointer-events-none'}`}>
              <HomeView state={state} setState={setState} togglePower={togglePower} />
            </div>
            <div className={`absolute inset-0 w-full h-full transition-all duration-700 flex gap-4 ${!isHome ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full pointer-events-none'}`}>
               <Sidebar active={state.activeCategory} onSelect={(cat) => setCategory(cat)} />
               <div className="flex-1 min-w-0 pb-[env(safe-area-inset-bottom)]">
                  <MainView state={state} setState={setState} togglePower={togglePower} />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
