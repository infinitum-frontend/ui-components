import { ReactElement, ChangeEvent, useId } from 'react'
import { Button } from 'Components/Button'

interface UploadButtonProps {
  onChange: (e: FileList) => void
  multiple?: boolean
}
const UploadButton = ({
  onChange,
  multiple
}: UploadButtonProps): ReactElement => {
  const domId: string = useId()

  const handleChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement

    if (target.files?.length) {
      onChange(target.files)
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
      <input
        type="file"
        multiple={multiple}
        id={domId}
        hidden
        onChange={handleChange}
      />
    </div>
  )
}

export default UploadButton
