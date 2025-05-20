import { ReactElement } from 'react'
import './File.scss'
import { Loader } from 'Components/Loader'
import { formatBytes, getUnitBySize } from '@infinitum-ui/shared'
import {
  IconAttachment02,
  IconDelete01,
  IconDownload04
} from '@infinitum-ui/icons'
import { Icon } from '../Icon'
import { Space } from '../Space'
import { Text } from '../Text'

export interface FileProps {
  name: string
  extension: string
  /** Размер файла в байтах */
  size?: number
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
  size
}: FileProps): ReactElement => {
  return (
    <Space direction="horizontal" gap="xsmall" align="center">
      {loading ? (
        <Loader className="file__loader" size="compact" variant="unset" />
      ) : (
        <Icon color="info" size="medium">
          <IconAttachment02 />
        </Icon>
      )}
      <Text color="info" variant="body-1">
        {name}
      </Text>
      <Text variant="body-1" color="secondary" uppercase>
        {extension}
        {size ? `, ${formatBytes(size)} ${getUnitBySize(size)}` : ''}
      </Text>

      {deletable ? (
        <button
          type="button"
          className="file__button"
          onClick={() => {
            onDeleteFile()
          }}
        >
          <Icon size="medium" color="primary">
            <IconDelete01 />
          </Icon>
        </button>
      ) : (
        // TODO: IconButton
        <button
          type="button"
          className="file__button"
          onClick={() => {
            onGetFile()
          }}
        >
          <Icon size="medium">
            <IconDownload04 />
          </Icon>
        </button>
      )}
    </Space>
  )
}

export default File
