import { ReactElement } from 'react'
import Input from 'Components/Input/Input'
import { InputProps } from 'Components/Input/interface'
import { ReactComponent as SearchIcon } from 'Icons/search.svg'

export interface SearchInputProps
  extends Omit<InputProps, 'noBorder' | 'prefix' | 'onClick' | 'type'> {
  onClick?: (value?: string) => void
}

const SearchInput = ({ onClick, ...props }: SearchInputProps): ReactElement => {
  return (
    <Input
      type={'search'}
      prefix={<SearchIcon className={'inf-search-input__icon'} />}
      noBorder={true}
      onPrefixClick={(value) => onClick?.(value)}
      {...props}
    />
  )
}

export default SearchInput
