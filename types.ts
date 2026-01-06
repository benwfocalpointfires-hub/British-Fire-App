
export enum Category {
  HOME = 'home',
  FLAME = 'flame',
  LIGHT = 'light',
  FUEL_BED = 'fuel_bed',
  SOUND = 'sound',
  BRIGHTNESS = 'brightness',
  TEMPERATURE = 'temperature',
  SCHEDULE = 'schedule',
  TIMER = 'timer',
  CREATE_PRESET = 'create_preset'
}

export interface Preset {
  name: string;
  desc: string;
  icon: string;
  active: boolean;
  settings?: {
    flame: { color: number; speed: number };
    temp: number;
    fuelBed: { color: string; movement: string };
    light: { color: string; movement: string };
    sound: { volume: number; preset: string };
  };
}

export interface AppState {
  isOn: boolean;
  activeCategory: Category;
  isCreatingPreset: boolean;
  sound: {
    volume: number;
    preset: string;
  };
  flame: {
    color: number;
    speed: number;
  };
  light: {
    color: string;
    movement: string;
  };
  fuelBed: {
    color: string;
    movement: string;
  };
  temp: {
    target: number;
    unit: 'C' | 'F';
  };
  presets: Preset[];
}
