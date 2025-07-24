import { ReactElement } from 'react'
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
import { Icon } from '../Icon'
import './File.scss'

export interface FileProps {
  name: string
  extension: string
  /** Размер файла в байтах */
  size?: number
  onGetFile?: () => void
  onDeleteFile?: () => void
  deletable?: boolean
  status?: 'loading' | 'error' | 'idle'
  errorMessage?: string
}

const File = ({
  onGetFile,
  onDeleteFile = () => {},
  deletable = false,
  status = 'idle',
  name,
  extension,
  size,
  errorMessage
}: FileProps): ReactElement => {
  const isError = status === 'error'
  const isLoading = status === 'loading'
  const isIdle = status === 'idle'

  const getSizeBlock = (): ReactElement => {
    return (
      <Text variant="body-1" color="tertiary" uppercase>
        {size ? `(${formatBytes(size)} ${getUnitBySize(size)})` : ''}
      </Text>
    )
  }

  const getNameAndExtension = (): ReactElement => {
    return (
      <>
        <Text variant="body-1">{name}</Text>
        {extension && <Text variant="body-1">.{extension}</Text>}
      </>
    )
  }

  return (
    <Space
      direction="horizontal"
      gap="xsmall"
      align="start"
      className="inf-file"
      justify="space-between"
    >
      <Space direction="horizontal" gap="xsmall" align="start">
        {isError && (
          <>
            <Icon color="error">
              <IconAttachment02 />
            </Icon>

            <div>
              <Space direction="horizontal" gap="xxsmall" align="start">
                <div className="inf-file__name-wrapper">
                  <Text variant="body-1">{name}</Text>
                  {extension && <Text variant="body-1">.{extension}</Text>}
                </div>
                {getSizeBlock()}
              </Space>
              {errorMessage && (
                <Text variant="body-2" color="error">
                  {errorMessage}
                </Text>
              )}
            </div>
          </>
        )}

        {isLoading && (
          <>
            <Loader
              size="compact"
              variant="unset"
              className="inf-file__loader"
            />

            <div className="inf-file__name-wrapper">
              <Text variant="body-1">{name}</Text>
              {extension && <Text variant="body-1">.{extension}</Text>}
            </div>
            {getSizeBlock()}
          </>
        )}

        {isIdle && (
          <>
            <Icon color="info" size="medium">
              <IconAttachment02 />
            </Icon>

            <Text
              onClick={onGetFile}
              color="info"
              className="inf-file__name-wrapper"
            >
              {getNameAndExtension()}
            </Text>
            {getSizeBlock()}
          </>
        )}
      </Space>

      <Space direction="horizontal" gap="xsmall" align="center">
        {onGetFile !== undefined && (
          <IconButton color="primary" onClick={onGetFile}>
            <IconDownload04 />
          </IconButton>
        )}

        {deletable && (
          <IconButton
            color={isError ? 'error' : 'primary'}
            onClick={onDeleteFile}
          >
            <IconDelete01 />
          </IconButton>
        )}
      </Space>
    </Space>
  )
}

export default File
