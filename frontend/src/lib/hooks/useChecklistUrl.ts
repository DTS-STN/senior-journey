import { useEffect, useState } from 'react'

import { compact, isEmpty } from 'lodash'

import { ChecklistFilters } from '../../pages/checklist/[filters]'
import { useQuizData } from './useQuizData'

export const useChecklistUrl = () => {
  const [checklistUrl, setChecklistUrl] = useState('/quiz')
  const { data: quizData } = useQuizData()

  useEffect(() => {
    if (isEmpty(quizData)) {
      setChecklistUrl('/quiz')
      return
    }

    // Encodes a js object as a url-safe base64 string.
    const checklistFilters: ChecklistFilters = { answers: compact(Object.values<string>(quizData)), tags: [] }
    const encodedChecklistFilters = encodeURIComponent(window.btoa(JSON.stringify(checklistFilters)))
    setChecklistUrl(`/checklist/${encodedChecklistFilters}`)
  }, [quizData])

  return checklistUrl
}
