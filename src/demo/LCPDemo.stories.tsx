// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Layout } from '../components/Layout'
import { Page } from '../components/Page'
import { Space } from '../components/Space'
import { HeaderNav } from '../components/HeaderNav'
import { Logo } from '../components/Logo'
import { Heading } from '../components/Heading'
import { ShareholdersTableStories } from './shareholdersTable.stories'

const ComponentMeta: Meta = {
  title: 'Demo/ЛК Пайщика'
}

export default ComponentMeta

export const Demo: StoryFn = () => {
  return (
    <Layout>
      <Layout.Header>
        <Space direction="horizontal" gap="xxlarge">
          <Logo style={{ width: '126px' }} />
          <HeaderNav>
            <HeaderNav.Item active>Список пайщиков</HeaderNav.Item>
            <HeaderNav.Item>Собрания</HeaderNav.Item>
          </HeaderNav>
        </Space>
      </Layout.Header>
      <Layout.Body hasContainer fullHeight>
        <Page>
          <Page.Header>
            <Heading level="2">Список пайщиков</Heading>
          </Page.Header>
          <Page.Body>
            <ShareholdersTableStories />
          </Page.Body>
        </Page>
      </Layout.Body>
    </Layout>
  )
}
Demo.parameters = {
  layout: 'fullscreen',
  backgrounds: { default: 'light' }
}
