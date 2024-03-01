import { ReactElement } from 'react'
import { ReactComponent as ChevronRightIcon } from 'Icons/chevronRight.svg'
import './BreadcrumbsSeparator.scss'

const BreadcrumbsSeparator = (): ReactElement => {
  return <ChevronRightIcon className="inf-breadcrumbs-separator" />
}

export default BreadcrumbsSeparator
