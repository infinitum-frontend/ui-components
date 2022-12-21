import { FocusEventHandler, ReactElement, Ref } from 'react'
import './index.scss'
import classNames from 'classnames'
import InfInput from '../Input/InfInput'
import { InputRefHandler } from '../Input/interface'

export interface InfSelectProps {
  items: Array<Record<string, any>>
  className?: string
  inputRef?: Ref<InputRefHandler>
}

const InfSelect = (props: InfSelectProps): ReactElement => {
  const { items, className = '', inputRef } = props

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = (e) => {
    console.log('handleInputFocus', e)
  }

  return (
    <div
      className={classNames(
        'inf-select',
        className
      )}>
      <InfInput className={'inf-select__input'}
                ref={inputRef}
                onFocus={handleInputFocus} />
      <ul className={'inf-select__items'}>
        { Boolean(items.length) && items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}

InfSelect.displayName = 'InfSelect'

export default InfSelect
