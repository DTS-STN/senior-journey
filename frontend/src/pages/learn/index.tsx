import { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MobileStepper,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { FormikWizard } from 'formik-wizard-form'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '../../components/Layout'
import QuizLandingPage from '../../components/QuizLandingPage'
import Question1 from '../../components/questions/Question1'
import Question2 from '../../components/questions/Question2'
import Question3 from '../../components/questions/Question3'
import Question4 from '../../components/questions/Question4'
import Question5 from '../../components/questions/Question5'
import Question6 from '../../components/questions/Question6'
import Question7 from '../../components/questions/Question7'
import Question8 from '../../components/questions/Question8'
import Question9 from '../../components/questions/Question9'

// TODO: map form values to "answer-id" from locales/(en/fr)/quiz/tasks/task-list.json once it has been finalized
export interface FormValues {
  retirementAge: string,
  single: string,
  marriedOrCommonLaw: string,
  divorcedOrSeparated: string,
  widowed: string,
  yesChildren: string,
  noChildren: string
}

export interface QuizConfirmationProps {
  sureText: string
  noText: string
  yesText: string
  handleConfirmationCancel: () => void
  handleCloseModal: () => void
}

const QuizConfirmation: FC<QuizConfirmationProps> = ({
  handleConfirmationCancel,
  handleCloseModal,
  sureText,
  noText,
  yesText,
}) => {
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
          <Button
            onClick={handleConfirmationCancel}
            variant="outlined"
            size="large"
            fullWidth
          >
            {noText}
          </Button>
          <Button onClick={handleCloseModal} size="large" fullWidth>
            {yesText}
          </Button>
        </div>
      </DialogActions>
    </>
  )
}

