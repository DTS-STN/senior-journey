import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * Removes Quiz data from sessionStorage
 */
export const useRemoveQuizData = (options?: UseMutationOptions) => {
  const queryClient = useQueryClient()
  return useMutation(
    ['quiz'],
    async () => {
      sessionStorage.removeItem('quiz')
      queryClient.removeQueries(['quiz'])
    },
    options
  )
}
