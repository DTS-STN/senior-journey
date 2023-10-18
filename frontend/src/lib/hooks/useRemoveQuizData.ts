import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * Removes Quiz data from sessionStorage
 */
export const useRemoveQuizData = (options?: Omit<UseMutationOptions, 'mutationKey' | 'mutationFn'>) => {
  const queryClient = useQueryClient()
  return useMutation({
    ...(options ?? {}),
    mutationKey: ['quiz'],
    mutationFn: async () => {
      sessionStorage.removeItem('quiz')
      queryClient.removeQueries({ queryKey: ['quiz'] })
    },
  })
}
