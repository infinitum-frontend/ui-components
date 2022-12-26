import { FocusEventHandler, ReactElement, useState } from 'react'
import './index.scss'
import classNames from 'classnames'
import InfInput from '../Input/InfInput'
import { InfSelectProps } from './interface'

const InfSelect = (props: InfSelectProps): ReactElement => {
  const { items, className = '', inputRef } = props
  const [isFocused, setFocused] = useState<boolean>(false)

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    console.log('handleInputFocus', e)
    setFocused(true)
  }

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    console.log('handleInputBlur', e)
    // setFocused(false)
  }

  return (
    <div
      className={classNames(
        'inf-select',
        className
      )}>
      <InfInput className={'inf-select__input'}
                ref={inputRef}
                readOnly={true}
                collapseBottom={isFocused}
                onBlur={handleInputBlur}
                onFocus={handleInputFocus} />
      { isFocused && (
      <ul className={'inf-select__items'}>
        { Boolean(items.length) && items.map(item => (
          <li key={item.value} className={'inf-select__item'}>{item.text}</li>
        ))}
      </ul>
      )}
    </div>
  )
}

InfSelect.displayName = 'InfSelect'

export default InfSelect
