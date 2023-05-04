import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { QuizFormState } from '../../pages/learn'

/**
 * Stores Quiz data in localStorage
 */
export const useSetQuizData = (options?: UseMutationOptions<void, unknown, QuizFormState>) => {
  const queryClient = useQueryClient()
  return useMutation<void, unknown, QuizFormState>(
    ['quiz'],
    async (data) => {
      localStorage.setItem('quiz', JSON.stringify(data))
      queryClient.setQueryData<QuizFormState>(['quiz'], (old) => ({ ...old, ...data }))
    },
    options
  )
}
