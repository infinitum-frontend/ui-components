import { ReactElement } from 'react'
import ChevronRightIcon from 'Icons/chevronRight.svg?react'
import './BreadcrumbsSeparator.scss'

const BreadcrumbsSeparator = (): ReactElement => {
  return <ChevronRightIcon className="inf-breadcrumbs-separator" />
}

export default BreadcrumbsSeparator
