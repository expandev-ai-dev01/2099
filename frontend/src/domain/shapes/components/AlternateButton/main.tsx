/**
 * @component AlternateButton
 * @domain shapes
 * @description Button for alternating between geometric shapes
 */

import { Button } from '@/core/components/button';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import type { AlternateButtonProps } from './types';

function AlternateButton({
  onClick,
  disabled = false,
  isLoading = false,
  className,
}: AlternateButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isLoading}
      size="lg"
      className={cn(
        'gap-2 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg',
        className
      )}
      aria-label="Alternar para próxima forma geométrica"
    >
      <RefreshCw className={cn('size-5', isLoading && 'animate-spin')} />
      <span className="text-base font-medium">Próxima Forma</span>
    </Button>
  );
}

export { AlternateButton };
