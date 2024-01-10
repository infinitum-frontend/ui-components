import React, { ReactNode } from 'react'
import { Modal } from 'Components/Modal'
import { Text } from 'Components/Text'
import { Space } from 'Components/Space'
import { Button } from 'Components/Button'
import cn from 'classnames'

export interface ConfirmationOptions {
  /**
   * Заголовок
   */
  title: string
  /**
   * Подробное описание
   */
  description?: ReactNode
  /**
   * Текст на кнопке подтвержения
   */
  confirmText: string
  /**
   * Текст на кнопке отмены
   */
  cancelText: string
}

export interface ConfirmModalProps extends ConfirmationOptions {
  open: boolean
  className?: string
  /**
   * Событие при клике на кнопку подтверждения
   */
  onConfirm: () => void
  /**
   * Событие при клике на кнопку отмены или закрытии модального окна
   */
  onCancel: () => void
}

/**
 * Модальное окно подтверждения. Аналог нативного window.confirm
 */
const ConfirmModal = React.forwardRef<HTMLDivElement, ConfirmModalProps>(
  (
    {
      open,
      className,
      title,
      description,
      confirmText,
      cancelText,
      onConfirm,
      onCancel,
      ...props
    },
    ref
  ) => {
    return (
      <Modal
        ref={ref}
        className={cn('inf-confirm-modal', className)}
        open={open}
        onClose={onCancel}
        closeOnClickOutside={false}
        closeOnEsc={false}
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
            <Button variant="primary" onClick={onConfirm}>
              {confirmText}
            </Button>
            <Button variant="ghost" onClick={onCancel}>
              {cancelText}
            </Button>
          </Space>
        </Modal.Footer>
      </Modal>
    )
  }
)

ConfirmModal.displayName = 'ConfirmModal'

export default ConfirmModal
