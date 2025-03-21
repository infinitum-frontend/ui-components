// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactNode, ReactElement } from 'react'
import {
  NotificationProvider,
  NotificationContainer
} from 'Components/Notification'
import { ConfirmModalProvider } from '../ConfirmModal'
import { ThemePickerProvider } from '../ThemePicker'

const InfinitumUIProvider = ({
  disableTransitions = false,
  children
}: {
  disableTransitions?: boolean
  children: ReactNode
}): ReactElement => {
  return (
    <>
      <ThemePickerProvider>
        <NotificationProvider>
          <ConfirmModalProvider>{children}</ConfirmModalProvider>
          <NotificationContainer />
        </NotificationProvider>
      </ThemePickerProvider>
      {disableTransitions && (
        <style>
          {`
          * {
            transition: none !important;
            animation: none !important;
          }
        `}
        </style>
      )}
    </>
  )
}

/**
 * Обертка над приложением с необходимыми провайдерами
 */
export default InfinitumUIProvider
