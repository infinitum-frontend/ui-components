import { ReactElement } from 'react'
import './index.scss'

// 4.375
const InfLoader = (props: any): ReactElement => {
  return (
    <span className={'inf-loader'}>
      <span className={'inf-loader__circle'} />
      <span className={'inf-loader__dot'}></span>
    </span>
  )
}

export default InfLoader
