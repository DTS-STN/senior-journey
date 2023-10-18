import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { QuizFormState } from '../types'

/**
 * Stores Quiz data in sessionStorage
 */
export const useSetQuizData = (
  options?: Omit<UseMutationOptions<void, unknown, QuizFormState>, 'mutationKey' | 'mutationFn'>,
) => {
  const queryClient = useQueryClient()
  return useMutation<void, unknown, QuizFormState>({
    ...(options ?? {}),
    mutationKey: ['quiz'],
    mutationFn: async (data) => {
      sessionStorage.setItem('quiz', JSON.stringify(data))
      queryClient.setQueryData<QuizFormState>(['quiz'], (old) => ({ ...old, ...data }))
    },
  })
}
