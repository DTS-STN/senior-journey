import { compact, isEmpty } from 'lodash'

import { ChecklistFilters, QuizFormState } from '../types'

type SkipAnswer =
  | 'cppd-skip'
  | 'in-canada-skip'
  | 'income-skip'
  | 'kids-skip'
  | 'marital-status-skip'
  | 'preparedness-skip'
  | 'retirement-age-skip'
  | 'retirement-living-skip'
  | 'status-skip'

const getAnswer = (answer: string, skipAnswer: SkipAnswer) => {
  return isEmpty(answer) ? skipAnswer : answer
}

const getAnswers = (answers: Array<string>, skipAnswer: SkipAnswer) => {
  return isEmpty(answers) ? [skipAnswer] : compact(answers)
}

export const toChecklistFilter = (state: QuizFormState): ChecklistFilters => {
  const answers: Array<string> = []

  // QuestionApply - Children
  answers.push(getAnswer(state.hasChildren, 'kids-skip'))

  // QuestionApply - Marital Status
  answers.push(
    ...getAnswers(
      [state.single, state.marriedOrCommonLaw, state.divorcedOrSeparated, state.widowed],
      'marital-status-skip'
    )
  )

  // QuestionDisabilityBenefits
  answers.push(getAnswer(state.hasCppDisabilityBenefits, 'cppd-skip'))

  // QuestionEarn
  answers.push(getAnswer(state.hasExtraIncome, 'income-skip'))

  // QuestionFeelPreprared
  answers.push(getAnswer(state.financialPreparedness, 'preparedness-skip'))

  // QuestionHowLong
  answers.push(getAnswer(state.yearsInCanada, 'in-canada-skip'))

  // QuestionStatus
  answers.push(getAnswer(state.legalStatus, 'status-skip'))

  // QuestionWhen
  answers.push(getAnswer(state.retirementAge, 'retirement-age-skip'))

  // QuestionWhere
  answers.push(getAnswer(state.retirementTimeframe, 'retirement-living-skip'))

  return { answers: compact(answers), tags: [] }
}
