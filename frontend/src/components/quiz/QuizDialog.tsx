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
import { Filters } from '../../pages/quiz/tasks/[[...filters]]'
import { QuizLanding } from './QuizLanding'
import { Question1 } from './questions/Question1'
import { Question2 } from './questions/Question2'
import { Question3 } from './questions/Question3'
import { Question4 } from './questions/Question4'
import { Question5 } from './questions/Question5'
import { Question6 } from './questions/Question6'
import { Question7 } from './questions/Question7'
import { Question8 } from './questions/Question8'

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
  onCancel: () => void
  onClose: () => void
  sureText: string
  yesText: string
}

export const QuizConfirmation: FC<QuizConfirmationProps> = ({ noText, onCancel, onClose, sureText, yesText }) => {
  return (
    <>
      <DialogContent>
        <div className="mb-10 text-center">
          <ErrorOutlineIcon className="text-9xl text-red-dark" />
        </div>
        <p>{sureText}</p>
      </DialogContent>
      <DialogActions className="block">
        <div className="grid gap-2 md:grid-cols-2 md:gap-6">
          <Button onClick={onCancel} variant="outlined" size="large" fullWidth>
            {noText}
          </Button>
          <Button onClick={onClose} size="large" fullWidth>
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
      const filters: Filters = { answers: compact(Object.values<string>(values)) }
      const encodedFilters = encodeURIComponent(window.btoa(JSON.stringify(filters)))
      router.push(`/quiz/tasks/${encodedFilters}`)
    },
    validateOnNext: true,
    activeStepIndex: 0,
    steps: [
      { component: QuizLanding },
      { component: Question1 },
      { component: Question2 },
      { component: Question3 },
      { component: Question4 },
      { component: Question5 },
      { component: Question6 },
      { component: Question7 },
      { component: Question8 },
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
      aria-describedby="QuizModal-header"
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
          <div className="flex min-h-[850px] flex-col">
            <DialogTitle className="text-right">
              <Button variant="text" onClick={handleOnClose} startIcon={<CloseIcon />} size="large">
                {t('navigation.close')}
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
                    aria-labelledby="progress-label"
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
                  size="large"
                  fullWidth
                  autoFocus
                >
                  {t('navigation.start')}
                </Button>
              ) : (
                <>
                  <div className="grid gap-2 md:grid-cols-2 md:gap-6">
                    <Button
                      onClick={formikWizard.handlePrev}
                      disabled={formikWizard.isPrevDisabled}
                      size="large"
                      fullWidth
                      variant="outlined"
                    >
                      {t('navigation.previous')}
                    </Button>
                    <Button
                      onClick={formikWizard.handleNext}
                      disabled={formikWizard.isNextDisabled}
                      size="large"
                      fullWidth
                    >
                      {formikWizard.isLastStep ? t('navigation.submit') : t('navigation.next')}
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
