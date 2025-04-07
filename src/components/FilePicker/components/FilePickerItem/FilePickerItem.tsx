import { ReactElement } from 'react'
import { IFileData } from '../../FilePicker'
import IconX from 'Icons/bx-x.svg?react'
import IconPaperclip from 'Icons/bx-paperclip.svg?react'
import cn from 'classnames'

import './FilePickerItem.scss'
import Space from 'Components/Space/Space'

export interface FilePickerItemProps {
  data: IFileData
  onGetFile?: () => void
  onDeleteFile?: () => void
  deletable?: boolean
}

const FilePickerItem = ({
  data,
  onGetFile = () => {},
  onDeleteFile = () => {},
  deletable = true
}: FilePickerItemProps): ReactElement => {
  return (
    <Space
      className="file-picker-item"
      role="row"
      direction="horizontal"
      gap="xsmall"
      align="center"
    >
      <IconPaperclip className="file-picker-item__clip-icon" />

      <button
        type="button"
        className={cn('file-picker-item__name', {
          'file-picker-item__name--active': onGetFile
        })}
        disabled={!onGetFile}
        title={data.name}
        onClick={() => {
          onGetFile()
        }}
      >
        {data.name}
      </button>

      {deletable && (
        <button
          type="button"
          className="file-picker-item__delete-btn"
          onClick={() => {
            onDeleteFile()
          }}
        >
          <IconX />
        </button>
      )}
    </Space>
  )
}

export default FilePickerItem
