import { ReactElement } from 'react'
import './File.scss'
import { Loader } from 'Components/Loader'
import { formatBytes, getUnitBySize } from '@infinitum-ui/shared'
import {
  IconAttachment02,
  IconDelete01,
  IconDownload04
} from '@infinitum-ui/icons'
import { Space } from '../Space'
import { Text } from '../Text'
import { IconButton } from '../IconButton'

export interface FileProps {
  name: string
  extension: string
  /** Размер файла в байтах */
  size?: number
  onGetFile?: () => void
  onDeleteFile?: () => void
  deletable?: boolean
  status?: 'loading' | 'error' | 'idle'
}

const File = ({
  onGetFile = () => {},
  onDeleteFile = () => {},
  deletable = false,
  status = 'idle',
  name,
  extension,
  size
}: FileProps): ReactElement => {
  return (
    <Space direction="horizontal" gap="xsmall" align="center">
      {status === 'loading' ? (
        <Loader className="file__loader" size="compact" variant="unset" />
      ) : (
        <IconButton color="primary" onClick={onGetFile}>
          <IconAttachment02 />
        </IconButton>
      )}

      <Text color="info" variant="body-1">
        {name}
      </Text>
      <Text variant="body-1" color="secondary" uppercase>
        {extension}
        {size ? `, ${formatBytes(size)} ${getUnitBySize(size)}` : ''}
      </Text>

      {onGetFile !== undefined && (
        <IconButton color="primary" onClick={onGetFile}>
          <IconDownload04 />
        </IconButton>
      )}

      {deletable && (
        <IconButton color="primary" onClick={onDeleteFile}>
          <IconDelete01 />
        </IconButton>
      )}
    </Space>
  )
}

export default File
