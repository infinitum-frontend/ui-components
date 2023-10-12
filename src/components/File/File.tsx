import { ReactElement } from 'react'
import { ReactComponent as IconX } from 'Icons/cross.svg'
import { ReactComponent as IconFile } from 'Icons/file.svg'
import { ReactComponent as IconDownload } from 'Icons/download.svg'
import './File.scss'
import { Loader } from 'Components/Loader'

export interface FileProps {
  name: string
  extension: string
  size: number
  unit: string
  onGetFile?: () => void
  onDeleteFile?: () => void
  deletable?: boolean
  loading?: boolean
}

const File = ({
  onGetFile = () => {},
  onDeleteFile = () => {},
  deletable = false,
  loading = false,
  name,
  extension,
  size,
  unit
}: FileProps): ReactElement => {
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

      {loading ? (
        <Loader className="file__loader" size="compact" variant="unset" />
      ) : deletable ? (
        <button
          type="button"
          className="file__button"
          onClick={() => {
            onDeleteFile()
          }}
        >
          <IconX className="file__button-icon" />
        </button>
      ) : (
        <button
          type="button"
          className="file__button"
          onClick={() => {
            onGetFile()
          }}
        >
          <IconDownload className="file__button-icon" />
        </button>
      )}
    </div>
  )
}

export default File
