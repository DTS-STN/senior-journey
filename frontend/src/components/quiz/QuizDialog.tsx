import { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { LoadingButton } from '@mui/lab'
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
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { useSetQuizData } from '../../lib/hooks/useSetQuizData'
import { toChecklistFilter } from '../../lib/mappers/quiz-form-state-mapper'
import { QuizFormState } from '../../lib/types'
import { QuestionApply } from './questions/QuestionApply'
import { QuestionDisabilityBenefits } from './questions/QuestionDisabilityBenefits'
import { QuestionEarn } from './questions/QuestionEarn'
import { QuestionFeelPrepared } from './questions/QuestionFeelPrepared'
import { QuestionHowLong } from './questions/QuestionHowLong'
import { QuestionStatus } from './questions/QuestionStatus'
import { QuestionWhen } from './questions/QuestionWhen'
import { QuestionWhere } from './questions/QuestionWhere'

const defaultFormValues: QuizFormState = {
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

export interface QuizConfirmationProps {
  noText: string
  onCancel: () => void
  onClose: () => void
  sureText: string
  yesText: string
}

export const QuizConfirmation: FC<QuizConfirmationProps> = ({ noText, onCancel, onClose, sureText, yesText }) => {
  return (
    <>
      <DialogContent className='min-h-[850px]'>
        <div className="mb-10 text-center">
          <ErrorOutlineIcon className="text-9xl text-red-dark" />
        </div>
        <p id="quiz-modal-close-confirmation">{sureText}</p>
      </DialogContent>
      <DialogActions className="block">
        <div className="sm:flex sm:flex-row-reverse sm:gap-2">
          <Button data-cy="yes-button" onClick={onClose} size="large" fullWidth className="mb-2 sm:mb-0">
            {yesText}
          </Button>
          <Button data-cy="no-button" onClick={onCancel} variant="outlined" size="large" fullWidth>
            {noText}
          </Button>
        </div>
      </DialogActions>
    </>
  )
}

interface QuizDialogWizardProps {
  onClose: () => void
}

const QuizDialogWizard: FC<QuizDialogWizardProps> = ({ onClose }) => {
  const router = useRouter()
  const { t } = useTranslation('quiz')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { mutate: setQuizData } = useSetQuizData()

  const formikWizard = useFormikWizard({
    initialValues: defaultFormValues,
    onSubmit: async (values) => {
      setQuizData(values as QuizFormState)

      // Encodes a js object as a url-safe base64 string.
      const checklistFilters = toChecklistFilter(values as QuizFormState)
      const encodedChecklistFilters = encodeURIComponent(window.btoa(JSON.stringify(checklistFilters)))
      await router.push(`/checklist/${encodedChecklistFilters}`)
    },
    validateOnNext: true,
    activeStepIndex: 0,
    steps: [
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
    if (formikWizard.isSubmitting) return

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
      open={true}
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
          yesText={t('confirmation.yes')}
          noText={t('confirmation.no')}
        />
      ) : (
        <>
          <div className="flex min-h-[850px] flex-col" data-cy="navigation-container">
            <DialogTitle className="text-right" id="quiz-modal-header">
              <Button
                disabled={formikWizard.isSubmitting}
                data-cy="close-button"
                variant="text"
                onClick={handleOnClose}
                startIcon={<CloseIcon />}
                size="large"
              >
                {t('navigation.close')}
              </Button>
            </DialogTitle>
            <DialogContent className="flex flex-col">
              <h2 className="mb-8 font-display text-2xl font-medium md:rounded-3xl md:bg-[#f5f5f5] md:p-6 md:text-4xl md:text-primary-700">
                {t('navigation.title')}
              </h2>
              <div className="mb-5">{formikWizard.renderComponent()}</div>
              <div className="mt-auto">
                <LinearProgress
                  variant="determinate"
                  value={(((formikWizard.currentStepIndex ?? 0) + 1) / 8) * 100}
                  aria-labelledby="progress-label"
                  data-cy="progress-bar"
                  className="my-2"
                />
                <p id="progress-label" className="my-4 text-sm text-center">
                  {t('navigation.progress', { currentStep: (formikWizard.currentStepIndex ?? 0) + 1, totalSteps: 8 })}
                </p>
              </div>
            </DialogContent>
            <DialogActions className="block">
              <div className="grid gap-2 sm:grid-cols-2">
                {formikWizard.isLastStep ? (
                  <LoadingButton
                    className="sm:order-last"
                    data-cy="submit-button"
                    fullWidth
                    loading={formikWizard.isSubmitting}
                    loadingIndicator={t('navigation.submitting')}
                    onClick={() => {
                      formikWizard.handleNext()
                    }}
                    size="large"
                    variant="contained"
                  >
                    <span>{t('navigation.submit')}</span>
                  </LoadingButton>
                ) : (
                  <Button
                    className="sm:order-last"
                    data-cy="next-button"
                    disabled={formikWizard.isNextDisabled}
                    fullWidth
                    onClick={() => {
                      formikWizard.handleNext()
                    }}
                    size="large"
                  >
                    {t('navigation.next')}
                  </Button>
                )}
                {formikWizard.isPrevDisabled ? (
                  <div></div>
                ) : (
                  <Button
                    onClick={() => {
                      formikWizard.handlePrev()
                    }}
                    disabled={formikWizard.isSubmitting}
                    data-cy="previous-button"
                    size="large"
                    fullWidth
                    variant="text"
                  >
                    {t('navigation.previous')}
                  </Button>
                )}
              </div>
            </DialogActions>
          </div>
        </>
      )}
    </Dialog>
  )
}

export interface QuizDialogProps {
  onClose: () => void
  open: boolean
}

export const QuizDialog: FC<QuizDialogProps> = ({ onClose, open }) => {
  /**
   * Conditionally render QuizDialogWizard to always start with new states
   */
  if (open) return <QuizDialogWizard onClose={onClose} />
  return null
}
