/**
 * @summary
 * Internal API routes configuration.
 * Handles authenticated endpoints for business operations.
 *
 * @module routes/internalRoutes
 */

import { Router } from 'express';
import * as shapeController from '@/api/internal/shape/controller';

const router = Router();

/**
 * @rule {be-route-configuration}
 * Shape routes - /api/internal/shape
 */
router.get('/shape/state', shapeController.getStateHandler);
router.get('/shape/render/:shapeType', shapeController.getRenderDataHandler);
router.post('/shape/alternate', shapeController.alternateHandler);
router.post('/shape/reset', shapeController.resetHandler);

export default router;
