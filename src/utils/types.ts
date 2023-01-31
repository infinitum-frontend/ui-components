import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
  WeakValidationMap
} from 'react'

export type PolymorphicComponent<C extends ElementType, Props = {}> = Omit<
  PropsWithChildren<Props & { as?: C }>,
  'children'
> &
  Omit<ComponentPropsWithoutRef<C>, keyof Props>

export type PolymorphicRef<C extends ElementType> =
  ComponentPropsWithRef<C>['ref']

export interface PolymorphicComponentWithRef<
  DefaultTag extends ElementType,
  Props = {}
> {
  <C extends ElementType = DefaultTag>(
    props: PolymorphicComponent<C, Props>
  ): ReactElement | null
  propTypes?:
    | WeakValidationMap<PolymorphicComponent<DefaultTag, Props>>
    | undefined
  defaultProps?:
    | Partial<
        PropsWithChildren<Props & { as?: DefaultTag }> &
          ComponentPropsWithRef<DefaultTag>
      >
    | undefined
  displayName?: string | undefined
}

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
/*
    export interface TextProps {
      gap?: string
    }

    const Text: PolymorphicComponentWithRef<'div', TextProps> = forwardRef(
      <C extends ElementType = 'div'>(
        { as, children, ...props }: PolymorphicComponent<C, TextProps>,
        ref?: PolymorphicRef<C>
      ): ReactElement => {
        const Component = as || 'div'
        return (
          <Component ref={ref} {...props}>
            {children}
         </Component>
        )
      }
    )

    Text.displayName = 'Text'

    export default Text
    */
