import { it, describe } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { ScrollToTopButton } from '../index'
import { screen } from '@testing-library/dom'

describe('ScrollToTopButton', () => {
  it('should match snapshot', () => {
    const { el } = renderComponent(<ScrollToTopButton />)
    expect(el).toMatchSnapshot()
  })

  it('should not be visible with visibilityThreshold > scrollMarginTop', () => {
    renderComponent(
      <ScrollToTopButton visibilityThreshold={500} scrollMarginTop={100} />
    )
    const scrollToTopButton = screen.queryByRole('button') as HTMLElement
    expect(scrollToTopButton).toBeInTheDocument()
    expect(scrollToTopButton).toHaveStyle({
      opacity: 0,
      'pointer-events': 'none'
    })
  })

  it('should be visible with visibilityThreshold < scrollMarginTop', () => {
    renderComponent(
      <ScrollToTopButton visibilityThreshold={0} scrollMarginTop={100} />
    )
    const scrollToTopButton = screen.queryByRole('button') as HTMLElement
    expect(scrollToTopButton).toBeInTheDocument()
    expect(scrollToTopButton).not.toHaveStyle({
      opacity: 0,
      'pointer-events': 'none'
    })
  })
})
