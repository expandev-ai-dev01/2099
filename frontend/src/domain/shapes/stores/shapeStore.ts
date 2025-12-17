/**
 * @store shapeStore
 * @domain shapes
 * @description Zustand store for shape state management
 */

import { create } from 'zustand';
import type { ShapeType, ShapeRenderData } from '../types';

interface ShapeStore {
  currentShape: ShapeType;
  renderData: ShapeRenderData | null;
  buttonEnabled: boolean;
  setCurrentShape: (shape: ShapeType) => void;
  setRenderData: (data: ShapeRenderData) => void;
  setButtonEnabled: (enabled: boolean) => void;
}

export const useShapeStore = create<ShapeStore>((set) => ({
  currentShape: 'triangle',
  renderData: null,
  buttonEnabled: true,
  setCurrentShape: (shape) => set({ currentShape: shape }),
  setRenderData: (data) => set({ renderData: data }),
  setButtonEnabled: (enabled) => set({ buttonEnabled: enabled }),
}));
