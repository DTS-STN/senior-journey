import { getAnswer, getAnswers, toChecklistFilter } from '../../../src/lib/mappers/quiz-form-state-mapper'

describe('getAnswer', () => {
  test('returns the skipAnswer when the answer is empty', () => {
    // arrange
    const answer = ''
    const skipAnswer = 'kids-skip'

    // act
    const act = getAnswer(answer, skipAnswer)

    // assert
    expect(act).toBe(skipAnswer)
  })

  test('returns the answer when the answer is not empty', () => {
    // arrange
    const answer = 'answer'
    const skipAnswer = 'kids-skip'

    // act
    const act = getAnswer(answer, skipAnswer)

    // assert
    expect(act).toBe(answer)
  })
})

describe('getAnswers', () => {
  it.each([{ answers: [] }, { answers: [''] }, { answers: ['', ''] }])(
    'returns an array with the skipAnswer when answers is empty; answers: $answers',
    ({ answers }) => {
      // arrange
      const skipAnswer = 'marital-status-skip'

      // act
      const act = getAnswers(answers, skipAnswer)

      // assert
      expect(act).toEqual([skipAnswer])
    }
  )

  test('returns a compacted array of answers when answers is not empty', () => {
    // arrange
    const answers = ['answer-one', '', 'answer-two', '']
    const skipAnswer = 'marital-status-skip'

    // act
    const result = getAnswers(answers, skipAnswer)

    // assert
    expect(result).toEqual(['answer-one', 'answer-two'])
  })
})

describe('toChecklistFilter', () => {
  test('returns the correct checklist filters with non-empty values', () => {
    // arrange
    const state = {
      divorcedOrSeparated: 'divorced-or-separated-answer',
      financialPreparedness: 'financial-preparedness-answer',
      hasChildren: 'has-children-answer',
      hasCppDisabilityBenefits: 'has-cpp-disability-benefits-answer',
      hasExtraIncome: 'has-extra-income-answer',
      legalStatus: 'legal-status-answer',
      marriedOrCommonLaw: 'married-or-common-law-answer',
      retirementAge: 'retirement-age-answer',
      retirementTimeframe: 'retirement-timeframe-answer',
      single: 'single-answer',
      widowed: 'widowed-answer',
      yearsInCanada: 'years-in-canada-answer',
    }

    // act
    const act = toChecklistFilter(state)

    // assert
    const expected = [
      'divorced-or-separated-answer',
      'financial-preparedness-answer',
      'has-children-answer',
      'has-cpp-disability-benefits-answer',
      'has-extra-income-answer',
      'legal-status-answer',
      'married-or-common-law-answer',
      'retirement-age-answer',
      'retirement-timeframe-answer',
      'single-answer',
      'widowed-answer',
      'years-in-canada-answer',
    ]
    expect(act.answers).toEqual(expect.arrayContaining(expected))
    expect(act.answers.length).toEqual(expected.length)
  })

  test('returns the correct checklist filters with empty values', () => {
    // arrange
    const state = {
      divorcedOrSeparated: '',
      financialPreparedness: '',
      hasChildren: '',
      hasCppDisabilityBenefits: '',
      hasExtraIncome: '',
      legalStatus: '',
      marriedOrCommonLaw: '',
      retirementAge: '',
      retirementTimeframe: '',
      single: '',
      widowed: '',
      yearsInCanada: '',
    }

    // act
    const act = toChecklistFilter(state)

    // assert
    const expected = [
      'cppd-skip',
      'in-canada-skip',
      'income-skip',
      'kids-skip',
      'marital-status-skip',
      'preparedness-skip',
      'retirement-age-skip',
      'retirement-living-skip',
      'status-skip',
    ]
    expect(act.answers).toEqual(expect.arrayContaining(expected))
    expect(act.answers.length).toEqual(expected.length)
  })
})
