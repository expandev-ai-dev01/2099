/**
 * @page HomePage
 * @description Main page for shape alternation feature
 */

import { useEffect } from 'react';
import { ShapeDisplay, AlternateButton } from '@/domain/shapes/components';
import { useShapeAlternation } from '@/domain/shapes/hooks';
import { useShapeStore } from '@/domain/shapes/stores';
import { LoadingSpinner } from '@/core/components/loading-spinner';
import { Alert, AlertDescription, AlertTitle } from '@/core/components/alert';
import { AlertCircle } from 'lucide-react';

function HomePage() {
  const { shapeState, isLoadingState, alternate, isProcessing } = useShapeAlternation();
  const { renderData, buttonEnabled } = useShapeStore();

  useEffect(() => {
    if (shapeState?.current_shape && !renderData) {
      // Initial load - fetch render data for current shape
      import('@/domain/shapes/services').then(({ shapeService }) => {
        shapeService.getRenderData(shapeState.current_shape).then((data) => {
          useShapeStore.getState().setRenderData(data);
        });
      });
    }
  }, [shapeState, renderData]);

  const handleAlternate = async () => {
    try {
      await alternate();
    } catch (error) {
      console.error('Error alternating shape:', error);
    }
  };

  if (isLoadingState) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <LoadingSpinner className="size-8" />
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 py-12">
      <header className="text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">MathView</h1>
        <p className="text-muted-foreground text-lg">
          Explore formas geométricas de maneira interativa
        </p>
      </header>

      <main className="flex w-full max-w-2xl flex-col items-center gap-8">
        {renderData ? (
          <ShapeDisplay renderData={renderData} className="w-full" />
        ) : (
          <Alert variant="default">
            <AlertCircle className="size-4" />
            <AlertTitle>Carregando forma</AlertTitle>
            <AlertDescription>
              Aguarde enquanto carregamos a forma geométrica inicial...
            </AlertDescription>
          </Alert>
        )}

        <AlternateButton
          onClick={handleAlternate}
          disabled={!buttonEnabled || !renderData}
          isLoading={isProcessing}
        />
      </main>

      <footer className="text-muted-foreground mt-8 text-center text-sm">
        <p>Clique no botão para alternar entre triângulo, círculo e quadrado</p>
      </footer>
    </div>
  );
}

export { HomePage };
