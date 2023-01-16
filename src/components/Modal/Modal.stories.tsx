// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Modal } from './index'
import { Button } from '../Button'
import { useState } from 'react'
import ModalTitle from './components/ModalTitle'
import ModalClose from './components/ModalClose'

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal
}

export default meta

const Template: StoryFn<typeof Modal> = (args) => {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpened(true)} />
      <Modal
        {...args}
        isOpen={isOpened}
        onClose={() => setIsOpened(false)}>
        <Modal.Card>
          <Modal.Header>
            <ModalTitle>
              Изменение показателя
            </ModalTitle>
            <ModalClose />
          </Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, illo.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary">
              Добавить настройку
            </Button>
          </Modal.Footer>
        </Modal.Card>
      </Modal>
    </div>
  )
}

export const Playground = Template.bind({})
