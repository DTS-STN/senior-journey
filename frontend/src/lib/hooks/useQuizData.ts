import { UseQueryOptions, useQuery } from '@tanstack/react-query'
import { isEmpty } from 'lodash'

import { getLogger } from '../../logging/log-util'
import { QuizFormState } from '../../pages/learn'

const logger = getLogger('useQuizData')

/**
 * Retrieves Quiz stored data from localStorage
 * @returns null if no data stored or it can't be parsed else a QuizFormState object
 */
export const useQuizData = (options?: UseQueryOptions<QuizFormState | null>) => {
  return useQuery<QuizFormState | null>(
    ['quiz'],
    () => {
      try {
        const data = localStorage.getItem('quiz')
        return data === null || isEmpty(data) ? null : JSON.parse(data)
      } catch (err) {
        logger.warn(err, 'Problem occured when parsing quiz stored data')
        return null
      }
    },
    options
  )
}
