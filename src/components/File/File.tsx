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
import { Tooltip } from '../Tooltip'
import useTextOverflowTooltip from '~/src/hooks/useTextOverflowTooltip'

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
  const {
    isOpen: isTooltipOpen,
    onOpenChange: setTooltipOpen,
    handleMouseEnter,
    handleMouseLeave
  } = useTextOverflowTooltip()
  const isError = status === 'error'
  const isLoading = status === 'loading'
  const isIdle = status === 'idle'

  const getSizeBlock = (): ReactElement => {
    return (
      <Text variant="body-1" color="tertiary" uppercase nowrap>
        {size ? `(${formatBytes(size)} ${getUnitBySize(size)})` : ''}
      </Text>
    )
  }

  const getNameAndExtension = (isInteractive?: boolean): ReactElement => {
    const content = (
      <>
        {name}
        {extension && `.${extension}`}
      </>
    )
    return (
      <Tooltip
        open={isTooltipOpen}
        onOpenChange={setTooltipOpen}
        content={content}
      >
        <Text
          onClick={onGetFile}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          color={isInteractive ? 'info' : 'primary'}
          truncated
        >
          {content}
        </Text>
      </Tooltip>
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
      <Space
        direction="horizontal"
        gap="xsmall"
        align="start"
        className="inf-file__content-wrapper"
      >
        {isError && (
          <>
            <Icon color="error">
              <IconAttachment02 />
            </Icon>

            <div>
              <Space direction="horizontal" gap="xxsmall" align="start">
                {getNameAndExtension()}
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
            {getNameAndExtension()}
            {getSizeBlock()}
          </>
        )}

        {isIdle && (
          <>
            <Icon color="info" size="medium">
              <IconAttachment02 />
            </Icon>

            {getNameAndExtension(true)}
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
