import { describe, it } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { Badge } from '../index'
import { screen } from '@testing-library/dom'

describe('badge', () => {
  it('should render', () => {
    const { el } = renderComponent(<Badge count={5} />)
    expect(el).toBeInTheDocument()
    expect(screen.queryByText('5')).toBeDefined()
  })

  it('should match snapshot', () => {
    const { el } = renderComponent(<Badge count={5} />)
    expect(el).toMatchSnapshot()
  })

  it('should have position absolute if children exist', () => {
    renderComponent(<Badge count={5}>Уведомления</Badge>)
    expect(screen.queryByTitle('5')).toHaveStyle('position: absolute')
  })

  it('should have position static id children don`t exist', () => {
    renderComponent(<Badge count={5} />)
    expect(screen.queryByTitle('5')).toHaveStyle('position: static')
  })

  it('should support tone', () => {
    renderComponent(<Badge count={5} tone={'secondary'} />)
    expect(screen.queryByTitle('5')).toHaveClass(
      'inf-badge-sup--tone-secondary'
    )
  })

  it('should support dot variant', () => {
    const { el } = renderComponent(<Badge dot={true} count={5} />)
    const sup = el.querySelector('sup') as HTMLElement
    expect(sup.innerHTML).toBeFalsy()
    expect(sup).toHaveStyle('border:radius: 50%')
  })

  it('should not exist if value is zero integer', () => {
    renderComponent(<Badge count={0} />)
    expect(screen.queryByTitle('0')).toBeNull()
  })

  it('should support showZero', () => {
    renderComponent(<Badge count={0} showZero={true} />)
    const el = screen.queryByTitle('0') as HTMLElement
    expect(el).toBeInTheDocument()
    expect(el.innerHTML).toBe('0')
  })

  it('should be in the right-top corner if no offset provided', () => {
    renderComponent(<Badge count={5} />)
    expect(screen.queryByTitle('5')).toHaveStyle({
      top: 0,
      right: 0
    })
  })

  it('should support offset', () => {
    renderComponent(
      <Badge count={5} offset={[10, 10]}>
        Уведомления
      </Badge>
    )
    expect(screen.queryByTitle('5')).toHaveStyle({
      top: '10px',
      right: '-10px'
    })
  })

  it('should support maxCount', () => {
    renderComponent(<Badge count={1000} maxCount={99} />)
    const el = screen.queryByTitle('1000') as HTMLElement
    expect(el.innerHTML).toBe('99+')
  })

  it('should set title if count= is number or string', () => {
    const { rerender } = renderComponent(<Badge count={1000} />)
    expect(screen.queryByTitle('1000')).toHaveAttribute('title', '1000')

    rerender(<Badge count={'123'} />)
    expect(screen.queryByTitle('123')).toHaveAttribute('title', '123')

    rerender(<Badge count={null} />)
    expect(screen.queryByTitle('123')).not.toBeInTheDocument()
  })
})
