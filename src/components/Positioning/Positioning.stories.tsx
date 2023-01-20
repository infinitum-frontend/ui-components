import { StoryFn, Meta } from '@storybook/react'
import { Positioning } from './index'
import { useRef, useState } from 'react'
import { Space } from '../Space'
import { Button } from '../Button'

const meta: Meta<typeof Positioning> = {
  title: 'Layout/Positioning',
  component: Positioning,
  argTypes: {
    reference: {
      control: false
    }
  }
}

export default meta

const Template: StoryFn<typeof Positioning> = (args) => {
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Space
      style={{ height: '300px', justifyContent: 'center' }}
      align={'center'}
    >
      <Button ref={ref} onClick={() => setOpen(!open)}>
        Reference Element
      </Button>
      {open && ref.current && (
        <Positioning
          {...args}
          reference={ref.current}
          offset={[0, 10]}
          style={{ backgroundColor: 'cornflowerblue', color: 'white' }}
        >
          <div>Absolutely positioned Content</div>
        </Positioning>
      )}
    </Space>
  )
}
Template.args = {
  portal: false
}

export const Playground = Template.bind({})
