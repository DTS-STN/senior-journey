import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * Removes Quiz data from localStorage
 */
export const useRemoveQuizData = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient()
  return useMutation(
    ['quiz'],
    async () => {
      localStorage.removeItem('quiz')
      queryClient.removeQueries(['quiz'])
    },
    options
  )
}
