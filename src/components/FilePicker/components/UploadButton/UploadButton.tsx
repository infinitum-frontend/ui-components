import { ReactElement, ChangeEvent } from 'react'
import uniqueId from 'lodash/uniqueId'
import { Button } from 'Components/Button'

const UploadButton = (props: {
  onChange: (e: FileList) => void
}): ReactElement => {
  const domId: string = uniqueId('upload-btn-')

  const handleChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement

    if (target.files?.length) {
      props.onChange(target.files)
    }

    target.value = '' // for onChange with same filename
  }
  return (
    <div role="button">
      <Button
        as="label"
        htmlFor={domId}
        className="inf-upload-button"
        variant="tertiary"
      >
        Прикрепить...
      </Button>
      <input type="file" multiple id={domId} hidden onChange={handleChange} />
    </div>
  )
}

export default UploadButton
