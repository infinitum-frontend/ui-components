import { StoryObj, Meta } from '@storybook/react'
import { Stepper } from './index'
import { StepProps } from './Step'
import { Text } from '../Text'
import { Link } from '../Link'
import { Space } from '../Space'

const meta: Meta<typeof Stepper> = {
  title: 'Stepper',
  component: Stepper
}

const getSteps: (direction: 'vertical' | 'horizontal') => StepProps[] = (
  direction
) => [
  {
    id: 0,
    content: (
      <Space gap={'xsmall'} direction={direction}>
        <Text tone={'tertiary'}>23.01.2022</Text>
        <span>Изменение показателя</span>
        <Link>Норматив 10 — 30%</Link>
      </Space>
    )
  },
  {
    id: 1,
    content: (
      <Space gap={'xsmall'} direction={direction}>
        <Text tone={'tertiary'}>24.01.2022</Text>
        <span>Изменение показателя</span>
        <Link>Норматив 50 — 100%</Link>
      </Space>
    )
  },
  {
    id: 2,
    content: (
      <Space gap={'xsmall'} direction={direction}>
        <Text tone={'tertiary'}>30.01.2022</Text>
        <div>
          <span>Деактивация</span>
          <Text tone={'default'} size={'xsmall'}>
            С этой даты проверки по показателю не совершаются
          </Text>
        </div>
      </Space>
    )
  }
]

const stepsHorizontal = getSteps('vertical')
const stepsVertical = getSteps('horizontal')

export default meta

export const Vertical: StoryObj<typeof Stepper> = {
  render: (args) => {
    return <Stepper {...args} steps={stepsVertical} current={1} />
  }
}

export const Horizontal: StoryObj<typeof Stepper> = {
  render: (args) => {
    return (
      <Stepper steps={stepsHorizontal} current={1} direction={'horizontal'} />
    )
  }
}

export const Clipped: StoryObj<typeof Stepper> = {
  render: (args) => {
    return (
      <Stepper steps={stepsVertical.slice(0, 1)} clipped={true} current={1} />
    )
  }
}
