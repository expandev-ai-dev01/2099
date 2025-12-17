/**
 * @service shapeService
 * @domain shapes
 * @type REST
 * @description Service for shape alternation operations
 */

import { authenticatedClient } from '@/core/lib/api';
import type { ShapeState, ShapeRenderData, AlternateShapeResponse, ShapeType } from '../types';

export const shapeService = {
  /**
   * Get current shape state
   */
  async getState(): Promise<ShapeState> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: ShapeState }>(
      '/shape/state'
    );
    return data.data;
  },

  /**
   * Get render data for specific shape
   */
  async getRenderData(shapeType: ShapeType): Promise<ShapeRenderData> {
    const { data } = await authenticatedClient.get<{ success: boolean; data: ShapeRenderData }>(
      `/shape/render/${shapeType}`
    );
    return data.data;
  },

  /**
   * Alternate to next shape in sequence
   */
  async alternate(): Promise<AlternateShapeResponse> {
    const { data } = await authenticatedClient.post<{
      success: boolean;
      data: AlternateShapeResponse;
    }>('/shape/alternate');
    return data.data;
  },

  /**
   * Reset shape to initial state (triangle)
   */
  async reset(): Promise<ShapeState> {
    const { data } = await authenticatedClient.post<{ success: boolean; data: ShapeState }>(
      '/shape/reset'
    );
    return data.data;
  },
};
