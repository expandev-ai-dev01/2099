/**
 * @summary
 * In-memory store instance for current shape state.
 * Provides singleton pattern for shape state management without database.
 *
 * @module instances/shapes/shapeStore
 */

import { SHAPE_TYPES, SHAPE_DEFAULTS, type ShapeType } from '@/constants/shapes';

/**
 * Shape state record structure
 */
export interface ShapeStateRecord {
  current_shape: ShapeType;
  button_state: boolean;
  last_updated: string;
}

/**
 * In-memory store for shape state
 */
class ShapeStore {
  private state: ShapeStateRecord = {
    current_shape: SHAPE_DEFAULTS.INITIAL_SHAPE,
    button_state: true,
    last_updated: new Date().toISOString(),
  };

  /**
   * Get current shape state
   */
  getState(): ShapeStateRecord {
    return { ...this.state };
  }

  /**
   * Get current shape
   */
  getCurrentShape(): ShapeType {
    return this.state.current_shape;
  }

  /**
   * Get button state
   */
  getButtonState(): boolean {
    return this.state.button_state;
  }

  /**
   * Set current shape
   */
  setCurrentShape(shape: ShapeType): void {
    this.state.current_shape = shape;
    this.state.last_updated = new Date().toISOString();
  }

  /**
   * Set button state
   */
  setButtonState(enabled: boolean): void {
    this.state.button_state = enabled;
    this.state.last_updated = new Date().toISOString();
  }

  /**
   * Get next shape in sequence
   */
  getNextShape(): ShapeType {
    const current = this.state.current_shape;
    switch (current) {
      case SHAPE_TYPES.TRIANGLE:
        return SHAPE_TYPES.CIRCLE;
      case SHAPE_TYPES.CIRCLE:
        return SHAPE_TYPES.SQUARE;
      case SHAPE_TYPES.SQUARE:
        return SHAPE_TYPES.TRIANGLE;
      default:
        return SHAPE_TYPES.TRIANGLE;
    }
  }

  /**
   * Reset to initial state
   */
  reset(): void {
    this.state = {
      current_shape: SHAPE_DEFAULTS.INITIAL_SHAPE,
      button_state: true,
      last_updated: new Date().toISOString(),
    };
  }
}

/**
 * Singleton instance of ShapeStore
 */
export const shapeStore = new ShapeStore();
