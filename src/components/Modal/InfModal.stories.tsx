import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { InfModal } from './index'
import { InfButton } from '../Button'
import { useState } from 'react'

const meta: Meta<typeof InfModal> = {
  title: 'Modal',
  component: InfModal
}

export default meta

const Template: StoryFn<typeof InfModal> = (args) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div>
      <InfButton onClick={() => setIsOpened(true)} />
      <InfModal {...args}
                isOpen={isOpened}
                onClose={() => setIsOpened(false)}>hello
      </InfModal>
    </div>
  )
}

export const Playground = Template.bind({})
