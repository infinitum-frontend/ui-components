import { StoryFn, Meta } from '@storybook/react'
import { Form } from './index'
import { Button } from '../Button'
import { Select } from '../Select'
import { Checkbox } from '../Checkbox'

const meta: Meta<typeof Form> = {
  title: 'Form',
  component: Form
}

export default meta

const Template: StoryFn<typeof Form> = (args) => {
  return (
    <Form {...args} onSubmit={() => console.log('submit')}>
      <Form.Group direction={'horizontal'}>
        <Form.Label>Тип владения</Form.Label>
        <Select
          options={[{ label: '1', value: '1' }]}
          placeholder={'Собственные, короткие позиции'}
        />
        <Form.Hint>Введи что хочешь</Form.Hint>
      </Form.Group>
      <Form.Group direction={'horizontal'}>
        <Form.Label>Счёт депо</Form.Label>
        <Checkbox required={true}>Использовать для отбора счёт депо</Checkbox>
      </Form.Group>
      <Button type={'submit'}>Подтвердить</Button>
    </Form>
  )
}

export const Playground = Template.bind({})
