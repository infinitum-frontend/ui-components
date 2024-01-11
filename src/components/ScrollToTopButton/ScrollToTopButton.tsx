import { ReactElement } from 'react'
import Button from 'Components/Button/Button'
import { ReactComponent as IconArrowTop } from 'Icons/arrow-top.svg'
import './ScrollToTopButton.scss'
import { useWindowScroll } from 'Hooks/useWindowScroll'
import cn from 'classnames'

export interface ScrollToTopButtonProps {
  /** проскроленное растояние, после которого отображется кнопка, px */
  visibilityThreshold?: number
  /** отступ от верхнего края, px */
  offset?: number
}

const ScrollToTopButton = ({
  visibilityThreshold = 200,
  offset = 0
}: ScrollToTopButtonProps): ReactElement => {
  const { y } = useWindowScroll({ throttle: 300 })

  const handeClick = (): void => {
    window.scrollTo({ top: offset, behavior: 'smooth' })
  }

  const classNames = cn('scroll-to-top-button', {
    'scroll-to-top-button--hidden': y < visibilityThreshold
  })

  return (
    <Button
      variant="ghost"
      onClick={handeClick}
      icon={<IconArrowTop />}
      className={classNames}
    />
  )
}

export default ScrollToTopButton
