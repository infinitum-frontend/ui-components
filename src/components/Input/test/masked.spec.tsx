import { describe, it, expect, vi } from 'vitest'
import { MaskedInput } from '../index'
import { renderComponent } from '@/testSetup'
import userEvent from '@testing-library/user-event'
import { act, screen } from '@testing-library/react'

describe('masked input', () => {
  describe('base props', () => {
    it('should render', () => {
      const { el } = renderComponent(<MaskedInput mask={{ mask: '0000' }} />)
      expect(el).toBeDefined()
      expect(el).toHaveClass('inf-input-wrapper')

      const input = screen.queryByRole('textbox') as HTMLInputElement

      expect(input).toBeInTheDocument()
      expect(input).toHaveClass('inf-input')
    })

    it('should apply provided mask', async () => {
      const user = userEvent.setup()
      renderComponent(<MaskedInput mask={{ mask: '0000' }} />)

      const input = screen.queryByRole('textbox') as HTMLInputElement
      await user.type(input, 'sadasd1`23xfds!!!')

      expect(input).toHaveValue('123')
    })

    it('should get external value', async () => {
      const { rerender } = renderComponent(
        <MaskedInput mask={{ mask: '0000' }} value="123" />
      )

      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toHaveValue('123')

      rerender(<MaskedInput mask={{ mask: '0000' }} value="2" />)
      expect(input).toHaveValue('2')
    })

    it('should work correctly with display char ', async () => {
      let eventValue
      const user = await userEvent.setup()
      const onAccept = vi.fn((value) => {
        eventValue = value
      })

      renderComponent(
        <MaskedInput
          mask={{ mask: '0000', displayChar: '*' }}
          value="123"
          onAccept={onAccept}
        />
      )

      const input = screen.queryByRole('textbox') as HTMLInputElement
      expect(input).toHaveValue('***')

      await user.type(input, '4')

      expect(input).toHaveValue('****')
      expect(onAccept).toHaveBeenCalledWith(eventValue)
    })

    it('should trigger onAccept and onComplete', async () => {
      const user = userEvent.setup()
      const onAccept = vi.fn()
      const onComplete = vi.fn()
      renderComponent(
        <MaskedInput
          mask={{ mask: '0000' }}
          onAccept={onAccept}
          onComplete={onComplete}
        />
      )

      const input = screen.queryByRole('textbox') as HTMLInputElement

      await user.type(input, '8')

      expect(onAccept).toHaveBeenCalledTimes(1)
      expect(onAccept).toHaveBeenCalledWith('8')
      expect(onComplete).toHaveBeenCalledTimes(0)

      await user.type(input, '333')
      expect(onAccept).toHaveBeenCalledTimes(4)
      expect(onComplete).toHaveBeenCalledTimes(1)
      expect(onComplete).toHaveBeenCalledWith('8333')
    })
  })

  describe('phone mask', () => {
    it('should apply phone mask input', async () => {
      let eventValue
      const user = await userEvent.setup()
      const onAccept = vi.fn((value) => {
        eventValue = value
      })

      renderComponent(<MaskedInput mask="phone" onAccept={onAccept} />)

      const input = screen.queryByRole('textbox') as HTMLInputElement
      await user.type(input, '9')

      expect(eventValue).toBe('79')
      expect(input).toHaveValue('+7(9')
    })

    it('phone mask should parse on paste', async () => {
      let completeValue
      const user = await userEvent.setup()

      const onComplete = vi.fn((value) => {
        completeValue = value
      })

      renderComponent(<MaskedInput mask="phone" onComplete={onComplete} />)

      const input = screen.queryByRole('textbox') as HTMLInputElement

      await act(async () => {
        await input.focus()
      })

      await user.paste('89251234567')

      expect(onComplete).toHaveBeenCalledOnce()
      expect(completeValue).toBe('79251234567')

      await user.clear(input)

      await user.paste('8 (925)- 765-43-21')
      expect(completeValue).toBe('79257654321')

      await user.clear(input)
      await user.paste('+7-925- 765-43-21')
      expect(completeValue).toBe('79257654321')
    })
  })

  describe('phone email mask', () => {
    it('should dispatch email or phone mask based on input', async () => {
      let acceptValue: string = ''
      const user = await userEvent.setup()

      const onAccept = vi.fn((value) => {
        acceptValue = value
      })

      renderComponent(<MaskedInput mask="phoneOrEmail" onAccept={onAccept} />)

      const input = screen.queryByRole('textbox') as HTMLInputElement

      await user.type(input, '911')

      expect(acceptValue).toBe('7911')
      expect(input).toHaveValue('+7(911')

      await user.type(input, 'd')
      expect(input).toHaveValue('911d')
      expect(acceptValue).toBe('911d')

      await user.clear(input)
      await user.type(input, '8hello')

      expect(acceptValue).toBe('8hello')
      expect(input).toHaveValue('8hello')
    })
  })
})
