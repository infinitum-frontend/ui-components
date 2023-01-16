import { ComponentProps, ReactElement } from 'react'
import './index.scss'
import classNames from 'classnames'

export interface LoaderProps extends ComponentProps<'span'> {
  /** Размер */
  size?: 'compact' | 'regular' | 'large'
}

// TODO: нужно заменить иконку в дизайне. там полный круг в макетах с лоадером, а нужен частичный, как у иконки bx-loader-alt
const Loader = ({
  size = 'regular',
  className,
  ...props
}: LoaderProps): ReactElement => {
  return (
    <span
      className={classNames(
        'inf-loader',
        `inf-loader--size-${size}`,
        className
      )}
      {...props}
    >
      <svg
        className={'inf-loader__circle'}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M10.0003 18.3334C14.5178 18.3334 18.3337 14.5176 18.3337 10.0001H16.667C16.667 13.6143 13.6145 16.6668 10.0003 16.6668C6.38616 16.6668 3.33366 13.6143 3.33366 10.0001C3.33366 6.38675 6.38616 3.33342 10.0003 3.33342V1.66675C5.48283 1.66675 1.66699 5.48342 1.66699 10.0001C1.66699 14.5176 5.48283 18.3334 10.0003 18.3334Z"
          fill="currentColor"
        />
      </svg>
      <span className={'inf-loader__dot'} />
    </span>
  )
}

export default Loader
