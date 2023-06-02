// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithRef,
  CSSProperties,
  FormEventHandler,
  forwardRef,
  ReactElement
} from 'react'
import cn from 'classnames'
import FormLabel from 'Components/Form/components/Label'
import FormGroup from 'Components/Form/components/Group'
import FormHint from 'Components/Form/components/Hint'
import Space, { SpaceProps } from 'Components/Space/Space'
import FormContext from 'Components/Form/context/form'
import FormItem from 'Components/Form/components/Item'
import FormErrorMessage from 'Components/Form/components/ErrorMessage'

export interface FormProps extends ComponentPropsWithRef<'form'> {
  /**
   * Расстояние между блоками
   */
  gap?: SpaceProps['gap']
  /** Ширина лейбла (валидное значение css-width) */
  labelWidth?: CSSProperties['width']
}

const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      gap = 'medium',
      children,
      labelWidth = '',
      onSubmit,
      className,
      ...props
    },
    ref
  ): ReactElement => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      onSubmit?.(e)
    }

    const context = {
      labelWidth
    }

    return (
      <FormContext.Provider value={context}>
        <Space
          as={'form'}
          gap={gap}
          onSubmit={handleSubmit}
          ref={ref}
          className={cn('inf-form', className, {})}
          {...props}
        >
          {children}
        </Space>
      </FormContext.Provider>
    )
  }
)

Form.displayName = 'Form'

/** Компонент для создания интерактивных и удобных форм ввода, упрощающий пользователям ввод и отправку данных с проверками и настраиваемыми полями */
export default Object.assign(Form, {
  Group: FormGroup,
  Item: FormItem,
  Label: FormLabel,
  Hint: FormHint,
  ErrorMessage: FormErrorMessage
})
