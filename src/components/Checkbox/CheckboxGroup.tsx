import {
  ComponentPropsWithoutRef,
  ReactElement,
  cloneElement,
  Children,
  ChangeEvent
} from 'react'
import { Checkbox } from './index'
import classNames from 'classnames'
import './group.scss'
import { CheckboxProps } from './Checkbox'

export interface CheckboxIndeterminateGroupProps extends ComponentPropsWithoutRef<any> {
  onChange?: (value: Array<string | number>, e: ChangeEvent) => void
  /** Массив выбранных значений */
  checkedList?: Array<string | number>
  direction?: 'vertical'
  // indeterminate?: boolean
}

// TODO: наработки для группы с неопределенным чекбоксом. Пока не убирать
// const getRootProps = (state: boolean[]): { variant: CheckboxProps['variant'], checked: boolean } => {
//   const hasCheckedItem = Boolean(state.find(item => Boolean(item)))
//   const hasUncheckedItem = typeof (state.find(item => !item)) === 'boolean'
//   const variant = hasCheckedItem && hasUncheckedItem ? 'indeterminate' : 'primary'
//   const checked = variant === 'indeterminate' ? hasCheckedItem && hasUncheckedItem : !hasUncheckedItem
//   return {
//     variant,
//     checked
//   }
// }

/** Компонент для работы с группой Чекбоксов. Для работы необходимо каждому чекбоксу прописать уникальный value */
const CheckboxGroup = ({
  children,
  onChange,
  direction = 'vertical',
  checkedList = []
}: CheckboxIndeterminateGroupProps): ReactElement => {
  const handleChangeItem = (val: string | number, e: ChangeEvent<HTMLInputElement>): void => {
    const isActive = checkedList?.includes(val)

    if (isActive) {
      onChange?.(checkedList?.filter(item => item !== val), e)
    } else {
      onChange?.([...checkedList, val], e)
    }
  }

  const clonedChildren = Children.map(children, (child) => {
    const childValue = child.props.value

    return cloneElement(child, {
      ...child.props,
      checked: Boolean(checkedList.find(item => item === childValue)),
      onChange: (e: ChangeEvent<HTMLInputElement>) => handleChangeItem(childValue, e)
    })
  })

  return (
    <div className={classNames('inf-checkbox-group__items', `inf-checkbox-group__items--direction-${direction}`)}>{clonedChildren}</div>
  )
}

const CheckboxButton = ({ children, ...props }: CheckboxProps): ReactElement => <Checkbox {...props}>{children}</Checkbox>

if (process.env.NODE_ENV !== 'production') {
  CheckboxButton.displayName = 'CheckboxGroup.Checkbox'
}

CheckboxGroup.Checkbox = CheckboxButton

export default CheckboxGroup
