import {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  PropsWithChildren,
  ReactElement,
  WeakValidationMap
} from 'react'

export type PolymorphicComponent<
  C extends ElementType,
  Props = {}
> = PropsWithChildren<Props & { as?: C }> & ComponentPropsWithoutRef<C>

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
    export interface BaseProps {
      color?: string
    }

    const Text = <C extends ElementType = 'div'>({
      children,
      as,
      ...props
    }: PolymorphicComponent<C, BaseProps>): ReactElement => {
      const Component = as || 'div'
      return <Component {...props}>{children}</Component>
    }

    export default Text
    */

// forwardRef component:
/*
    export interface BaseProps {
      gap?: string
    }

    const Base: PolymorphicComponentWithRef<'div', BaseProps> = forwardRef(
      <C extends ElementType = 'div'>(
        { as, children, ...props }: PolymorphicComponent<C, BaseProps>,
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
