/**
 * @summary
 * API controller for shape alternation.
 * Thin layer that delegates all logic to service.
 *
 * @module api/internal/shape/controller
 */

import { Request, Response, NextFunction } from 'express';
import { successResponse, errorResponse, isServiceError } from '@/utils';
import { shapeGetState, shapeGetRenderData, shapeAlternate, shapeReset } from '@/services/shapes';

/**
 * @api {get} /api/internal/shape/state Get Current Shape State
 * @apiName GetShapeState
 * @apiGroup Shape
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.current_shape Current shape (triangle | circle | square)
 * @apiSuccess {Boolean} data.button_state Button enabled state
 * @apiSuccess {String} data.last_updated ISO 8601 timestamp of last update
 */
export async function getStateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await shapeGetState();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {get} /api/internal/shape/render/:shapeType Get Shape Render Data
 * @apiName GetShapeRenderData
 * @apiGroup Shape
 *
 * @apiParam {String} shapeType Shape type (triangle | circle | square)
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.shape_type Shape type
 * @apiSuccess {Number} data.shape_size Size in pixels
 * @apiSuccess {String} data.shape_color Hex color code
 * @apiSuccess {Number} data.position_x Horizontal position
 * @apiSuccess {Number} data.position_y Vertical position
 * @apiSuccess {Number} data.shape_characteristics.vertices Number of vertices
 * @apiSuccess {Number} data.shape_characteristics.sides Number of sides
 * @apiSuccess {Number} data.shape_characteristics.border_width Border width in pixels
 * @apiSuccess {String[]} data.shape_characteristics.shape_properties Educational properties
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (INVALID_SHAPE_TYPE)
 * @apiError {String} error.message Error message
 */
export async function getRenderDataHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { shapeType } = req.params;
    const data = await shapeGetRenderData(shapeType as any);
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/shape/alternate Alternate to Next Shape
 * @apiName AlternateShape
 * @apiGroup Shape
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.previous_shape Previous shape
 * @apiSuccess {String} data.current_shape New current shape
 * @apiSuccess {String} data.render_data.shape_type Shape type
 * @apiSuccess {Number} data.render_data.shape_size Size in pixels
 * @apiSuccess {String} data.render_data.shape_color Hex color code
 * @apiSuccess {Number} data.render_data.position_x Horizontal position
 * @apiSuccess {Number} data.render_data.position_y Vertical position
 * @apiSuccess {Number} data.render_data.shape_characteristics.vertices Number of vertices
 * @apiSuccess {Number} data.render_data.shape_characteristics.sides Number of sides
 * @apiSuccess {Number} data.render_data.shape_characteristics.border_width Border width in pixels
 * @apiSuccess {String[]} data.render_data.shape_characteristics.shape_properties Educational properties
 * @apiSuccess {String} data.timestamp ISO 8601 timestamp
 *
 * @apiError {Boolean} success Success flag (always false)
 * @apiError {String} error.code Error code (BUTTON_DISABLED)
 * @apiError {String} error.message Error message
 */
export async function alternateHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await shapeAlternate();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}

/**
 * @api {post} /api/internal/shape/reset Reset Shape to Initial State
 * @apiName ResetShape
 * @apiGroup Shape
 *
 * @apiSuccess {Boolean} success Success flag (always true)
 * @apiSuccess {String} data.current_shape Current shape (triangle)
 * @apiSuccess {Boolean} data.button_state Button enabled state (true)
 * @apiSuccess {String} data.last_updated ISO 8601 timestamp
 */
export async function resetHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await shapeReset();
    res.json(successResponse(data));
  } catch (error) {
    if (isServiceError(error)) {
      res.status(error.statusCode).json(errorResponse(error.message, error.code, error.details));
      return;
    }
    next(error);
  }
}
