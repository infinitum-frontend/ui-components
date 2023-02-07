import { ComponentPropsWithoutRef, ReactElement, useId } from 'react'
import FormContext from 'Components/Form/context'
import cn from 'classnames'
import '../style/group.scss'
import Space from 'Components/Space/Space'

export interface GroupProps extends ComponentPropsWithoutRef<'div'> {
  direction?: 'vertical' | 'horizontal'
}

const Group = ({
  direction = 'vertical',
  children,
  className,
  ...props
}: GroupProps): ReactElement => {
  const context = {
    id: `field-${useId()}`
  }

  return (
    <FormContext.Provider value={context}>
      <Space
        className={cn(className, 'inf-form-group')}
        {...props}
        direction={direction}
      >
        {children}
      </Space>
    </FormContext.Provider>
  )
}

export default Group
