import { ComponentPropsWithRef, ElementType } from 'react'

export type PolymorphicComponent<C extends ElementType, Props = {}> = Props &
  Omit<ComponentPropsWithRef<C>, keyof Props> & { as?: C }

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref']

export type SpaceVariants =
  | 'xxsmall'
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'xxxlarge'

// examples

// basic component:
/*
    export interface TextProps {
      color?: string
    }

    const Text = <C extends ElementType = 'div'>({
      children,
      as,
      ...props
    }: PolymorphicComponent<C, TextProps>): ReactElement => {
      const Component = as || 'div'
      return <Component {...props}>{children}</Component>
    }

    export default Text
    */

// forwardRef component:
// export interface TextProps {
//   tone?: string
// }
//
// function BaseText<C extends ElementType = 'div'>(
//   props: PolymorphicComponent<C, TextProps>,
//   ref: PolymorphicRef<C>
// ): ReactElement {
//   // пропы деструктурируем в теле компонента, тк в аргументах функции это ломает отображение таблицы пропов
//   const {
//     as,
//     tone
//   } = props
//   const Component = as || 'div'
//
//   return (
//     <Component ref={ref}>
//   {children}
//   </Component>
// )
// }

// Экспорт именнованный, тк с дефолтным пропы отказываются появляться(https://github.com/storybookjs/storybook/issues/9556)
// export const Space = forwardRef(BaseSpace) as typeof BaseSpace
