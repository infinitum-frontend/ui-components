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
import { formElementDisplayName } from '../../constants'

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

    const childrenArray = React.Children.toArray(children)

    const labelElement = childrenArray.find(
      // @ts-expect-error
      (child) => child.type?.displayName === formElementDisplayName.Label
    )
    const actionElement = childrenArray.find(
      // @ts-expect-error
      (child) => child.type?.displayName === formElementDisplayName.Action
    )
    const otherChildrne = childrenArray.filter(
      (child) =>
        // @ts-expect-error
        child.type?.displayName !== formElementDisplayName.Label &&
        // @ts-expect-error
        child.type?.displayName !== formElementDisplayName.Action
    )

    return (
      <FormGroupContext.Provider value={context}>
        <Space
          ref={ref}
          gap={gap}
          className={cn(className, 'inf-form-group')}
          direction={direction}
          {...props}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            {labelElement}
            {actionElement}
          </div>
          {otherChildrne}
          {errorMessage && (
            <Form.ErrorMessage>{errorMessage}</Form.ErrorMessage>
          )}
        </Space>
      </FormGroupContext.Provider>
    )
  }
)

FormGroup.displayName = formElementDisplayName.Group

export default FormGroup
