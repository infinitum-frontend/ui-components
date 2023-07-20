import { ReactElement } from 'react'
import { ReactComponent as IconX } from 'Icons/bx-x.svg'
import { ReactComponent as IconFile } from 'Icons/file.svg'
import { ReactComponent as IconDownload } from 'Icons/download.svg'
import './File.scss'

export interface FileProps {
  // file: File
  name: string
  extension: string
  size: number
  unit: string
  onGetFile?: () => void
  onDeleteFile?: () => void
  deletable?: boolean
  downloadable?: boolean
}

const File = ({
  // file,
  onGetFile = () => {},
  onDeleteFile = () => {},
  deletable = false,
  downloadable = false,
  name,
  extension,
  size,
  unit
}: FileProps): ReactElement => {
  // const { name, size, type } = file

  // const fileSizeMB = Math.round((size / 1024 ** 2) * 10) / 10

  return (
    <div className="file">
      <div className="file__media">
        <IconFile className="file__icon" />
      </div>

      <div className="file__middle">
        <div className="file__title">{name}</div>
        <div className="file__caption">
          {extension}, {size} {unit}
        </div>
      </div>

      {deletable && (
        <button
          type="button"
          className="file__button"
          onClick={() => {
            onDeleteFile()
          }}
        >
          <IconX className="file__button-icon" />
        </button>
      )}
      <button
        type="button"
        className="file__button"
        onClick={() => {
          onGetFile()
        }}
      >
        <IconDownload className="file__button-icon" />
      </button>
    </div>
  )
}

export default File
