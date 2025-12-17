/**
 * @hook useShapeAlternation
 * @domain shapes
 * @description Hook for managing shape alternation with React Query
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { shapeService } from '../../services/shapeService';
import { useShapeStore } from '../../stores/shapeStore';
import { toast } from 'sonner';

export const useShapeAlternation = () => {
  const queryClient = useQueryClient();
  const { setCurrentShape, setRenderData, setButtonEnabled } = useShapeStore();

  const { data: shapeState, isLoading: isLoadingState } = useQuery({
    queryKey: ['shape', 'state'],
    queryFn: shapeService.getState,
    staleTime: 0,
  });

  const { mutateAsync: alternate, isPending: isAlternating } = useMutation({
    mutationFn: shapeService.alternate,
    onMutate: () => {
      setButtonEnabled(false);
    },
    onSuccess: (data) => {
      setCurrentShape(data.current_shape);
      setRenderData(data.render_data);
      setButtonEnabled(true);
      queryClient.invalidateQueries({ queryKey: ['shape', 'state'] });
    },
    onError: (error: Error) => {
      setButtonEnabled(true);
      toast.error('Erro ao alternar forma', {
        description: error.message || 'Tente novamente',
      });
    },
  });

  const { mutateAsync: reset, isPending: isResetting } = useMutation({
    mutationFn: shapeService.reset,
    onSuccess: (data) => {
      setCurrentShape(data.current_shape);
      setButtonEnabled(data.button_state);
      queryClient.invalidateQueries({ queryKey: ['shape', 'state'] });
      toast.success('Forma resetada para triângulo');
    },
    onError: (error: Error) => {
      toast.error('Erro ao resetar forma', {
        description: error.message || 'Tente novamente',
      });
    },
  });

  return {
    shapeState,
    isLoadingState,
    alternate,
    isAlternating,
    reset,
    isResetting,
    isProcessing: isAlternating || isResetting,
  };
};
