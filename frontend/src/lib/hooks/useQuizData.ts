import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'

import { getLogger } from '../../logging/log-util'
import { QuizFormState } from '../types'

const logger = getLogger('useQuizData')

/**
 * Retrieves Quiz stored data from sessionStorage
 * @returns null if no data stored or it can't be parsed else a QuizFormState object
 */
export const useQuizData = (options?: Omit<UseQueryOptions<QuizFormState | null>, 'queryKey' | 'queryFn'>) => {
  return useQuery<QuizFormState | null>({
    ...(options ?? {}),
    queryKey: ['quiz'],
    queryFn: () => {
      try {
        const data = sessionStorage.getItem('quiz')
        return data === null || isEmpty(data) ? null : JSON.parse(data)
      } catch (err) {
        logger.warn(err, 'Problem occured when parsing quiz stored data')
        return null
      }
    },
  })
}
