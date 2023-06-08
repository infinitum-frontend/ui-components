// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement } from 'react'
import Input from 'Components/Input/Input'
import { InputProps } from 'Components/Input/types'
import { ReactComponent as SearchIcon } from 'Icons/search.svg'

export interface SearchInputProps
  extends Omit<InputProps, 'noBorder' | 'prefix' | 'onClick' | 'type'> {
  onClick?: (value?: string) => void
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onClick, ...props }, ref): ReactElement => {
    return (
      <Input
        type={'search'}
        prefix={<SearchIcon className={'inf-search-input__icon'} />}
        noBorder={true}
        onPrefixClick={(value) => onClick?.(value)}
        ref={ref}
        {...props}
      />
    )
  }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
