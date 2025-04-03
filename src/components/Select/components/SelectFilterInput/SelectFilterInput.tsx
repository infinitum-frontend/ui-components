import SearchIcon from 'Icons/search.svg?react'
import { forwardRef, ReactElement } from 'react'
import { Icon } from '~/src/components/Icon'
import { Input, InputProps } from '~/src/components/Input'
import './SelectFilterInput.scss'

export interface SelectFilterInputProps extends InputProps {}

/** Поле ввода для фильтрации опций */
const SelectFilterInput = forwardRef<HTMLInputElement, SelectFilterInputProps>(
  ({ ...props }, ref): ReactElement => {
    return (
      <div className="select-filter-input-wrapper">
        <Input
          type="search"
          prefix={
            <Icon size="medium" color="primary">
              <SearchIcon />
            </Icon>
          }
          ref={ref}
          size="small"
          placeholder="Найти"
          autoComplete="off"
          disableFormContextValidation
          {...props}
        />
      </div>
    )
  }
)

SelectFilterInput.displayName = 'SelectFilterInput'

export default SelectFilterInput
