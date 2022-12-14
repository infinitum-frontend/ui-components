import * as React from 'react'
import { ForwardedRef } from 'react'

const UiInput = React.forwardRef((props, ref: ForwardedRef<HTMLInputElement>) => {
  return <input ref={ref} {...props} />
})

UiInput.displayName = 'UiInput'

export default UiInput
