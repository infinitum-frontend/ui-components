import { describe, it, expect, vi } from 'vitest'
import { MaskedInput } from '../index'
import { renderComponent } from '@/testSetup'
import userEvent from '@testing-library/user-event'
import { act } from '@testing-library/react'

describe('masked input', () => {
  it('should render', () => {
    const { el } = renderComponent(<MaskedInput mask={{ mask: '0000' }} />)
    expect(el).toBeDefined()
    expect(el.className).toContain('inf-input')
  })

  it('should apply provided mask', async () => {
    const { el } = renderComponent(<MaskedInput mask={{ mask: '0000' }} />)
    const user = userEvent.setup()

    await act(async () => {
      el.focus()
      await user.keyboard('sadasd1`23xfds!!!')
    })

    expect(el).toHaveValue('123')
  })

  it('should get external value', async () => {
    const { el, rerender } = renderComponent(
      <MaskedInput mask={{ mask: '0000' }} value="123" />
    )
    expect(el).toHaveValue('123')

    rerender(<MaskedInput mask={{ mask: '0000' }} value="2" />)
    expect(el).toHaveValue('2')
  })

  it('should work correctly with display char ', async () => {
    const { el } = renderComponent(
      <MaskedInput mask={{ mask: '0000', displayChar: '*' }} value="123" />
    )
    expect(el).toHaveValue('***')
  })

  it('should trigger onAccept and onComplete', async () => {
    const user = userEvent.setup()
    const onAccept = vi.fn()
    const onComplete = vi.fn()
    const { el } = renderComponent(
      <MaskedInput
        mask={{ mask: '0000' }}
        onAccept={onAccept}
        onComplete={onComplete}
      />
    )

    await act(() => el.focus())

    await user.type(el, '8')

    // тк маска вызывается дваджды при рендере
    expect(onAccept).toHaveBeenCalledTimes(2)
    expect(onAccept).toHaveBeenCalledWith('8')
    expect(onComplete).toHaveBeenCalledTimes(0)

    await user.type(el, '333')
    expect(onAccept).toHaveBeenCalledTimes(5)
    expect(onComplete).toHaveBeenCalledTimes(1)
    expect(onComplete).toHaveBeenCalledWith('8333')
  })
})

describe('phone mask', () => {
  it('should dispatch mask', async () => {
    const user = userEvent.setup()
    const { el } = renderComponent(<MaskedInput mask="phone" />)
    act(() => {
      el.focus()
    })

    await user.type(el, '9')
    expect(el).toHaveValue('+7(9')

    await user.clear(el)
    await user.type(el, '8')
    expect(el).toHaveValue('8')
  })
})

describe('phone email mask', () => {
  it('should dispatch mask', async () => {
    const user = userEvent.setup()
    const { el } = renderComponent(<MaskedInput mask="phoneOrEmail" />)
    act(() => {
      el.focus()
    })

    await user.type(el, '9')
    expect(el).toHaveValue('+7(9')

    await user.clear(el)
    await user.type(el, '8')
    expect(el).toHaveValue('8')

    await user.clear(el)
    await user.type(el, '442433m')
    expect(el).toHaveValue('442433m')
  })
})
