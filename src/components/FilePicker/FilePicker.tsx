import { ReactElement } from 'react'
import UploadButton from './components/UploadButton'
import Space from 'Components/Space/Space'
import uniqueId from 'lodash/uniqueId'
import FilePickerItem from './components/FilePickerItem'

export interface IFileData {
  id: string
  name: string
  // TODO: обсудить дополнительные пропы - для ссылки на файл(когда есть сохраненный на сервере список, и на клиент приходит лишь id/name/href)
  fileForm?: File // for upload binary
}

// TODO: макс количество, размер, ограничение форматов загружаемого файла, disabled состояние
export interface FilePickerProps {
  files: IFileData[]
  onChange?: (files: IFileData[]) => void
  onGetFile?: (file: IFileData) => void
  onDeleteFile?: (file: IFileData) => void
}

function mapFileListToArray(filesData: FileList): IFileData[] {
  return Object.keys(filesData).map((key) => ({
    name: filesData[Number(key)].name,
    id: uniqueId('file-'),
    fileForm: filesData[Number(key)]
  }))
}

const FilePicker = ({
  files = [],
  onChange,
  onGetFile,
  onDeleteFile
}: FilePickerProps): ReactElement => {
  function handleChange(selectedFiles: FileList): void {
    const selectedFilesArray = mapFileListToArray(selectedFiles)
    const result = [...files, ...selectedFilesArray]
    onChange?.(result)
  }

  const handleDelete = (file: IFileData): void => {
    onChange?.(files.filter((f) => f.id !== file.id))
    onDeleteFile?.(file)
  }

  const handleGetFile = (file: IFileData): void => {
    // TODO: Проработать. В макетах файлы являются "ссылками", т.е. в теории их можно скачать/перейти по ним
    if (!file.fileForm) {
      onGetFile?.(file)
    } else {
      // если это файл, скачиваем его. Добавил просто, чтобы работало, хотя логики в этом нет - ведь мы только что загрузили этот самый файл. Нужна проработка
      const href = URL.createObjectURL(file.fileForm)
      const a = document.createElement('a')
      a.setAttribute('href', href)
      a.setAttribute('download', '')
      a.click()
    }
  }

  return (
    <Space role="form">
      {Boolean(files.length) && (
        <Space gap="xsmall">
          {files.map((file) => (
            <FilePickerItem
              key={file.id}
              data={file}
              onGetFile={() => handleGetFile(file)}
              onDeleteFile={() => handleDelete(file)}
            />
          ))}
        </Space>
      )}

      <UploadButton onChange={handleChange} />
    </Space>
  )
}

export default FilePicker
