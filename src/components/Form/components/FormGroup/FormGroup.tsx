// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactElement,
  useId,
  useState
} from 'react'
import FormGroupContext, {
  IFormGroupContext
} from 'Components/Form/context/group'
import cn from 'classnames'
import './FormGroup.scss'
import { Space, SpaceProps } from 'Components/Space'
import Form from 'Components/Form/Form'

export interface FormGroupProps extends ComponentPropsWithoutRef<'div'> {
  /** Направление раскладки */
  direction?: SpaceProps['direction']
  /**
   * Расстояние между блоками
   */
  gap?: SpaceProps['gap']
  /** Отвечает за обязательность заполнения контрола, а также за отображение соответствующего индикатора у лейбла */
  required?: boolean
  /** Сообщение, отображаемое при ошибке валидации */
  customValidationMessage?: string
}

const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      direction = 'vertical',
      gap = 'xxsmall',
      required = false,
      children,
      className,
      customValidationMessage = '',
      ...props
    }: FormGroupProps,
    ref
  ): ReactElement => {
    const [invalid, setInvalid] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const id = `field-${useId()}`

    const context: IFormGroupContext = {
      id,
      required,
      customValidationMessage,
      setErrorMessage,
      invalid,
      setInvalid
    }

    const align: SpaceProps['align'] =
      direction === 'vertical' ? 'start' : 'baseline'

    return (
      <FormGroupContext.Provider value={context}>
        <Space
          align={align}
          ref={ref}
          gap={gap}
          className={cn(className, 'inf-form-group')}
          direction={direction}
          {...props}
        >
          {children}
          {errorMessage && (
            <Form.ErrorMessage>{errorMessage}</Form.ErrorMessage>
          )}
        </Space>
      </FormGroupContext.Provider>
    )
  }
)

FormGroup.displayName = 'Form.Group'

export default FormGroup
