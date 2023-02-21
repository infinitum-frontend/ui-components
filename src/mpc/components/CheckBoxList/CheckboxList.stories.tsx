import { StoryFn, Meta } from '@storybook/react'
import { CheckboxList } from './index'
import { useState } from 'react'

const meta: Meta<typeof CheckboxList> = {
  title: 'MPC/CheckboxList',
  component: CheckboxList
}

export default meta

const Template: StoryFn<typeof CheckboxList> = (args) => {
  const [selected, setSelected] = useState<any[]>([])

  return (
    <>
      <CheckboxList
        {...args}
        data={[
          { id: 0, title: 'Чекбокс 1' },
          { id: 1, title: 'Чекбокс 2' }
        ]}
        selectedOptions={selected}
        onChange={(value) => setSelected(value)}
      />
      <div>Выбрано: {selected.map((item) => item.id)}</div>
    </>
  )
}

export const Playground = Template.bind({})
