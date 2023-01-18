// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Modal } from './index'
import { Button } from '../Button'
import { Space } from '../Space'
import { useState } from 'react'
import ModalTitle from './components/ModalTitle'
import { Heading } from '../Heading'
import { Text } from '../Text'

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
  parameters: {
    docs: {
      // Opt-out of inline rendering
      inlineStories: false
    }
  }
}

export default meta

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpened, setIsOpened] = useState(true)

  return (
    <div>
      <Button onClick={() => setIsOpened(true)}>Открыть модальное окно</Button>
      <Modal {...args} isOpen={isOpened} onClose={() => setIsOpened(false)}>
        <Modal.Header>
          <ModalTitle>Изменение показателя</ModalTitle>
        </Modal.Header>
        <Modal.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
          illo.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Добавить настройку</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export const Playground = Template.bind({})

export const Custom: StoryFn<typeof Button> = (args) => {
  const [isOpened, setIsOpened] = useState(true)

  return (
    <>
      <Button onClick={() => setIsOpened(true)}>Открыть модальное окно</Button>
      <Modal {...args} isOpen={isOpened} onClose={() => setIsOpened(false)}>
        <div style={{ padding: '30px', backgroundColor: 'lightgray' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ad
          accusamus perferendis at earum obcaecati architecto nihil porro iusto
          consectetur alias iste, corrupti vero incidunt delectus assumenda!
          Dolor, quisquam eaque?
        </div>
      </Modal>
    </>
  )
}
