import React, { ComponentPropsWithoutRef } from 'react'
import LoaderContainer from '../Container/LoaderСontainer'
import './Loader.scss'
import cn from 'classnames'
import { Size, Variant } from '../../enums'

export interface LoaderProps extends ComponentPropsWithoutRef<'div'> {
  /** Дополнительный className */
  className?: string
  /** Размер */
  size?: Size
  /** Вариант оформления */
  variant?: Variant
}

/**
 * Индикатор загрузки
 */
const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (
    { className, size = Size.Regular, variant = Variant.Primary, ...props },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inf-loader',
          `inf-loader--size-${size}`,
          `inf-loader--variant-${variant}`,
          className
        )}
        {...props}
      >
        <svg
          className="inf-loader__circle"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="rotate(-90 20 20)">
            <path
              d="M40 20C40 22.2091 38.2091 24 36 24C33.7909 24 32 22.2091 32 20C32 17.7909 33.7909 16 36 16C38.2091 16 40 17.7909 40 20Z"
              fill="currentColor"
            />
            <path
              opacity="0.4"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.5 20C5.5 11.9919 11.9919 5.5 20 5.5C25.3752 5.5 30.0673 8.42482 32.5716 12.7698C33.4897 12.3336 34.5041 12.0672 35.5742 12.0111C32.6714 6.36349 26.7869 2.5 20 2.5C10.335 2.5 2.5 10.335 2.5 20C2.5 29.665 10.335 37.5 20 37.5C26.7869 37.5 32.6714 33.6365 35.5742 27.9889C34.5041 27.9328 33.4897 27.6663 32.5716 27.2302C30.0673 31.5752 25.3752 34.5 20 34.5C11.9919 34.5 5.5 28.0081 5.5 20ZM34.0732 23.5062C34.6447 23.8209 35.3014 24 36 24C36.3721 24 36.7324 23.9492 37.0742 23.8541C37.3529 22.6141 37.5 21.3242 37.5 20C37.5 18.6758 37.3529 17.3859 37.0742 16.1459C36.7324 16.0508 36.3721 16 36 16C35.3014 16 34.6447 16.1791 34.0732 16.4938C34.352 17.6166 34.5 18.791 34.5 20C34.5 21.209 34.352 22.3834 34.0732 23.5062Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </span>
    )
  }
)

Loader.displayName = 'Loader'

export default Object.assign(Loader, {
  Container: LoaderContainer
})
