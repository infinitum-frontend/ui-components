// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FormEventHandler, ReactElement, useState } from 'react'
import Input from '../../Input/Input'
import Button from 'Components/Button/Button'
import Form from 'Components/Form/components/Form'
import '../style/header-filter-input.scss'
import Space from 'Components/Space/Space'

export interface HeaderFilterInputProps {
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  value: string
}

const HeaderFilterInput = ({
  onChange,
  onSubmit,
  value
}: HeaderFilterInputProps): ReactElement => {
  const handleInput = (value: string): void => {
    onChange?.(value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = () => {
    onSubmit?.(value)
  }

  return (
    <Form
      onSubmit={handleSubmit}
      gap={'xxsmall'}
      className={'inf-header-filter-input'}
    >
      <Input allowClear={true} value={value} onInput={handleInput} />
      <Space direction={'horizontal'} justify={'space-between'} gap={'xsmall'}>
        <Button type={'submit'} size={'small'} variant={'secondary'} block>
          Применить
        </Button>
        <Button
          size={'small'}
          variant={'tertiary'}
          block
          onClick={() => handleInput('')}
        >
          Сбросить
        </Button>
      </Space>
    </Form>
  )
}

export default HeaderFilterInput
