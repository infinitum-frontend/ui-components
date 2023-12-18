import React, { PropsWithChildren, ReactNode, useState } from 'react'
import { Modal } from 'Components/Modal'
import { Text } from 'Components/Text'
import { Space } from 'Components/Space'
import { Button } from 'Components/Button'
import cn from 'classnames'

export interface ConfirmModalProps extends PropsWithChildren {
  className?: string
  title: string
  confirmText: string
  description?: ReactNode
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
}

const ConfirmModal = React.forwardRef<HTMLDivElement, ConfirmModalProps>(
  (
    {
      className,
      title,
      description,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      children,
      ...props
    },
    ref
  ) => {
    const [isModalOpen, setModalOpen] = useState(false)

    return (
      <>
        <div onClick={() => setModalOpen(true)}>{children}</div>

        <Modal
          ref={ref}
          className={cn('inf-confirm-modal', className)}
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          closeOnClickOutside={false}
          role="alertdialog"
          {...props}
        >
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          {description && (
            <Modal.Body>
              <Text variant="body-1">{description}</Text>
            </Modal.Body>
          )}

          <Modal.Footer>
            <Space direction="horizontal" gap="medium">
              <Button
                variant="primary"
                onClick={() => {
                  setModalOpen(false)
                  onConfirm?.()
                }}
              >
                {confirmText}
              </Button>

              {cancelText && (
                <Button
                  variant="ghost"
                  onClick={() => {
                    setModalOpen(false)
                    onCancel?.()
                  }}
                >
                  {cancelText}
                </Button>
              )}
            </Space>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
)

ConfirmModal.displayName = 'ConfirmModal'

/** Модальное окно c подтверждением */
export default ConfirmModal
