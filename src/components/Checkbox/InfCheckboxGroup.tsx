import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ReactElement,
  useState,
  cloneElement,
  Children,
  ChangeEvent, useEffect
} from 'react'
import { InfCheckbox } from './index'
import { InfBox } from '../Box'
import { InfCheckboxProps } from './InfCheckbox'

export interface InfCheckboxIndeterminateGroupProps extends ComponentPropsWithoutRef<any> {
  onChange?: (state: boolean[]) => void
}

const getRootProps = (state: boolean[]): { variant: InfCheckboxProps['variant'], checked: boolean } => {
  const hasCheckedItem = Boolean(state.find(item => Boolean(item)))
  const hasUncheckedItem = typeof (state.find(item => !item)) === 'boolean'
  const variant = hasCheckedItem && hasUncheckedItem ? 'indeterminate' : 'primary'
  const checked = variant === 'indeterminate' ? hasCheckedItem && hasUncheckedItem : !hasUncheckedItem
  return {
    variant,
    checked
  }
}

// TODO: доработка стилизации
const InfCheckboxGroup = ({ children, onChange }: InfCheckboxIndeterminateGroupProps): ReactElement => {
  const initialState = Children.map(children, child => {
    return child.props.checked || false
  })

  const [checkedArray, setCheckedArray] = useState<boolean[]>(initialState)

  const rootProps = getRootProps(checkedArray)

  useEffect(() => {
    onChange?.(checkedArray)
  }, [...checkedArray])

  const handleChangeItem = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    setCheckedArray(prevState => {
      prevState[index] = e.target?.checked
      return [...prevState]
    })
  }

  const handleChangeMain: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCheckedArray(prev => [...prev.map(item => e.target.checked)])
  }

  const clonedChildren = Children.map(children, (child, index) => {
    return cloneElement(child, { ...child.props, checked: checkedArray[index] || false, onChange: (e: ChangeEvent<HTMLInputElement>) => handleChangeItem(e, index) })
  })

  return (
    <div>
      <InfCheckbox
        {...rootProps}
        onChange={handleChangeMain}>Основной чекбокс
      </InfCheckbox>
      <InfBox>
        {clonedChildren}
      </InfBox>
    </div>
  )
}

export default InfCheckboxGroup
