/**
 * @summary
 * Default values and constants for geometric shapes.
 * Provides centralized configuration for shape types, colors, sizes,
 * and visual characteristics for educational purposes.
 *
 * @module constants/shapes/shapeDefaults
 */

/**
 * @interface ShapeTypesType
 * @description Available geometric shape types in the system.
 *
 * @property {string} TRIANGLE - Triangle shape identifier ('triangle')
 * @property {string} CIRCLE - Circle shape identifier ('circle')
 * @property {string} SQUARE - Square shape identifier ('square')
 */
export const SHAPE_TYPES = {
  TRIANGLE: 'triangle',
  CIRCLE: 'circle',
  SQUARE: 'square',
} as const;

/** Type representing the SHAPE_TYPES constant */
export type ShapeTypesType = typeof SHAPE_TYPES;

/** Union type of all valid shape values */
export type ShapeType = (typeof SHAPE_TYPES)[keyof typeof SHAPE_TYPES];

/**
 * @interface ShapeColorsType
 * @description Educational color palette for geometric shapes.
 * Colors are chosen for high contrast and educational visibility.
 *
 * @property {string} TRIANGLE - Red color for triangle (#FF6B6B)
 * @property {string} CIRCLE - Teal color for circle (#4ECDC4)
 * @property {string} SQUARE - Blue color for square (#45B7D1)
 */
export const SHAPE_COLORS = {
  TRIANGLE: '#FF6B6B',
  CIRCLE: '#4ECDC4',
  SQUARE: '#45B7D1',
} as const;

/** Type representing the SHAPE_COLORS constant */
export type ShapeColorsType = typeof SHAPE_COLORS;

/**
 * @interface ShapeSizeLimitsType
 * @description Size constraints for shape rendering.
 *
 * @property {number} MIN_SIZE - Minimum size in pixels (150)
 * @property {number} MAX_SIZE - Maximum size in pixels (250)
 * @property {number} DEFAULT_SIZE - Default size in pixels (200)
 */
export const SHAPE_SIZE_LIMITS = {
  MIN_SIZE: 150,
  MAX_SIZE: 250,
  DEFAULT_SIZE: 200,
} as const;

/** Type representing the SHAPE_SIZE_LIMITS constant */
export type ShapeSizeLimitsType = typeof SHAPE_SIZE_LIMITS;

/**
 * @interface ShapeDefaultsType
 * @description Default configuration values for shape system.
 *
 * @property {string} INITIAL_SHAPE - Initial shape on system load ('triangle')
 * @property {number} BORDER_WIDTH - Border width in pixels (2)
 * @property {number} TRANSITION_TIME_MS - Maximum transition time in milliseconds (50)
 */
export const SHAPE_DEFAULTS = {
  INITIAL_SHAPE: SHAPE_TYPES.TRIANGLE,
  BORDER_WIDTH: 2,
  TRANSITION_TIME_MS: 50,
} as const;

/** Type representing the SHAPE_DEFAULTS constant */
export type ShapeDefaultsType = typeof SHAPE_DEFAULTS;

/**
 * @interface ShapeCharacteristicsType
 * @description Educational characteristics for each geometric shape.
 */
export const SHAPE_CHARACTERISTICS = {
  [SHAPE_TYPES.TRIANGLE]: {
    vertices: 3,
    sides: 3,
    shape_properties: ['3 vértices', '3 lados', 'Ângulos internos somam 180°'],
  },
  [SHAPE_TYPES.CIRCLE]: {
    vertices: 0,
    sides: 0,
    shape_properties: [
      'Sem vértices',
      'Circunferência contínua',
      'Todos os pontos equidistantes do centro',
    ],
  },
  [SHAPE_TYPES.SQUARE]: {
    vertices: 4,
    sides: 4,
    shape_properties: ['4 vértices', '4 lados iguais', '4 ângulos retos (90°)'],
  },
} as const;

/** Type representing the SHAPE_CHARACTERISTICS constant */
export type ShapeCharacteristicsType = typeof SHAPE_CHARACTERISTICS;
