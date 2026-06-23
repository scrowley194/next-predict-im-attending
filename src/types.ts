export interface AppState {
  name: string;
  role: string;
  company: string;
  photoUrl: string | null;
  backgroundUrl: string | null;
  settings: ImageSettings;
}

export interface ImageSettings {
  zoom: number;
  offsetX: number;
  offsetY: number;
  brightness: number;
  contrast: number;
  grayscale: number;
  saturate: number;
}

export const DEFAULT_SETTINGS: ImageSettings = {
  zoom: 1,
  offsetX: 50,
  offsetY: 50,
  brightness: 100,
  contrast: 100,
  grayscale: 0,
  saturate: 100,
};

export type AspectRatio = 'square' | 'landscape' | 'portrait';
