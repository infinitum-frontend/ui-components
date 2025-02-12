import { ReactElement, ChangeEvent, useId, ReactNode } from 'react'
import { Button } from 'Components/Button'

interface UploadButtonProps {
  /**
   * Содержимое
   */
  children?: ReactNode
  /**
   * Дополнительный className
   */
  className?: string
  /**
   * Вариант оформления
   */
  variant?: 'primary' | 'secondary' | 'ghost'
  /**
   * Размер
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Состояние недоступности
   */
  disabled?: boolean
  /**
   * Состояние загрузки
   */
  loading?: boolean
  /**
   * Занимает всю ширину контейнера
   */
  block?: boolean
  /**
   * Иконка (без текста)
   */
  icon?: ReactNode
  /**
   * Контент слева от текста
   */
  before?: ReactNode
  /**
   * Контент справа от текста
   */
  after?: ReactNode
  /**
   * Загрузка нескольких файлов
   */
  multiple?: boolean
  /**
   * Тип файлов которые нужно прикрепить
   */
  accept?: string
  onChange: (e: FileList) => void
}
const UploadButton = ({
  children,
  className,
  variant = 'secondary',
  size,
  disabled,
  loading,
  block,
  icon,
  before,
  after,
  onChange,
  multiple,
  accept
}: UploadButtonProps): ReactElement => {
  const domId: string = useId()

  const handleChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement

    if (target.files?.length) {
      onChange(target.files)
    }

    target.value = '' // for onChange with same filename
  }
  return (
    <div role="button">
      <Button
        as="label"
        className={className}
        htmlFor={domId}
        variant={variant}
        size={size}
        disabled={disabled}
        loading={loading}
        block={block}
        icon={icon}
        before={before}
        after={after}
      >
        {children || 'Прикрепить...'}
      </Button>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        id={domId}
        hidden
        disabled={disabled}
        onChange={handleChange}
      />
    </div>
  )
}

export default UploadButton
