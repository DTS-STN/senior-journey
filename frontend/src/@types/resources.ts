import checklist from '../../public/locales/en/checklist.json'
import common from '../../public/locales/en/common.json'
import home from '../../public/locales/en/home.json'
import learn from '../../public/locales/en/learn.json'
import learn_caseStudies_bonnie from '../../public/locales/en/learn/case-studies/bonnie.json'
import learn_caseStudies_fred from '../../public/locales/en/learn/case-studies/fred.json'
import learn_caseStudies_keith from '../../public/locales/en/learn/case-studies/keith.json'
import learn_decidingWhenToStartYourPublicPensions from '../../public/locales/en/learn/deciding-when-to-start-your-public-pensions.json'
import learn_goingFromWorkToRetirement from '../../public/locales/en/learn/going-from-work-to-retirement.json'
import learn_mainSourcesOfRetirementIncome from '../../public/locales/en/learn/main-sources-of-retirement-income.json'
import learn_planningToSaveForRetirement from '../../public/locales/en/learn/planning-to-save-for-retirement.json'
import learn_rulesOfThumbForPublicPensions from '../../public/locales/en/learn/rules-of-thumb-for-public-pensions.json'
import quiz from '../../public/locales/en/quiz.json'

const resources = {
  'checklist': checklist,
  'common': common,
  'home': home,
  'learn': learn,
  'learn/case-studies/bonnie': learn_caseStudies_bonnie,
  'learn/case-studies/fred': learn_caseStudies_fred,
  'learn/case-studies/keith': learn_caseStudies_keith,
  'learn/deciding-when-to-start-your-public-pensions': learn_decidingWhenToStartYourPublicPensions,
  'learn/going-from-work-to-retirement': learn_goingFromWorkToRetirement,
  'learn/main-sources-of-retirement-income': learn_mainSourcesOfRetirementIncome,
  'learn/planning-to-save-for-retirement': learn_planningToSaveForRetirement,
  'learn/rules-of-thumb-for-public-pensions': learn_rulesOfThumbForPublicPensions,
  'quiz': quiz,
} as const

export default resources
