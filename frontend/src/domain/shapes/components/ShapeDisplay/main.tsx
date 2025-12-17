/**
 * @component ShapeDisplay
 * @domain shapes
 * @description Renders geometric shapes with educational characteristics
 */

import { cn } from '@/core/lib/utils';
import type { ShapeDisplayProps } from './types';

function ShapeDisplay({ renderData, className }: ShapeDisplayProps) {
  if (!renderData) {
    return null;
  }

  const { shape_type, shape_size, shape_color, shape_characteristics } = renderData;

  const renderShape = () => {
    const baseClasses = 'transition-all duration-200';
    const style = {
      width: `${shape_size}px`,
      height: `${shape_size}px`,
      borderWidth: `${shape_characteristics.border_width}px`,
      borderColor: shape_color,
      borderStyle: 'solid',
    };

    switch (shape_type) {
      case 'triangle':
        return (
          <div
            className={cn('relative', baseClasses)}
            style={{
              width: `${shape_size}px`,
              height: `${shape_size}px`,
            }}
            role="img"
            aria-label="Triângulo"
          >
            <svg
              width={shape_size}
              height={shape_size}
              viewBox="0 0 100 100"
              className="absolute inset-0"
            >
              <polygon
                points="50,10 90,90 10,90"
                fill={shape_color}
                stroke={shape_color}
                strokeWidth={shape_characteristics.border_width}
              />
            </svg>
          </div>
        );

      case 'circle':
        return (
          <div
            className={cn('rounded-full', baseClasses)}
            style={{
              ...style,
              backgroundColor: shape_color,
            }}
            role="img"
            aria-label="Círculo"
          />
        );

      case 'square':
        return (
          <div
            className={cn('rounded-md', baseClasses)}
            style={{
              ...style,
              backgroundColor: shape_color,
            }}
            role="img"
            aria-label="Quadrado"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        'bg-card flex flex-col items-center justify-center gap-6 rounded-xl border p-8 shadow-sm',
        className
      )}
    >
      <div className="flex items-center justify-center">{renderShape()}</div>

      <div className="text-center">
        <h3 className="mb-2 text-lg font-semibold capitalize">
          {shape_type === 'triangle' && 'Triângulo'}
          {shape_type === 'circle' && 'Círculo'}
          {shape_type === 'square' && 'Quadrado'}
        </h3>
        <div className="text-muted-foreground space-y-1 text-sm">
          <p>
            <strong>Vértices:</strong> {shape_characteristics.vertices}
          </p>
          <p>
            <strong>Lados:</strong> {shape_characteristics.sides}
          </p>
          {shape_characteristics.shape_properties?.length > 0 && (
            <div className="mt-2">
              <p className="font-medium">Propriedades:</p>
              <ul className="ml-4 list-disc text-left">
                {shape_characteristics.shape_properties.map((prop, index) => (
                  <li key={index}>{prop}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { ShapeDisplay };
