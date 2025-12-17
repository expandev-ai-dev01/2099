/**
 * @summary
 * Type definitions for shape alternation service.
 *
 * @module services/shapes/shapeTypes
 */

import { ShapeType } from '@/constants/shapes';

/**
 * @interface ShapeStateResponse
 * @description Current state of the shape system
 */
export interface ShapeStateResponse {
  current_shape: ShapeType;
  button_state: boolean;
  last_updated: string;
}

/**
 * @interface ShapeRenderData
 * @description Complete data needed to render a geometric shape
 */
export interface ShapeRenderData {
  shape_type: ShapeType;
  shape_size: number;
  shape_color: string;
  position_x: number;
  position_y: number;
  shape_characteristics: {
    vertices: number;
    sides: number;
    border_width: number;
    shape_properties: string[];
  };
}

/**
 * @interface ShapeAlternationResponse
 * @description Response after shape alternation
 */
export interface ShapeAlternationResponse {
  previous_shape: ShapeType;
  current_shape: ShapeType;
  render_data: ShapeRenderData;
  timestamp: string;
}
