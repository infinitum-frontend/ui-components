import { it, describe, vi, beforeEach } from 'vitest'
import { renderComponent } from '../../../../testSetup'
import { Autocomplete } from '../index'
import { screen, waitFor } from '@testing-library/dom'
import { AutocompleteBaseOptions } from '../fixture'
import userEvent from '@testing-library/user-event'
import AutocompleteContext, { IAutocompleteContext } from '../context'
import { createRef } from 'react'

const user = userEvent.setup()
const buttonPlaceholder = 'Кнопка'
const inputPlaceholder = 'Введите значение'
const getContext = (): IAutocompleteContext => {
  return {
    handleButtonClick: vi.fn(),
    handleInputSubmit: vi.fn(),
    handleOptionClick: vi.fn(),
    x: 100,
    y: 100,
    open: true,
    buttonRef: createRef() as any,
    dropdownRef: createRef() as any,
    getFloatingProps: () => {
      return {
        name: 'floating'
      }
    },
    getReferenceProps: () => {
      return {
        name: 'reference'
      }
    }
  }
}

describe('Autocomplete', () => {
  it('should match snapshot', () => {
    const { el } = renderComponent(
      <Autocomplete
        options={AutocompleteBaseOptions}
        buttonPlaceholder={buttonPlaceholder}
      />
    )
    expect(el).toMatchSnapshot()
  })

  it('should not render children if options are passed', () => {
    renderComponent(
      <Autocomplete options={AutocompleteBaseOptions}>Test</Autocomplete>
    )
    expect(screen.queryByText('Test')).not.toBeInTheDocument()
  })

  it('should render children if options aren`t passed', () => {
    renderComponent(<Autocomplete>Test</Autocomplete>)
    expect(screen.queryByText('Test')).toBeInTheDocument()
  })

  it('should support opened', async () => {
    const { rerender } = renderComponent(
      <Autocomplete options={AutocompleteBaseOptions} opened={false} />
    )
    expect(
      screen.queryByPlaceholderText(inputPlaceholder)
    ).not.toBeInTheDocument()

    rerender(<Autocomplete options={AutocompleteBaseOptions} opened={true} />)

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText(inputPlaceholder)
      ).toBeInTheDocument()
    })
  })

  it('should support onOpenChange', async () => {
    const onOpenChange = vi.fn()
    renderComponent(
      <Autocomplete
        options={AutocompleteBaseOptions}
        buttonPlaceholder={buttonPlaceholder}
        onOpenChange={onOpenChange}
      />
    )

    await user.click(screen.getByText(buttonPlaceholder))
    expect(onOpenChange).toBeCalledWith(true)
    expect(onOpenChange).toBeCalledTimes(1)
  })
})

