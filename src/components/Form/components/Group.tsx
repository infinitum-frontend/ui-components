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
import '../style/group.scss'
import Space, { SpaceProps } from 'Components/Space/Space'

export interface FormGroupProps extends ComponentPropsWithoutRef<'div'> {
  /** Направление раскладки */
  direction?: SpaceProps['direction']
  /**
   * Расстояние между блоками
   */
  gap?: SpaceProps['gap']
  /** Обязательность заполнения */
  required?: boolean
  /** Сообщение, отображаемое при ошибке валидации */
  invalidMessage?: string
}

const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      direction = 'vertical',
      gap = 'medium',
      required = false,
      children,
      className,
      invalidMessage = '',
      ...props
    }: FormGroupProps,
    ref
  ): ReactElement => {
    const [invalid, setInvalid] = useState(false)

    const context: IFormGroupContext = {
      id: `field-${useId()}`,
      required,
      invalidMessage,
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
        </Space>
      </FormGroupContext.Provider>
    )
  }
)

FormGroup.displayName = 'Form.Group'

export default FormGroup
