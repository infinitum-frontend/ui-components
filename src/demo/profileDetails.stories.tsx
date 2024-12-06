// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Button } from '../components/Button'
import { Space } from '../components/Space'
import { Input } from '../components/Input'
import { Heading } from '../components/Heading'
import { Card } from '../components/Card'
import { Text } from '../components/Text'
import { Link } from '../components/Link'
import { Select } from '../components/Select'

const ComponentMeta: Meta = {
  title: 'Demo/Profile Details'
}

export default ComponentMeta

export const ProfileDetails: StoryFn = () => {
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<number>(1)

  function onFormSubmit(e): void {
    e.preventDefault()
    alert(
      `Телефон: ${phone}, E-mail: ${email}, Пароль: ${password}, Роль: ${role}`
    )
  }

  return (
    <Card style={{ maxWidth: '400px' }}>
      <form onSubmit={onFormSubmit}>
        <Space direction="vertical">
          <Heading>Константинов Константин Константинович</Heading>
          <Space direction="vertical" gap="xxsmall">
            <Text tone="tertiary">Паспортные данные</Text>
            <Text>№1234 123456, выдан ГУ МВД России по Республике Шкид</Text>
          </Space>

          <Space direction="vertical" gap="xxsmall">
            <Text tone="tertiary">Телефон</Text>
            <Input
              value={phone}
              placeholder="+79999999999"
              type="tel"
              name="phone"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </Space>

          <Space direction="vertical" gap="xxsmall">
            <Text tone="tertiary">E-mail</Text>
            <Input
              value={email}
              placeholder="mail@domain.ru"
              type="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Space>

          <Space direction="vertical" gap="xxsmall">
            <Text tone="tertiary">Пароль</Text>
            <Input
              value={password}
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Space>

          <Space direction="vertical" gap="xxsmall">
            <Text tone="tertiary">Роль</Text>
            <Select
              value={role}
              onChange={({ value }) => setRole(value as number)}
              options={[
                {
                  label: 'Депозитарные услуги',
                  value: 0
                },
                {
                  label: 'Спецдепозитарные услуги',
                  value: 1
                },
                {
                  label: 'Консалтинг и аутсорсинг',
                  value: 2
                }
              ]}
              name="role"
            />
          </Space>

          <Link variant="secondary">Изменить пароль</Link>

          <Button type="submit" variant="secondary" block>
            Сохранить изменения
          </Button>
        </Space>
      </form>
    </Card>
  )
}
