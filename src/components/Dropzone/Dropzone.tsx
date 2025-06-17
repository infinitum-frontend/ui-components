import { ComponentPropsWithoutRef, ReactElement, useRef, useState } from 'react'
import { Box } from '../Box'
import { IconFileAdd } from '@infinitum-ui/icons'
import { Icon } from '../Icon'
import { Text } from '../Text'
import './Dropzone.scss'
import { Space } from '../Space'
import classNames from 'classnames'

export interface DropzoneProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'color' | 'onChange' | 'title'
  > {
  onChange: (files: File[]) => void
  accept?: string
  buttonText?: string
  description?: string
  hint?: string
  disabled?: boolean
}

const Dropzone = ({
  onChange,
  description = 'или перетащите, чтобы загрузить файл',
  buttonText = 'Кликните',
  hint,
  accept,
  disabled,
  className,
  ...props
}: DropzoneProps): ReactElement => {
  const [isDragOver, setIsDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = (): void => {
    inputRef.current?.click()
  }

  return (
    <Box
      padding="small"
      onClick={handleClick}
      onDragOver={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
      onDragOverCapture={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault()
        setIsDragOver(false)
        onChange(Array.from(e.dataTransfer.files || []))
      }}
      borderRadius="small"
      className={classNames('inf-dropzone', className, {
        'inf-dropzone--disabled': disabled,
        'inf-dropzone--dragover': isDragOver
      })}
      {...props}
    >
      <input
        type="file"
        multiple
        className="inf-dropzone__input"
        accept={accept}
        ref={inputRef}
        onChange={(e) => {
          e.preventDefault()
          onChange(Array.from(e.target.files || []))
        }}
      />
      <Space gap="small" align="center">
        <Icon className="inf-dropzone__icon">
          <IconFileAdd />
        </Icon>
        <Space gap="xsmall">
          <Text>
            <Text as="span" color={disabled ? 'info-disabled' : 'info'}>
              {buttonText}
            </Text>
            &nbsp;
            <Text as="span" color={disabled ? 'tertiary' : 'primary'}>
              {description}
            </Text>
          </Text>
          {hint && (
            <Text color="secondary" variant="body-2">
              {hint}
            </Text>
          )}
        </Space>
      </Space>
    </Box>
  )
}

export default Dropzone
