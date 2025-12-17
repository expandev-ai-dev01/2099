import type { ShapeState, AlternateShapeResponse } from '../../types';

export interface UseShapeAlternationReturn {
  shapeState: ShapeState | undefined;
  isLoadingState: boolean;
  alternate: () => Promise<AlternateShapeResponse>;
  isAlternating: boolean;
  reset: () => Promise<ShapeState>;
  isResetting: boolean;
  isProcessing: boolean;
}
