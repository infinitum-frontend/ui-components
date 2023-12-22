// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactNode, ReactElement } from 'react'
import {
  NotificationProvider,
  NotificationContainer
} from 'Components/Notification'
import { ConfirmModalProvider } from '../ConfirmModal'

const InfinitumUIProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
  return (
    <NotificationProvider>
      <ConfirmModalProvider>{children}</ConfirmModalProvider>
      <NotificationContainer />
    </NotificationProvider>
  )
}

/**
 * Обертка над приложением с необходимыми провайдерами
 */
export default InfinitumUIProvider
