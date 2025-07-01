import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import DateRangePicker from '../DateRangePicker'

vi.mock('Components/DateRangeCalendar/DateRangeCalendar', () => ({
  default: vi.fn(({ onChange, ...props }) => (
    <div data-testid="date-range-calendar" {...props}>
      <button
        data-testid="calendar-change-button"
        onClick={() => {
          onChange([new Date('2024-01-01'), new Date('2024-01-15')])
          // Эмуляция закрытия календаря
          const portal = document.querySelector(
            '[data-testid="floating-portal"]'
          )
          if (portal) {
            portal.innerHTML = ''
          }
        }}
      >
        Select Range
      </button>
    </div>
  ))
}))

vi.mock('Components/Input/components/MaskedInput', () => ({
  default: vi.fn(
    ({
      postfix,
      onPostfixClick,
      onFocus,
      size,
      required,
      disabled,
      ...props
    }) => (
      <div
        data-testid="masked-input"
        size={size}
        required={required}
        disabled={disabled}
        {...props}
      >
        <input
          data-testid="masked-input-field"
          size={size}
          required={required}
          disabled={disabled}
          {...props}
        />
        <div
          data-testid="masked-input-postfix"
          onClick={disabled ? undefined : onPostfixClick}
        >
          {postfix}
        </div>
      </div>
    )
  )
}))

vi.mock(
  'Components/DatePicker/components/NaviteDatePicker/NativeDatePicker',
  () => ({
    default: vi.fn((props) => (
      <input data-testid="native-date-picker" {...props} />
    ))
  })
)

vi.mock('@floating-ui/react', () => ({
  useFloating: vi.fn(() => ({
    x: 0,
    y: 0,
    refs: {
      setReference: vi.fn(),
      setFloating: vi.fn()
    },
    context: {}
  })),
  useInteractions: vi.fn(() => ({
    getReferenceProps: vi.fn(() => ({})),
    getFloatingProps: vi.fn(() => ({}))
  })),
  useDismiss: vi.fn(),
  FloatingPortal: vi.fn(({ children }) => (
    <div data-testid="floating-portal">{children}</div>
  )),
  FloatingFocusManager: vi.fn(({ children }) => (
    <div data-testid="floating-focus-manager">{children}</div>
  )),
  flip: vi.fn(),
  offset: vi.fn()
}))

vi.mock('Components/Form/context/group', () => ({
  default: {
    Provider: ({ children }: { children: React.ReactNode }) => children
  }
}))

describe('DateRangePicker', () => {
  const defaultProps = {
    value: ['', ''] as [string, string],
    onChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render with default props', () => {
      render(<DateRangePicker {...defaultProps} />)
      expect(screen.getByTestId('masked-input')).toBeInTheDocument()
      expect(screen.getByTestId('masked-input-field')).toBeInTheDocument()
      expect(screen.getByTestId('masked-input-postfix')).toBeInTheDocument()
    })
    it('should render compopnent when has value', () => {
      const value: [string, string] = ['2024-01-01', '2024-01-15']
      render(<DateRangePicker {...defaultProps} value={value} />)
      expect(screen.getByTestId('masked-input')).toBeInTheDocument()
    })
    it('should display the correct value in the input', () => {
      const value: [string, string] = ['2024-01-01', '2024-01-15']
      render(<DateRangePicker {...defaultProps} value={value} />)
      expect(screen.getByTestId('masked-input-field')).toHaveValue(
        '01.01.2024—15.01.2024'
      )
    })
    it('should render component with clearable button when has value', () => {
      const value: [string, string] = ['2024-01-01', '2024-01-15']
      render(<DateRangePicker {...defaultProps} value={value} clearable />)
      expect(screen.getByTestId('masked-input')).toBeInTheDocument()
    })
    it('should render clearable button when clearable and value are set', () => {
      const value: [string, string] = ['2024-01-01', '2024-01-15']
      render(<DateRangePicker {...defaultProps} value={value} clearable />)
      expect(screen.getByTitle('Очистить значение')).toBeInTheDocument()
    })
  })

  describe('props', () => {
    it('should pass placeholder to masked input', () => {
      render(<DateRangePicker {...defaultProps} />)
      const maskedInput = screen.getByTestId('masked-input')
      expect(maskedInput).toHaveAttribute(
        'placeholder',
        '__.__.____—__.__.____'
      )
    })
    it('should pass pattern to masked input', () => {
      render(<DateRangePicker {...defaultProps} />)
      const maskedInput = screen.getByTestId('masked-input')
      expect(maskedInput).toHaveAttribute(
        'pattern',
        '[0-9]{2}.[0-9]{2}.[0-9]{4}—[0-9]{2}.[0-9]{2}.[0-9]{4}'
      )
    })
  })

  describe('calendar interaction', () => {
    it('should open calendar when postfix is clicked', async () => {
      const user = userEvent.setup()
      render(<DateRangePicker {...defaultProps} />)
      const postfix = screen.getByTestId('masked-input-postfix')
      await user.click(postfix)
      expect(screen.getByTestId('floating-portal')).toBeInTheDocument()
      expect(screen.getByTestId('date-range-calendar')).toBeInTheDocument()
    })
  })

  describe('min and max constraints', () => {
    it('should pass min and max to native date pickers', () => {
      const min = '2024-01-01'
      const max = '2024-12-31'
      render(<DateRangePicker {...defaultProps} min={min} max={max} />)
      const nativePickers = screen.getAllByTestId('native-date-picker')
      expect(nativePickers[0]).toHaveAttribute('min', min)
      expect(nativePickers[1]).toHaveAttribute('max', max)
    })
  })

  describe('required prop', () => {
    it('should pass required to native date pickers', () => {
      render(<DateRangePicker {...defaultProps} required />)
      const nativePickers = screen.getAllByTestId('native-date-picker')
      nativePickers.forEach((picker) => {
        expect(picker).toHaveAttribute('required')
      })
    })
  })
})
