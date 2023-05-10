import { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { useFormikWizard } from 'formik-wizard-form'
import { compact } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { useSetQuizData } from '../../lib/hooks/useSetQuizData'
import { ChecklistFilters } from '../../pages/checklist/[filters]'
import { QuizLanding } from './QuizLanding'
import { QuestionWhen } from './questions/QuestionWhen'
import { QuestionApply } from './questions/QuestionApply'
import { QuestionFeelPrepared } from './questions/QuestionFeelPrepared'
import { QuestionWhere } from './questions/QuestionWhere'
import { QuestionEarn } from './questions/QuestionEarn'
import { QuestionStatus } from './questions/QuestionStatus'
import { QuestionHowLong } from './questions/QuestionHowLong'
import { QuestionDisabilityBenefits } from './questions/QuestionDisabilityBenefits'

// TODO: map form values to "answer-id" from locales/(en/fr)/quiz/tasks/task-list.json once it has been finalized
export interface QuizFormState extends Record<string, string> {
  retirementAge: string
  single: string
  marriedOrCommonLaw: string
  divorcedOrSeparated: string
  widowed: string
  hasChildren: string
  financialPreparedness: string
  retirementTimeframe: string
  hasExtraIncome: string
  legalStatus: string
  yearsInCanada: string
  hasCppDisabilityBenefits: string
}

const defaultFormValues: QuizFormState = {
  retirementAge: '',
  single: '',
  marriedOrCommonLaw: '',
  divorcedOrSeparated: '',
  widowed: '',
  hasChildren: '',
  financialPreparedness: '',
  retirementTimeframe: '',
  hasExtraIncome: '',
  legalStatus: '',
  yearsInCanada: '',
  hasCppDisabilityBenefits: '',
}

export interface QuizConfirmationProps {
  noText: string
  noID: string
  onCancel: () => void
  onClose: () => void
  sureText: string
  yesText: string
  yesID: string
}

export const QuizConfirmation: FC<QuizConfirmationProps> = ({ noText, noID, onCancel, onClose, sureText, yesText, yesID }) => {
  return (
    <>
      <DialogContent>
        <div className="mb-10 text-center">
          <ErrorOutlineIcon className="text-9xl text-red-dark" />
        </div>
        <p id="quiz-modal-close-confirmation">{sureText}</p>
      </DialogContent>
      <DialogActions className="block">
        <div className="grid gap-2 md:grid-cols-2 md:gap-6">
          <Button data-cy={noID} onClick={onCancel} variant="outlined" size="large" fullWidth>
            {noText}
          </Button>
          <Button data-cy={yesID} onClick={onClose} size="large" fullWidth>
            {yesText}
          </Button>
        </div>
      </DialogActions>
    </>
  )
}

export interface QuizDialogProps {
  onClose: () => void
  open: boolean
}

export const QuizDialog: FC<QuizDialogProps> = ({ onClose, open }) => {
  const router = useRouter()
  const { t } = useTranslation('quiz')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { mutate: setQuizData } = useSetQuizData()

  const formikWizard = useFormikWizard({
    initialValues: defaultFormValues,
    onSubmit: (values) => {
      setQuizData(values as QuizFormState)

      // Encodes a js object as a url-safe base64 string.
      const checklistFilters: ChecklistFilters = { answers: compact(Object.values<string>(values)), tags: [] }
      const encodedChecklistFilters = encodeURIComponent(window.btoa(JSON.stringify(checklistFilters)))
      router.push(`/checklist/${encodedChecklistFilters}`)
    },
    validateOnNext: true,
    activeStepIndex: 0,
    steps: [
      { component: QuizLanding },
      { component: QuestionWhen },
      { component: QuestionApply },
      { component: QuestionFeelPrepared },
      { component: QuestionWhere },
      { component: QuestionEarn },
      { component: QuestionStatus },
      { component: QuestionHowLong },
      { component: QuestionDisabilityBenefits },
    ],
  })

  const handleOnClose = () => {
    if (showConfirmation) {
      onClose()
      // 1 second timeout otherwise dialog shows quiz content and close
      setTimeout(function () {
        setShowConfirmation(false)
      }, 1000)
    } else {
      setShowConfirmation(true)
    }
  }

  const handleOnConfirmationCancel = () => {
    setShowConfirmation(false)
  }

  return (
    <Dialog
      onClose={handleOnClose}
      open={open}
      aria-labelledby={`${showConfirmation ? 'quiz-modal-close-confirmation' : 'quiz-modal-header'}`}
      scroll="body"
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
    >
      {showConfirmation ? (
        <QuizConfirmation
          onClose={handleOnClose}
          onCancel={handleOnConfirmationCancel}
          sureText={t('confirmation.sure')}
          yesText={t('confirmation.yes.text')}
          yesID={t('confirmation.yes.id')}
          noText={t('confirmation.no.text')}
          noID={t('confirmation.no.id')}
        />
      ) : (
        <>
          <div className="flex min-h-[850px] flex-col" data-cy={t('navigation.id')}>
            <DialogTitle className="text-right" id="quiz-modal-header">
              <Button data-cy={t('navigation.close.id')} variant="text" onClick={handleOnClose} startIcon={<CloseIcon />} size="large">
                {t('navigation.close.text')}
              </Button>
            </DialogTitle>
            <DialogContent className="flex flex-col">
              <h2 className="mb-8 font-display text-2xl font-medium md:mb-16 md:rounded-3xl md:bg-[#f5f5f5] md:p-6 md:text-4xl md:text-primary-700">
                {t('navigation.title')}
              </h2>
              <div className="mb-5">{formikWizard.renderComponent()}</div>
              {!formikWizard.isFirstStep && (
                <div className="mt-auto">
                  <LinearProgress
                    variant="determinate"
                    value={((formikWizard.currentStepIndex ?? 0) / 8) * 100}
                    aria-labelledby={t('navigation.progress.label')}
                    data-cy={t('navigation.progress.id')}
                    className="my-2"
                  />
                  <p id="progress-label" className="m-0 text-center">
                    {formikWizard.currentStepIndex} {t('navigation.of')} 8
                  </p>
                </div>
              )}
            </DialogContent>
            <DialogActions className="block">
              {formikWizard.isFirstStep ? (
                <Button
                  onClick={formikWizard.handleNext}
                  disabled={formikWizard.isNextDisabled}
                  data-cy={t('navigation.start.id')}
                  size="large"
                  fullWidth
                  autoFocus
                >
                  {t('navigation.start.text')}
                </Button>
              ) : (
                <>
                  <div className="grid gap-2 md:grid-cols-2 md:gap-6">
                    <Button
                      onClick={formikWizard.handlePrev}
                      disabled={formikWizard.isPrevDisabled}
                      data-cy={t('navigation.previous.id')}
                      size="large"
                      fullWidth
                      variant="outlined"
                    >
                      {t('navigation.previous.text')}
                    </Button>
                    <Button
                      onClick={formikWizard.handleNext}
                      disabled={formikWizard.isNextDisabled}
                      data-cy={formikWizard.isLastStep ? t('navigation.submit.id') : t('navigation.next.id')}
                      size="large"
                      fullWidth
                    >
                      {formikWizard.isLastStep ? t('navigation.submit.text') : t('navigation.next.text')}
                    </Button>
                  </div>
                </>
              )}
            </DialogActions>
          </div>
        </>
      )}
    </Dialog>
  )
}
