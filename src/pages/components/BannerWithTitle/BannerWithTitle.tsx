import { ReactElement } from 'react'
import './BannerWithTitle.scss'

export interface BannerWithTitleProps {
  title?: string
  imageSrc: string
}

const BannerWithTitle = ({
  title,
  imageSrc,
  ...rest
}: BannerWithTitleProps): ReactElement => {
  console.log(imageSrc)
  return (
    <div
      className="banner-with-title"
      {...rest}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {title && <div className="banner-with-title__title">{title}</div>}
    </div>
  )
}

export default BannerWithTitle
