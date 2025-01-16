// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { Stepper } from './index'
import { StepperItemProps } from './components/StepperItem'
import { Text } from '../Text'
import { Link } from '../Link'
import { Space } from '../Space'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper
}

const getSteps: (direction: 'vertical' | 'horizontal') => StepperItemProps[] = (
  direction
) => [
  {
    id: 0,
    variant: 'success',
    index: 0,
    content: (
      <Space>
        <Space gap={'xsmall'} direction={direction} justify="space-between">
          <Text tone={'tertiary'}>23 янв 2022</Text>
          <span>Изменение показателя</span>
          <Link>Норматив 10 — 30%</Link>
        </Space>
      </Space>
    )
  },
  {
    id: 1,
    index: 1,
    variant: 'secondary',
    content: (
      <Space gap={'xsmall'}>
        <Text tone={'tertiary'}>30 янв 2023</Text>
        <div>
          <span>Деактивация</span>
          <Text tone={'default'} size={'xsmall'}>
            С этой даты проверки по показателю не совершаются
          </Text>
        </div>
      </Space>
    )
  },
  {
    id: 2,
    index: 2,
    variant: 'success',
    content: (
      <Space gap={'xsmall'} direction={direction}>
        <Text tone={'tertiary'}>24 янв 2024</Text>
        <span>Изменение показателя</span>
        <Link>Норматив 50 — 100%</Link>
      </Space>
    )
  }
]

const stepsVertical = getSteps('horizontal')

export default meta

export const Vertical: StoryObj<typeof Stepper> = {
  render: (args) => {
    return <Stepper {...args} steps={stepsVertical} />
  }
}
