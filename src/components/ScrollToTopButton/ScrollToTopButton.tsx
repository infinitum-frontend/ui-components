import { ReactElement } from 'react'
import Button from 'Components/Button/Button'
import { ReactComponent as IconArrowTop } from 'Icons/arrow-top.svg'
import './ScrollToTopButton.scss'
import useWindowScroll from 'Hooks/useWindowScroll'
import cn from 'classnames'

export interface ScrollToTopButtonProps {
  /** проскроленное растояние, после которого отображется кнопка, px */
  visibilityThreshold?: number
  /** отступ от верхнего края при скролле, px */
  scrollMarginTop?: number
}

const ScrollToTopButton = ({
  visibilityThreshold = 200,
  scrollMarginTop = 0
}: ScrollToTopButtonProps): ReactElement => {
  const { y } = useWindowScroll({ throttleDelay: 300 })

  const handeClick = (): void => {
    window.scrollTo({ top: scrollMarginTop, behavior: 'smooth' })
  }

  const classNames = cn('inf-scroll-to-top-button', {
    'inf-scroll-to-top-button--hidden': y < visibilityThreshold
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