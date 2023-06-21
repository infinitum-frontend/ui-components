// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  ComponentPropsWithRef,
  CSSProperties,
  FormEventHandler,
  forwardRef,
  ReactElement
} from 'react'
import cn from 'classnames'
import { Space, SpaceProps } from 'Components/Space'
import FormContext from './context/form'
import FormLabel from './components/FormLabel'
import FormGroup from './components/FormGroup'
import FormHint from './components/FormHint'
import FormItem from './components/FormItem'
import FormErrorMessage from './components/FormErrorMessage'

export interface FormProps extends ComponentPropsWithRef<'form'> {
  /** Расстояние между блоками */
  gap?: SpaceProps['gap']
  /** Состояние недоступности */
  disabled?: boolean
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
      disabled,
      ...props
    },
    ref
  ): ReactElement => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault()
      onSubmit?.(e)
    }

    const context = {
      labelWidth,
      disabled
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