describe('Autocomplete options', () => {
  it('should call onChange on input submit', async () => {
    const onChange = vi.fn()
    renderComponent(
      <Autocomplete
        options={AutocompleteBaseOptions}
        onChange={onChange}
        inputPlaceholder={inputPlaceholder}
        buttonPlaceholder={buttonPlaceholder}
      />
    )

    await user.click(screen.queryByText(buttonPlaceholder) as HTMLElement)

    await user.click(
      screen.queryByPlaceholderText(inputPlaceholder) as HTMLInputElement
    )
    await user.keyboard('{Enter}')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(0)
  })
  it('should render plain button that open a dropdown', async () => {
    renderComponent(
      <Autocomplete
        options={AutocompleteBaseOptions}
        buttonPlaceholder={buttonPlaceholder}
      />
    )
    const button = screen.queryByText(buttonPlaceholder) as HTMLElement
    expect(button).toBeInTheDocument()

    await user.click(button)

    const input = screen.queryByPlaceholderText(inputPlaceholder)
    const option = screen.queryByText(AutocompleteBaseOptions[0].label)
    expect(input).toBeInTheDocument()
    expect(option).toBeInTheDocument()
  })

  it('should filter options on Input', async () => {
    renderComponent(
      <Autocomplete
        options={AutocompleteBaseOptions}
        buttonPlaceholder={buttonPlaceholder}
      />
    )

    const button = screen.queryByText(buttonPlaceholder) as HTMLElement
    await user.click(button)

    const input = screen.queryByPlaceholderText(
      'Введите значение'
    ) as HTMLInputElement
    await user.type(input, 'Консалтинг')

    expect(
      screen.queryByText(AutocompleteBaseOptions[0].label)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(AutocompleteBaseOptions[1].label)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(AutocompleteBaseOptions[2].label)
    ).toBeInTheDocument()
  })

  it('should support filterFn', async () => {
    renderComponent(
      <Autocomplete
        options={AutocompleteBaseOptions}
        buttonPlaceholder={buttonPlaceholder}
        filterFn={(option) => option.label.startsWith('К')}
      />
    )

    const button = screen.queryByText(buttonPlaceholder) as HTMLElement
    await user.click(button)

    const input = screen.queryByPlaceholderText(
      inputPlaceholder
    ) as HTMLInputElement
    await user.type(input, 'Тест')

    expect(
      screen.queryByText(AutocompleteBaseOptions[0].label)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(AutocompleteBaseOptions[1].label)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText(AutocompleteBaseOptions[2].label)
    ).toBeInTheDocument()
  })

  it('should support selectedValue', () => {
    renderComponent(
      <Autocomplete
        options={AutocompleteBaseOptions}
        buttonPlaceholder={buttonPlaceholder}
        selectedValue={1}
      />
    )
    const button = screen.queryByText(AutocompleteBaseOptions[1].label)

    expect(button).toBeInTheDocument()
  })

  it('should support inputPlaceholder', async () => {
    renderComponent(
      <Autocomplete
        options={AutocompleteBaseOptions}
        buttonPlaceholder={buttonPlaceholder}
        inputPlaceholder={'Тест'}
      />
    )

    const button = screen.queryByText(buttonPlaceholder) as HTMLElement
    await user.click(button)

    expect(screen.queryByPlaceholderText('Тест')).toBeInTheDocument()
  })

  it('should trigger onChange on item click', async () => {
    const onChange = vi.fn()
    renderComponent(
      <Autocomplete
        options={AutocompleteBaseOptions}
        buttonPlaceholder={buttonPlaceholder}
        onChange={onChange}
      />
    )

    const button = screen.queryByText(buttonPlaceholder) as HTMLElement
    await user.click(button)

    const option = screen.queryByText(
      AutocompleteBaseOptions[1].label
    ) as HTMLElement
    await user.click(option)

    expect(onChange).toBeCalledWith(1)
    expect(onChange).toBeCalledTimes(1)
  })
})

describe('AutocompleteButton', () => {
  let context = getContext()
  beforeEach(() => {
    context = getContext()
  })
  it('should match snapshot', () => {
    renderComponent(
      <Autocomplete.Button placeholder={buttonPlaceholder} title={'title'} />
    )
    expect(screen.queryByText(buttonPlaceholder)).toMatchSnapshot('button')
  })

  it('should render placeholder if no children provided', () => {
    renderComponent(<Autocomplete.Button placeholder={buttonPlaceholder} />)
    expect(screen.queryByText(buttonPlaceholder)).toBeInTheDocument()
  })

  it('should render children if provided', () => {
    renderComponent(
      <Autocomplete.Button placeholder={buttonPlaceholder}>
        Test
      </Autocomplete.Button>
    )
    expect(screen.queryByText(buttonPlaceholder)).not.toBeInTheDocument()
    expect(screen.queryByText('Test')).toBeInTheDocument()
  })

  it('should support context', async () => {
    renderComponent(
      <AutocompleteContext.Provider value={context}>
        <Autocomplete.Button placeholder={buttonPlaceholder} />
      </AutocompleteContext.Provider>
    )

    const button = screen.queryByText(buttonPlaceholder) as HTMLElement
    expect(button).toHaveAttribute('name', context.getReferenceProps().name)
    expect(button).toHaveClass('inf-select-button--selected')
    expect((context.buttonRef?.current as HTMLButtonElement).tagName).toBe(
      'BUTTON'
    )

    await user.click(button)
    expect(context.handleButtonClick).toBeCalledTimes(1)
  })
})

