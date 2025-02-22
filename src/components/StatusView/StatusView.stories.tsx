// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { StatusView } from './index'
import StopIcon from 'Icons/stop.svg?react'

const meta: Meta<typeof StatusView> = {
  title: 'Components/StatusView',
  component: StatusView
}

export default meta

const Template: StoryFn<typeof StatusView> = (args) => {
  return (
    <StatusView title="Ошибка 404" icon={<StopIcon />}>
      Запрашиваемая страница не найдена
    </StatusView>
  )
}

export const Playground = {
  render: Template
}
