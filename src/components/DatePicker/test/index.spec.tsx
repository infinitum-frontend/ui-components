import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { DatePicker } from '../index'

describe('Clear', () => {
  // TODO: не работает
  // it('should display clear button on hover', async () => {
  //   const user = userEvent.setup()
  //   const { el } = renderComponent(<DatePicker clearable value="2020-04-20" />)

  //   const clearButton = screen.queryByTitle('Очистить значение')
  //   expect(clearButton).not.toBeVisible()

  //   await user.hover(el)

  //   const clearButtonAfterHover = screen.queryByTitle('Очистить значение')
  //   expect(clearButtonAfterHover).toBeVisible()
  // })

  it('should not have clear button in DOM when value is empty', async () => {
    const { el } = renderComponent(<DatePicker clearable />)

    const user = userEvent.setup()
    await user.hover(el)

    const clearButton = screen.queryByTitle('Очистить значение')
    expect(clearButton).toBeNull()
  })

  it('should not have clear button in DOM when clearable prop is not provided', async () => {
    const { el } = renderComponent(<DatePicker value="2020-04-20" />)

    const user = userEvent.setup()
    await user.hover(el)

    const clearButton = screen.queryByTitle('Очистить значение')
    expect(clearButton).toBeNull()
  })
})
