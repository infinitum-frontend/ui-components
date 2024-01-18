// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { PageLayout } from './index'
import { HeaderNav } from '../HeaderNav'
import { Logo } from '../Logo'
import { Space } from '../Space'
import { Card } from '../Card'
import { Container } from '../Container'

const meta: Meta<typeof PageLayout> = {
  title: 'Layout/PageLayout',
  component: PageLayout
}

export default meta

const Template: StoryFn<typeof PageLayout> = (args) => {
  return (
    <PageLayout {...args}>
      <PageLayout.Header sticky>
        <Space direction="horizontal" gap="xlarge" align="center">
          <Logo style={{ width: '140px' }} />
          <HeaderNav>
            <HeaderNav.Item active>Пункт меню 1</HeaderNav.Item>
            <HeaderNav.Item>Пункт меню 2</HeaderNav.Item>
            <HeaderNav.Item>Пункт меню 3</HeaderNav.Item>
          </HeaderNav>
        </Space>
      </PageLayout.Header>
      <PageLayout.Body>
        <PageLayout.Content>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {Array.from({ length: 40 }, (_, i) => (
              <p key={i}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
                ab veritatis dolorum accusantium, eius laudantium expedita fuga
                unde sed odit iure eligendi. Sapiente harum ex commodi aperiam
                dignissimos non expedita natus labore eius eligendi illum dolore
                laudantium, consequuntur similique nostrum.
              </p>
            ))}
          </div>
        </PageLayout.Content>
      </PageLayout.Body>
    </PageLayout>
  )
}

export const Playground = {
  render: Template,

  parameters: {
    layout: 'fullscreen'
  }
}

export const CenteredContent: StoryFn<typeof PageLayout> = () => {
  return (
    <PageLayout>
      <PageLayout.Header>
        <Space direction="horizontal" gap="xlarge" align="center">
          <Logo style={{ width: '140px' }} />
        </Space>
      </PageLayout.Header>
      <PageLayout.Body>
        <PageLayout.Content centerContent>
          <Container size="xsmall">
            <Card size="large">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Excepturi magni ipsa natus? Sequi veniam dolor eveniet temporibus
              magni amet rerum cupiditate nihil nisi accusantium dicta quidem,
              unde earum eaque atque obcaecati at sunt minus repudiandae quod,
              id, enim iusto dolore! Facilis itaque beatae ullam dolore,
              excepturi, rerum consectetur error ea necessitatibus officia
              alias. Qui eos magnam dolore corporis! Eligendi nesciunt aperiam
              iure dolores itaque atque omnis officia! Quos minus et, aliquid
              dolorem accusantium amet, placeat omnis doloribus quaerat non
              error mollitia quod porro alias laborum recusandae est at animi
              qui ipsa expedita nam ipsum facilis nobis! Cupiditate corporis eos
              eligendi?
            </Card>
          </Container>
        </PageLayout.Content>
      </PageLayout.Body>
    </PageLayout>
  )
}

CenteredContent.parameters = {
  layout: 'fullscreen'
}
