import { FC, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  MobileStepper,
  Modal,
} from '@mui/material'
import { FormikWizard } from 'formik-wizard-form'
import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
import { FocusOn } from 'react-focus-on'

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

export interface QuizConfirmationProps {
  sureText: string
  noText: string
  yesText: string
  handleConfirmationCancel: () => void
  handleCloseModal: () => void
}

export interface QuizFooterProps {
  currentStepIndex: number | undefined
  handleNext: () => void
  isNextDisabled: boolean
  handlePrev: () => void
  isPrevDisabled: boolean
  startText: string
  previousText: string
  submitText: string
  nextText: string
  ofText: string
}

const QuizConfirmation: FC<QuizConfirmationProps> = ({
  handleConfirmationCancel,
  handleCloseModal,
  sureText,
  noText,
  yesText,
}) => {
  return (
    <div className="flex h-full w-full flex-col text-center">
      <ErrorOutlineIcon className="m-10 mx-auto text-9xl font-bold text-red-dark" />
      <p className="mb-10">{sureText}</p>
      <div className="mt-auto grid gap-4 md:grid-cols-2">
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
    </div>
  )
}

const QuizFooter: FC<QuizFooterProps> = ({
  currentStepIndex,
  handleNext,
  isNextDisabled,
  handlePrev,
  isPrevDisabled,
  startText,
  previousText,
  submitText,
  nextText,
  ofText,
}) => {
  return (
    <div className="mt-auto border-t border-gray-300 pt-6 md:border-t-0">
      {currentStepIndex === 0 && (
        <Button
          onClick={handleNext}
          disabled={isNextDisabled}
          size="large"
          fullWidth
        >
          {startText}
        </Button>
      )}

      {currentStepIndex != 0 && (
        <div>
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
          <p className="text-center">
            {currentStepIndex} {ofText} 9
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <Button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              size="large"
              fullWidth
              variant="text"
            >
              {previousText}
            </Button>
            {currentStepIndex === 9 ? (
              <Button
                onClick={handleNext}
                disabled={isNextDisabled}
                size="large"
                fullWidth
              >
                {submitText}
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={isNextDisabled}
                size="large"
                fullWidth
              >
                {nextText}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const Learn: FC = () => {
  const { t } = useTranslation('learn')
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
      setShowConfirmation(false)
      setIsModalOpen(false)
    } else {
      setShowConfirmation(true)
    }
  }

  const handleConfirmationCancel = () => {
    setShowConfirmation(false)
  }

  const [, setFinalValues] = useState({})
  const [, setFinished] = useState(false)

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

      <Modal
        onClose={handleCloseModal}
        open={isModalOpen}
        className="mx-auto flex w-full border-none bg-transparent p-1
        backdrop-blur-sm backdrop:bg-black backdrop:bg-opacity-80"
      >
        <FocusOn enabled={isModalOpen} className="w-full md:py-16">
          <section
            data-autofocus
            tabIndex={-1}
            className="mx-auto h-full items-center justify-center overflow-y-auto
            rounded-md bg-white p-6 sm:w-full md:w-2/3 lg:w-3/5 xl:w-2/5 "
            aria-describedby={`QuizModal-header`}
          >
            <div className="flex h-full flex-col">
              {!showConfirmation && (
                <>
                  <div className="mb-5 text-right">
                    <Button
                      variant="text"
                      onClick={handleCloseModal}
                      startIcon={<CloseIcon />}
                      size="large"
                    >
                      {t('quiz.navigation.close')}
                    </Button>
                  </div>
                  <h2 className="mb-8 font-display font-medium md:mb-16 md:rounded-3xl md:bg-[#f5f5f5] md:p-6 md:text-4xl md:text-primary-700">
                    {t('quiz.navigation.title')}
                  </h2>
                </>
              )}

              <FormikWizard
                initialValues={{}}
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
                      {showConfirmation ? (
                        <QuizConfirmation
                          handleCloseModal={handleCloseModal}
                          handleConfirmationCancel={handleConfirmationCancel}
                          sureText={t('quiz.confirmation.sure')}
                          yesText={t('quiz.confirmation.yes')}
                          noText={t('quiz.confirmation.no')}
                        />
                      ) : (
                        <>
                          {renderComponent()}
                          <QuizFooter
                            currentStepIndex={currentStepIndex}
                            handleNext={handleNext}
                            isNextDisabled={isNextDisabled}
                            handlePrev={handlePrev}
                            isPrevDisabled={isPrevDisabled}
                            startText={t('quiz.navigation.start')}
                            previousText={t('quiz.navigation.previous')}
                            submitText={t('quiz.navigation.submit')}
                            nextText={t('quiz.navigation.next')}
                            ofText={t('quiz.navigation.of')}
                          />
                        </>
                      )}
                    </>
                  )
                }}
              </FormikWizard>
            </div>
          </section>
        </FocusOn>
      </Modal>

      <section>
        {sections.map((section, index) => (
          <div key={index}>
            <h2 className="h2 text-primary-700">
              {t(`sections.${index}.title`)}
            </h2>
            <p>{t(`sections.${index}.body`)}</p>
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
