import { describe, it } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { Badge } from '../index'
import { screen } from '@testing-library/dom'

describe('badge', () => {
  it('should render', () => {
    const { el } = renderComponent(<Badge badgeContent={5} />)
    expect(el).toBeInTheDocument()
    expect(screen.getByText('5')).toBeDefined()
  })

  it('should match snapshot', () => {
    const { el } = renderComponent(<Badge badgeContent={5} />)
    expect(el).toMatchSnapshot()
  })

  it('should have position absolute if children exist', () => {
    renderComponent(<Badge badgeContent={5}>Уведомления</Badge>)
    expect(screen.getByTitle('5')).toHaveStyle('position: absolute')
  })

  it('should have position static id children don`t exist', () => {
    renderComponent(<Badge badgeContent={5} />)
    expect(screen.getByTitle('5')).toHaveStyle('position: static')
  })

  it('should support tone', () => {
    renderComponent(<Badge badgeContent={5} tone={'secondary'} />)
    expect(screen.getByTitle('5')).toHaveClass('inf-badge-sup--tone-secondary')
  })

  it('should support dot variant', () => {
    const { el } = renderComponent(<Badge dot={true} badgeContent={5} />)
    const sup = el.querySelector('sup') as HTMLElement
    expect(sup.innerHTML).toBeFalsy()
    expect(sup).toHaveStyle('border:radius: 50%')
  })

  it('should not exist if value is zero integer', () => {
    renderComponent(<Badge badgeContent={0} />)
    expect(screen.queryByTitle('0')).toBeNull()
  })

  it('should support showZero', () => {
    renderComponent(<Badge badgeContent={0} showZero={true} />)
    const el = screen.getByTitle('0')
    expect(el).toBeInTheDocument()
    expect(el.innerHTML).toBe('0')
  })

  it('should support offset', () => {
    renderComponent(
      <Badge badgeContent={5} offset={[10, 10]}>
        Уведомления
      </Badge>
    )
    expect(screen.getByTitle('5')).toHaveStyle({
      top: '10px',
      right: '-10px'
    })
  })
})
