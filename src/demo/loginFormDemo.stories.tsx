// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Button } from '../components/Button'
import { Space } from '../components/Space'
import { Input } from '../components/Input'
import { Heading } from '../components/Heading'

const ComponentMeta: Meta = {
  title: 'Demo/Login Form',
  argTypes: {}
}

export default ComponentMeta

export const LoginForm: StoryFn = (args) => (
  <div style={{ maxWidth: '420px' }}>
    <Space direction="vertical">
      <Heading>Войти в систему</Heading>
      <Input />
      <Input />
      <Button variant="secondary" block>
        Войти
      </Button>
      <Button variant="default" block>
        Войти через Гослуги
      </Button>
    </Space>
  </div>
)
