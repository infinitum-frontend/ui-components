// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { HeaderNav } from './index'
import { Layout } from 'Components/Layout'
import { Container } from 'Components/Container'
import { Logo } from 'Components/Logo'
import { Space } from 'Components/Space'

const meta: Meta<typeof HeaderNav> = {
  title: 'HeaderNav',
  component: HeaderNav
}

export default meta

const Template: StoryFn<typeof HeaderNav> = (args) => {
  return (
    <HeaderNav {...args}>
      <HeaderNav.Item as="a" href="https://specdep.ru/">
        Главная
      </HeaderNav.Item>
      <HeaderNav.Item as="a" href="https://specdep.ru/" target="_blank">
        Пайщики
      </HeaderNav.Item>
      <HeaderNav.Item active>Морозов Виталий Владимирович</HeaderNav.Item>
    </HeaderNav>
  )
}
export const Playground = Template.bind({})

export const InLayout: StoryFn<typeof HeaderNav> = (args) => {
  return (
    <Layout>
      <Layout.Header>
        <Space direction="horizontal" gap="xxlarge">
          <Logo style={{ width: '126px' }} />
          <HeaderNav>
            <HeaderNav.Item>Последующий контроль</HeaderNav.Item>
            <HeaderNav.Item active>Показатели контроля</HeaderNav.Item>
            <HeaderNav.Item>Сотрудники</HeaderNav.Item>
            <HeaderNav.Item>Портфели</HeaderNav.Item>
          </HeaderNav>
        </Space>
      </Layout.Header>
      <Layout.Body>
        <Container>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          recusandae ab nisi, quasi atque perferendis ex itaque. Molestiae ut,
          consequatur neque ea facere sed. Consectetur impedit laboriosam rem
          maxime velit ducimus voluptates ullam, ab voluptatem at minus
          inventore, dolorem fugit perferendis non rerum a molestiae qui illum
          libero iure nulla itaque. Quasi atque numquam tempora qui inventore
          iste esse est dolorum excepturi, repudiandae facere laboriosam alias
          voluptates, pariatur soluta! Voluptatem repudiandae placeat sed
          aspernatur quisquam ipsam atque, eum voluptate reprehenderit minima
          unde id reiciendis eos a dolore blanditiis odit ut, quasi dolorum modi
          enim temporibus facilis, distinctio dignissimos! Magnam, deserunt.
        </Container>
      </Layout.Body>
    </Layout>
  )
}
InLayout.parameters = {
  layout: 'fullscreen',
  backgrounds: { default: 'light' }
}
