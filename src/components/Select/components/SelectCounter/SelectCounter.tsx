import { ReactElement } from 'react'
import { Text } from '~/src/components/Text'
import CrossIcon from 'Icons/cross.svg?react'
import './SelectCounter.scss'
import { SelectProps } from '../../utils/types'
import cn from 'classnames'

interface SelectCounterProps {
  count: number
  onClear?: () => void
  size?: SelectProps['size']
}

const SelectCounter = ({
  count,
  onClear,
  size
}: SelectCounterProps): ReactElement => {
  return (
    <Text
      color="inverse"
      className={cn(
        'inf-select-counter',
        `inf-select-counter--size-${size as string}`
      )}
    >
      {count}
      {onClear && (
        <CrossIcon
          className="inf-select-counter__remove-icon"
          onClick={(e) => {
            e.stopPropagation()
            onClear()
          }}
        />
      )}
    </Text>
  )
}

export default SelectCounter
