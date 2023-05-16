import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { QuizFormState } from '../../components/quiz/QuizDialog'

/**
 * Stores Quiz data in sessionStorage
 */
export const useSetQuizData = (options?: UseMutationOptions<void, unknown, QuizFormState>) => {
  const queryClient = useQueryClient()
  return useMutation<void, unknown, QuizFormState>(
    ['quiz'],
    async (data) => {
      sessionStorage.setItem('quiz', JSON.stringify(data))
      queryClient.setQueryData<QuizFormState>(['quiz'], (old) => ({ ...old, ...data }))
    },
    options
  )
}
