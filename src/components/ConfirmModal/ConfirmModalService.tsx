import {
  ReactNode,
  createContext,
  useContext,
  useRef,
  useState,
  ReactElement,
  useCallback
} from 'react'
import ConfirmModal, { ConfirmationOptions } from './ConfirmModal'

const defaultOptions: ConfirmationOptions = {
  title: '',
  cancelText: '',
  confirmText: ''
}

type ConfirmFunction = (options: ConfirmationOptions) => Promise<boolean>

const ConfirmModalContext = createContext<ConfirmFunction>(async () => false)

export function ConfirmModalProvider({
  children
}: {
  children: ReactNode
}): ReactElement {
  // сохраняем переданные в функцию confirm параметры для дальнейшей передачи в компонент ConfirmModal
  const [optionsInState, setOptionsInState] =
    useState<ConfirmationOptions>(defaultOptions)

  const [isModalOpen, setModalOpen] = useState<boolean>(false)
  // сохраняем промис в реф, чтобы зарезолвить его при срабатывании onConfirm или onCancel в компоненте ConfirmModal
  const awaitingPromiseRef = useRef<(choice: boolean) => void>()

  const confirm = useCallback<ConfirmFunction>(
    async (options: ConfirmationOptions) => {
      return await new Promise((resolve) => {
        setOptionsInState({ ...options })
        setModalOpen(true)

        awaitingPromiseRef.current = (choice) => {
          resolve(choice)
          setModalOpen(false)
        }
      })
    },
    [setOptionsInState, setModalOpen]
  )

  return (
    <ConfirmModalContext.Provider value={confirm}>
      {children}
      <ConfirmModal
        {...optionsInState}
        open={isModalOpen}
        onConfirm={() => awaitingPromiseRef.current?.(true)}
        onCancel={() => awaitingPromiseRef.current?.(false)}
      />
    </ConfirmModalContext.Provider>
  )
}

export function useConfirm(): ConfirmFunction {
  return useContext(ConfirmModalContext)
}
