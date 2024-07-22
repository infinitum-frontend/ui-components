// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Button } from '../components/Button'
import { Space } from '../components/Space'
import { Input } from '../components/Input'
import { Heading } from '../components/Heading'
import { Card } from '../components/Card'
import { Link } from '../components/Link'
import logo from '../assets/images/logo.svg'

const ComponentMeta: Meta = {
  title: 'Demo/Sign In Form'
}

export default ComponentMeta

export const ProfileDetails: StoryFn = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  function onFormSubmit(e): void {
    e.preventDefault()
    alert(`Телефон: ${phone}, Пароль: ${password}`)
  }

  return (
    <Card style={{ maxWidth: '400px' }}>
      <form onSubmit={onFormSubmit}>
        <Space gap="large" align="center">
          <img src={logo} style={{ width: '200px' }} />

          <Heading>Войти в систему</Heading>

          <Space
            direction="vertical"
            align="center"
            style={{ alignSelf: 'stretch' }}
          >
            <Input
              value={phone}
              placeholder="+79999999999"
              type="tel"
              required
              onChange={(e) => setPhone(e.target.value)}
            />

            <Input
              value={password}
              placeholder="Пароль"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" variant="secondary" block>
              Войти
            </Button>

            <Button variant="secondary" block>
              Войти через ГОСУСЛУГИ
            </Button>

            <Space direction="horizontal" gap="large">
              <Link variant="secondary">Инструкция</Link>
              <Link variant="secondary">Забыли пароль?</Link>
            </Space>
          </Space>
        </Space>
      </form>
    </Card>
  )
}
