/**
 * @module domain/shapes/types
 * @description Type definitions for shape domain
 */

export type ShapeType = 'triangle' | 'circle' | 'square';

export interface ShapeCharacteristics {
  vertices: number;
  sides: number;
  border_width: number;
  shape_properties: string[];
}

export interface ShapeRenderData {
  shape_type: ShapeType;
  shape_size: number;
  shape_color: string;
  position_x: number;
  position_y: number;
  shape_characteristics: ShapeCharacteristics;
}

export interface ShapeState {
  current_shape: ShapeType;
  button_state: boolean;
  last_updated: string;
}

export interface AlternateShapeResponse {
  previous_shape: ShapeType;
  current_shape: ShapeType;
  render_data: ShapeRenderData;
  timestamp: string;
}

export interface Shape {
  type: ShapeType;
  renderData: ShapeRenderData;
}
