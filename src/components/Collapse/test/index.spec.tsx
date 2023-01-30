import { Collapse } from '../index'
import { describe, it } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { screen, waitFor } from '@testing-library/dom'

describe('Collapse component', () => {
  it('should render', () => {
    const { el } = renderComponent(<Collapse />)
    expect(el).toBeInTheDocument()
  })

  it('should render collapsed by default', async () => {
    const { el } = renderComponent(<Collapse>Контент</Collapse>)

    expect(el).toBeInTheDocument()
    expect(el).toHaveStyle({
      height: 0,
      overflow: 'hidden'
    })
  })

  it('should support collapsed prop', async () => {
    const { el, rerender } = renderComponent(<Collapse>Контент</Collapse>)

    expect(el).toHaveStyle({
      height: 0,
      overflow: 'hidden'
    })

    rerender(<Collapse collapsed={false}>Контент</Collapse>)
    await waitFor(() => {
      expect(el).toHaveStyle({
        height: 'auto'
      })
    })
  })

  it('should support mountOnEnterProp', async () => {
    const { el, rerender } = renderComponent(
      <Collapse mountOnEnter={true}>Контент</Collapse>
    )

    expect(el).not.toBeInTheDocument()

    rerender(
      <Collapse mountOnEnter={true} title={'Content'} collapsed={false}>
        <div>Контент</div>
      </Collapse>
    )

    await waitFor(() => {
      expect(screen.getByTitle('Content')).toHaveStyle({
        height: 'auto'
      })
      expect(screen.getByTitle('Content')).toBeInTheDocument()
    })
  })

  it('should support unmountOnExit', async () => {
    const { rerender } = renderComponent(
      <Collapse unmountOnExit={true} collapsed={false} title={'Content'}>
        Context
      </Collapse>
    )
    expect(screen.getByTitle('Content')).toBeInTheDocument()

    rerender(
      <Collapse unmountOnExit={true} collapsed={true} title={'Context'}>
        Контент
      </Collapse>
    )

    await waitFor(() => {
      expect(screen.queryByTitle('Content')).not.toBeInTheDocument()
      expect(screen.queryByTitle('Content')).toBeNull()
    })
  })

  it('should support custom transitionDuration and transitionFn', async () => {
    const { el, rerender } = renderComponent(
      <Collapse transitionDuration={500} transitionFn={'ease-in'}>
        Text
      </Collapse>
    )

    rerender(
      <Collapse
        collapsed={false}
        title={'Context'}
        transitionDuration={500}
        transitionFn={'ease-in'}
      />
    )

    await waitFor(() => {
      expect(el).toHaveStyle({ transition: 'height ease-in 500ms' })
    })
  })
})
