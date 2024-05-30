import { it, describe } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { Breadcrumbs } from '../index'
import { screen } from '@testing-library/dom'
import { BreadcrumbsBaseItems, BreadcrumbsLongItems } from '../fixtures'
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

describe('Breadcrumbs', () => {
  it('should match snapshot', () => {
    const { el } = renderComponent(
      <Breadcrumbs items={BreadcrumbsBaseItems} maxVisibleCount={3} />
    )
    expect(el).toMatchSnapshot()
  })

  it('should have success render if the number of items is less than maxVisibleCount', () => {
    const { el } = renderComponent(
      <Breadcrumbs items={BreadcrumbsBaseItems} maxVisibleCount={10} />
    )
    expect(el).toMatchSnapshot('should match snapshot')
  })

  it('should isolate the interaction with last item', () => {
    renderComponent(
      <Breadcrumbs items={BreadcrumbsBaseItems} maxVisibleCount={3} />
    )
    const lastItem = screen.queryByText(
      BreadcrumbsBaseItems[BreadcrumbsBaseItems.length - 1].title
    ) as HTMLElement
    expect(lastItem).toBeInTheDocument()

    expect(lastItem).toHaveStyle('pointer-events: none')
  })
})

describe('Breadcrumbs Basic', () => {
  it('should match snapshot', () => {
    const { el } = renderComponent(
      <Breadcrumbs>
        <Breadcrumbs.Item as="a" href="https://specdep.ru/">
          Главная
        </Breadcrumbs.Item>
        <Breadcrumbs.Item as="a" href="https://specdep.ru/" target="_blank">
          Павел Прасс
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Хальмеев Александр</Breadcrumbs.Item>
      </Breadcrumbs>
    )
    expect(el).toMatchSnapshot()
  })
})

describe('Breadcrumbs With Dropdown', () => {
  it('should match snapshot', () => {
    const { el } = renderComponent(
      <Breadcrumbs items={BreadcrumbsLongItems} maxVisibleCount={3} />
    )
    expect(el).toMatchSnapshot()
  })

  it('should render button and open a dropdown menu', async () => {
    renderComponent(
      <Breadcrumbs items={BreadcrumbsLongItems} maxVisibleCount={3} />
    )
    const button = screen.queryByText('...') as HTMLElement
    expect(button).toBeInTheDocument()

    await user.click(button)

    const menu = screen.queryByRole('menu')
    expect(menu).toBeInTheDocument()
  })

  it('should isolate the interaction with last item', () => {
    renderComponent(
      <Breadcrumbs items={BreadcrumbsLongItems} maxVisibleCount={3} />
    )
    const lastItem = screen.queryByText(
      BreadcrumbsLongItems[BreadcrumbsLongItems.length - 1].title
    ) as HTMLElement
    expect(lastItem).toBeInTheDocument()

    expect(lastItem).toHaveStyle('pointer-events: none')
  })
})

describe('Breadcrumbs Dropdown Menu', () => {
  it('should match snapshot', async () => {
    renderComponent(
      <Breadcrumbs items={BreadcrumbsLongItems} maxVisibleCount={3} />
    )
    const button = screen.queryByText('...') as HTMLElement
    expect(button).toBeInTheDocument()

    await user.click(button)

    const menu = screen.queryByRole('menu')

    expect(menu).toMatchSnapshot('dropdown')
  })
})