const Learn: FC = () => {
  const { t } = useTranslation('learn')
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const sections = t<string, { cards: any[] }[]>('sections', {
    returnObjects: true,
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    if (showConfirmation) {
      setIsModalOpen(false)
      // 1 second timeout otherwise dialog shows quiz content and close
      setTimeout(function () {
        setShowConfirmation(false)
      }, 1000)
    } else {
      setShowConfirmation(true)
    }
  }

  const handleConfirmationCancel = () => {
    setShowConfirmation(false)
  }

  const [, setFinalValues] = useState({})
  const [, setFinished] = useState(false)

  const initialValues: FormValues = {
    retirementAge: '',
    single: '',
    marriedOrCommonLaw: '',
    divorcedOrSeparated: '',
    widowed: '',
    yesChildren: '',
    noChildren: '',
  }

  return (
    <Layout>
      <NextSeo title={t('header')} />
      <h1 className="sr-only">{t('header')}</h1>
      <section className="rounded-3xl bg-[#f5f5f5] ">
        <div className="flex flex-col items-center md:flex-row-reverse">
          <div className="m-12 w-1/2 md:w-1/3 lg:w-1/5">
            <Image
              src="/assets/learn-banner.svg"
              width={742}
              height={548}
              sizes="100%"
              alt=""
              priority
            />
          </div>
          <div className="my-2 px-6 pb-10 text-center md:w-2/3 md:pb-10 md:pl-12 md:pt-10 md:text-left lg:w-4/5 lg:pb-4">
            <h2 className="mb-4 text-left font-display text-5xl font-bold text-primary-700">
              {t('banner.title')}
            </h2>
            <p className="pb-4 text-left text-lg font-normal md:w-4/5">
              {t('banner.text')}
            </p>
            <Button size="large" onClick={handleOpenModal}>
              {t('banner.quiz')}
            </Button>
          </div>
        </div>
      </section>

      <Dialog
        onClose={handleCloseModal}
        open={isModalOpen}
        aria-describedby="QuizModal-header"
        scroll="body"
        fullScreen={fullScreen}
        maxWidth="md"
        fullWidth
      >
        {showConfirmation ? (
          <QuizConfirmation
            handleCloseModal={handleCloseModal}
            handleConfirmationCancel={handleConfirmationCancel}
            sureText={t('quiz.confirmation.sure')}
            yesText={t('quiz.confirmation.yes')}
            noText={t('quiz.confirmation.no')}
          />
        ) : (
          <FormikWizard
            initialValues={initialValues}
            onSubmit={(values) => {
              setFinalValues(values)
              setFinished(true)
            }}
            validateOnNext
            activeStepIndex={0}
            steps={[
              {
                component: QuizLandingPage,
              },
              {
                component: Question1,
              },
              {
                component: Question2,
              },
              {
                component: Question3,
              },
              {
                component: Question4,
              },
              {
                component: Question5,
              },
              {
                component: Question6,
              },
              {
                component: Question7,
              },
              {
                component: Question8,
              },
              {
                component: Question9,
              },
            ]}
          >
            {({
              currentStepIndex,
              renderComponent,
              handlePrev,
              handleNext,
              isNextDisabled,
              isPrevDisabled,
            }) => {
              return (
                <>
                  <DialogTitle className="text-right">
                    <Button
                      variant="text"
                      onClick={handleCloseModal}
                      startIcon={<CloseIcon />}
                      size="large"
                    >
                      {t('quiz.navigation.close')}
                    </Button>
                  </DialogTitle>
                  <DialogContent>
                    <h2 className="mb-8 font-display text-2xl font-medium md:mb-16 md:rounded-3xl md:bg-[#f5f5f5] md:p-6 md:text-4xl md:text-primary-700">
                      {t('quiz.navigation.title')}
                    </h2>
                    <div className="mb-5">{renderComponent()}</div>
                    {(currentStepIndex ?? 0) > 0 && (
                      <>
                        <MobileStepper
                          variant="progress"
                          steps={10}
                          position="static"
                          activeStep={currentStepIndex}
                          backButton={undefined}
                          nextButton={undefined}
                          classes={{
                            progress: 'w-full',
                          }}
                        />
                        <p className="m-0 text-center">
                          {currentStepIndex} {t('quiz.navigation.of')} 9
                        </p>
                      </>
                    )}
                  </DialogContent>
                  <DialogActions className="block">
                    {currentStepIndex === 0 ? (
                      <Button
                        onClick={handleNext}
                        disabled={isNextDisabled}
                        size="large"
                        fullWidth
                        autoFocus
                      >
                        {t('quiz.navigation.start')}
                      </Button>
                    ) : (
                      <>
                        <div className="grid gap-2 md:grid-cols-2 md:gap-6">
                          <Button
                            onClick={handlePrev}
                            disabled={isPrevDisabled}
                            size="large"
                            fullWidth
                            variant="outlined"
                          >
                            {t('quiz.navigation.previous')}
                          </Button>
                          <Button
                            onClick={handleNext}
                            disabled={isNextDisabled}
                            size="large"
                            fullWidth
                          >
                            {currentStepIndex === 9
                              ? t('quiz.navigation.submit')
                              : t('quiz.navigation.next')}
                          </Button>
                        </div>
                      </>
                    )}
                  </DialogActions>
                </>
              )
            }}
          </FormikWizard>
        )}
      </Dialog>

      <section>
        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="h2 text-primary-700 mt-12">
              {t(`sections.${index}.title`)}
            </h2>
            <p className='my-6'>{t(`sections.${index}.body`)}</p>
            <div className="grid gap-6 md:grid-cols-2 xl:md:grid-cols-3">
              {section.cards.map((_, cardIndex) => (
                <Card key={cardIndex} className="h-full">
                  <CardActionArea
                    component={Link}
                    href={t(`sections.${index}.cards.${cardIndex}.link`)}
                    className="h-full"
                    aria-describedby={`section-${index}-card-${cardIndex}`}
                  >
                    <CardMedia
                      component="img"
                      alt={t(`sections.${index}.cards.${cardIndex}.title`)}
                      image={t(`sections.${index}.cards.${cardIndex}.image`)}
                      className="h-72 bg-secondary-50 object-contain"
                    />
                    <CardContent>
                      <p className="mb-2 font-display text-sm font-bold">
                        {t(`sections.${index}.cards.${cardIndex}.read`)}
                      </p>
                      <h3
                        className="mb-2 font-display text-xl font-bold"
                        id={`section-${index}-card-${cardIndex}`}
                      >
                        {t(`sections.${index}.cards.${cardIndex}.title`)}
                      </h3>
                      <p className="m-0 text-black/60">
                        {t(`sections.${index}.cards.${cardIndex}.body`)}
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', [
        'common',
        'learn',
      ])),
    },
  }
}

export default Learn
