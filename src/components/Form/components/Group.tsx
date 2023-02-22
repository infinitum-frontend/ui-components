import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactElement,
  useId
} from 'react'
import FormGroupContext from 'Components/Form/context/group'
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
  isRequired?: boolean
}

const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  (
    {
      direction = 'vertical',
      gap = 'medium',
      isRequired = false,
      children,
      className,
      ...props
    }: FormGroupProps,
    ref
  ): ReactElement => {
    const context = {
      id: `field-${useId()}`,
      isRequired
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