describe('Autocomplete Dropdown', () => {
  let context = getContext()
  beforeEach(() => {
    context = getContext()
  })
  it('should match snapshot', () => {
    renderComponent(
      <AutocompleteContext.Provider value={context}>
        <Autocomplete.Dropdown title={'title'}>Dropdown</Autocomplete.Dropdown>
      </AutocompleteContext.Provider>
    )
    expect(screen.queryByText('Dropdown')).toMatchSnapshot('dropdown')
  })

  it('should not be visible without context', () => {
    renderComponent(<Autocomplete.Dropdown>Dropdown</Autocomplete.Dropdown>)

    const dropdown = screen.queryByText('Dropdown')
    expect(dropdown).not.toBeInTheDocument()
  })

  it('should support context', async () => {
    renderComponent(
      <AutocompleteContext.Provider value={context}>
        <Autocomplete.Dropdown>Dropdown</Autocomplete.Dropdown>
      </AutocompleteContext.Provider>
    )

    const dropdown = screen.queryByText('Dropdown') as HTMLElement
    expect(dropdown).toHaveAttribute('name', context.getFloatingProps().name)
    expect((context.dropdownRef?.current as HTMLDivElement).tagName).toBe('DIV')
    expect(dropdown).toHaveStyle({
      left: `${context.x as number}px`,
      top: `${context.y as number}px`
    })
  })

  it('support className', () => {
    renderComponent(
      <AutocompleteContext.Provider value={context}>
        <Autocomplete.Dropdown className={'customClass'}>
          Dropdown
        </Autocomplete.Dropdown>
      </AutocompleteContext.Provider>
    )
    expect(screen.queryByText('Dropdown')).toHaveClass('customClass')
  })

  it('support style', () => {
    renderComponent(
      <AutocompleteContext.Provider value={context}>
        <Autocomplete.Dropdown style={{ color: 'red' }}>
          Dropdown
        </Autocomplete.Dropdown>
      </AutocompleteContext.Provider>
    )
    expect(screen.queryByText('Dropdown')).toHaveStyle('color: red;')
  })
})

describe('Autocomplete Input', () => {
  let context: IAutocompleteContext = getContext()
  beforeEach(() => {
    context = getContext()
  })

  it('should match snapshot', () => {
    renderComponent(<Autocomplete.Input title={'input'} />)

    expect(screen.queryByTitle('input')).toBeInTheDocument()
  })

  it('should support submit', async () => {
    const onSubmit = vi.fn()
    renderComponent(<Autocomplete.Input title={'input'} onSubmit={onSubmit} />)

    await user.click(screen.queryByTitle('input') as HTMLInputElement)
    await user.keyboard('{Enter}')

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should support ref', () => {
    const ref = createRef()
    renderComponent(<Autocomplete.Input ref={ref} title={'input'} />)
    expect(ref?.current).toBeInTheDocument()
  })

  it('should support context', async () => {
    renderComponent(
      <AutocompleteContext.Provider value={context}>
        <Autocomplete.Input title={'input'} />
      </AutocompleteContext.Provider>
    )

    await user.click(screen.queryByTitle('input') as HTMLInputElement)
    await user.keyboard('{Enter}')

    expect(context.handleInputSubmit).toHaveBeenCalledTimes(1)
  })
})

describe('Autocomplete Option', () => {
  let context: IAutocompleteContext = getContext()
  beforeEach(() => {
    context = getContext()
  })
  it('should match snapshot', () => {
    renderComponent(
      <Autocomplete.Option title={'option'}>Option</Autocomplete.Option>
    )

    expect(screen.queryByTitle('option')).toMatchSnapshot()
  })

  it('should support context', async () => {
    renderComponent(
      <AutocompleteContext.Provider value={context}>
        <Autocomplete.Option title={'option'} value={1}>
          Option
        </Autocomplete.Option>
      </AutocompleteContext.Provider>
    )

    await user.click(screen.queryByTitle('option') as HTMLElement)
    expect(context.handleOptionClick).toHaveBeenCalledTimes(1)
    expect(context.handleOptionClick).toHaveBeenCalledWith(1)
  })

  it('should support onClick prop', async () => {
    const onClick = vi.fn()
    renderComponent(
      <AutocompleteContext.Provider value={context}>
        <Autocomplete.Option title={'option'} value={1} onClick={onClick}>
          Option
        </Autocomplete.Option>
      </AutocompleteContext.Provider>
    )

    await user.click(screen.queryByTitle('option') as HTMLElement)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(context.handleOptionClick).not.toHaveBeenCalled()
  })
})
