import { useEffect, useState } from 'react'

import { isEmpty } from 'lodash'

import { toChecklistFilter } from '../mappers/quiz-form-state-mapper'
import { useQuizData } from './useQuizData'
import urlcat from 'urlcat'

export const useChecklistUrl = () => {
  const [checklistUrl, setChecklistUrl] = useState('/quiz')
  const { data: quizData } = useQuizData()

  useEffect(() => {
    if (isEmpty(quizData)) {
      setChecklistUrl('/quiz')
      return
    }

    // Encodes a js object as a url-safe base64 string.
    const checklistFilters = toChecklistFilter(quizData)
    setChecklistUrl(urlcat("/checklist/:filters", {filters: window.btoa(JSON.stringify(checklistFilters))}))
  }, [quizData])

  return checklistUrl
}
