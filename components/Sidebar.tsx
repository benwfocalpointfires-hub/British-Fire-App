
import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  active: Category;
  onSelect: (cat: Category) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect }) => {
  const items = [
    { id: Category.FLAME, icon: 'local_fire_department' },
    { id: Category.LIGHT, icon: 'arrow_downward' },
    { id: Category.FUEL_BED, icon: 'grain' },
    { id: Category.SOUND, icon: 'volume_up' },
    { id: Category.TEMPERATURE, icon: 'thermostat' },
    { id: Category.TIMER, icon: 'timer' },
  ];

  return (
    <div className="w-14 flex flex-col gap-3 rounded-[2rem] py-5 items-center bg-white/5 glass-blur border border-white/10 backdrop-blur-md overflow-hidden shrink-0 shadow-xl">
      {items.map((item, index) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-500 active:scale-90 shrink-0 ${
            active === item.id 
              ? 'active-glass text-white' 
              : 'text-primary/70 hover:text-white'
          }`}
          style={{ transitionDelay: `${index * 50}ms` }}
        >
          <span className={`material-symbols-outlined text-2xl transition-all duration-500 ${active === item.id ? 'rotate-[360deg] scale-110' : 'rotate-0'}`}>
            {item.icon}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;
