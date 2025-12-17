/**
 * @summary
 * Business logic for shape alternation.
 * Handles shape state management and rendering data generation.
 *
 * @module services/shapes/shapeService
 */

import {
  SHAPE_TYPES,
  SHAPE_COLORS,
  SHAPE_SIZE_LIMITS,
  SHAPE_DEFAULTS,
  SHAPE_CHARACTERISTICS,
  type ShapeType,
} from '@/constants/shapes';
import { shapeStore } from '@/instances';
import { ServiceError } from '@/utils';
import { ShapeStateResponse, ShapeRenderData, ShapeAlternationResponse } from './shapeTypes';

/**
 * @summary
 * Gets the current shape state.
 *
 * @function shapeGetState
 * @module services/shapes
 *
 * @returns {Promise<ShapeStateResponse>} Current shape state
 *
 * @example
 * const state = await shapeGetState();
 * // Returns: { current_shape: 'triangle', button_state: true, last_updated: '2025-01-01T00:00:00.000Z' }
 */
export async function shapeGetState(): Promise<ShapeStateResponse> {
  const state = shapeStore.getState();
  return state;
}

/**
 * @summary
 * Generates complete render data for a specific shape.
 *
 * @function shapeGetRenderData
 * @module services/shapes
 *
 * @param {ShapeType} shapeType - Type of shape to render
 * @returns {Promise<ShapeRenderData>} Complete rendering data
 *
 * @throws {ServiceError} INVALID_SHAPE_TYPE (400) - When shape type is not supported
 *
 * @example
 * const renderData = await shapeGetRenderData('triangle');
 * // Returns: { shape_type: 'triangle', shape_size: 200, shape_color: '#FF6B6B', ... }
 */
export async function shapeGetRenderData(shapeType: ShapeType): Promise<ShapeRenderData> {
  /**
   * @validation Validate shape type
   */
  if (!Object.values(SHAPE_TYPES).includes(shapeType)) {
    throw new ServiceError('INVALID_SHAPE_TYPE', 'Invalid shape type', 400);
  }

  /**
   * @rule {RU-009} Size must be between 150 and 250 pixels
   */
  const shape_size = SHAPE_SIZE_LIMITS.DEFAULT_SIZE;

  /**
   * @rule {RU-014} Each shape has specific educational color
   */
  const shape_color = SHAPE_COLORS[shapeType.toUpperCase() as keyof typeof SHAPE_COLORS];

  /**
   * @rule {RU-016, RU-017} Shapes are centered in viewport
   * Using default center position (frontend will handle actual centering)
   */
  const position_x = 0;
  const position_y = 0;

  /**
   * @rule {RU-018, RU-019, RU-020, RU-021, RU-022}
   * Educational characteristics for each shape
   */
  const characteristics = SHAPE_CHARACTERISTICS[shapeType];

  return {
    shape_type: shapeType,
    shape_size,
    shape_color,
    position_x,
    position_y,
    shape_characteristics: {
      vertices: characteristics.vertices,
      sides: characteristics.sides,
      border_width: SHAPE_DEFAULTS.BORDER_WIDTH,
      shape_properties: [...characteristics.shape_properties],
    },
  };
}

/**
 * @summary
 * Alternates to the next shape in the sequence.
 * Follows cyclic pattern: triangle → circle → square → triangle.
 *
 * @function shapeAlternate
 * @module services/shapes
 *
 * @returns {Promise<ShapeAlternationResponse>} Alternation result with new shape data
 *
 * @throws {ServiceError} BUTTON_DISABLED (400) - When button is not enabled
 *
 * @example
 * const result = await shapeAlternate();
 * // Returns: { previous_shape: 'triangle', current_shape: 'circle', render_data: {...}, timestamp: '...' }
 */
export async function shapeAlternate(): Promise<ShapeAlternationResponse> {
  /**
   * @validation Verify button is enabled
   * @rule {RU-005} Button must be enabled to process click
   */
  if (!shapeStore.getButtonState()) {
    throw new ServiceError('BUTTON_DISABLED', 'Button is currently disabled', 400);
  }

  /**
   * @rule {DF-003} Disable button during processing
   */
  shapeStore.setButtonState(false);

  const previous_shape = shapeStore.getCurrentShape();

  /**
   * @rule {BR-001, RU-003} Follow cyclic sequence
   */
  const next_shape = shapeStore.getNextShape();

  /**
   * @rule {DF-005, DF-006} Execute instantaneous alternation
   */
  shapeStore.setCurrentShape(next_shape);

  /**
   * @rule {DF-007} Re-enable button immediately after completion
   */
  shapeStore.setButtonState(true);

  /**
   * Generate render data for new shape
   */
  const render_data = await shapeGetRenderData(next_shape);

  return {
    previous_shape,
    current_shape: next_shape,
    render_data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * Resets the shape system to initial state.
 *
 * @function shapeReset
 * @module services/shapes
 *
 * @returns {Promise<ShapeStateResponse>} Reset state
 *
 * @example
 * const state = await shapeReset();
 * // Returns: { current_shape: 'triangle', button_state: true, last_updated: '...' }
 */
export async function shapeReset(): Promise<ShapeStateResponse> {
  /**
   * @rule {BR-003} System initializes with triangle
   */
  shapeStore.reset();
  return shapeStore.getState();
}
