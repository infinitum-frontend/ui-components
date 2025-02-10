import { ReactElement } from 'react'
import { Text } from '~/src/components/Text'
import { ReactComponent as CrossIcon } from 'Icons/cross.svg'
import './SelectCounter.scss'

interface SelectCounterProps {
  count: number
  onClear?: () => void
}

const SelectCounter = ({
  count,
  onClear
}: SelectCounterProps): ReactElement => {
  return (
    <Text color="inverse" className="inf-select-counter">
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
