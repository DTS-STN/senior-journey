import { FC, useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { IIdleTimerProps, useIdleTimer } from 'react-idle-timer'

import Modal from './Modal'

export interface IdleTimeoutProps
  extends Pick<IIdleTimerProps, 'promptBeforeIdle'>,
    Pick<IIdleTimerProps, 'timeout'> {}

const IdleTimeout: FC<IdleTimeoutProps> = ({ promptBeforeIdle, timeout }) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState('')

  const handleOnIdle = () => {
    router.reload()
  }

  const handleOnIdleContinueSession = () => {
    setModalOpen(false)
    reset()
  }

  const { reset, getRemainingTime } = useIdleTimer({
    onIdle: handleOnIdle,
    onPrompt: () => setModalOpen(true),
    promptBeforeIdle: promptBeforeIdle ?? 5 * 60 * 1000, //5 minutes
    timeout: timeout ?? 15 * 60 * 1000, //15 minutes
  })

  const tick = useCallback(() => {
    const minutes = Math.floor(getRemainingTime() / 60000)
    const seconds = Math.floor((getRemainingTime() / 1000) % 60).toFixed(0)
    setTimeRemaining(
      minutes + ':' + (parseInt(seconds) < 10 ? '0' : '') + seconds
    )
  }, [getRemainingTime])

  useEffect(() => {
    setInterval(tick, 1000)
  }, [tick])

  return (
    <Modal
      open={modalOpen && timeRemaining.length > 0}
      onClose={handleOnIdleContinueSession}
      actionButtons={[
        {
          onClick: () => handleOnIdle(),
          style: 'primary',
          text: t('modal-idle-timeout.end-session'),
        },
        {
          onClick: handleOnIdleContinueSession,
          style: 'default',
          text: t('modal-idle-timeout.continue-session'),
        },
      ]}
      header={t('modal-idle-timeout.header')}
    >
      <p>{t('modal-idle-timeout.description', { timeRemaining })}</p>
    </Modal>
  )
}

export default IdleTimeout
