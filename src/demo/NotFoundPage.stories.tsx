// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Layout } from '../components/Layout'
import { Page } from '../components/Page'
import { StatusView } from '../components/StatusView'
import StopIcon from 'Icons/stop.svg?react'

const ComponentMeta: Meta = {
  title: 'Demo/NotFound Page'
}

export default ComponentMeta

export const NotFoundPage: StoryFn = () => {
  return (
    <Layout>
      <Page>
        <Page.Body>
          <StatusView title="Ошибка 404" icon={<StopIcon />}>
            Запрашиваемая страница не найдена
          </StatusView>
        </Page.Body>
      </Page>
    </Layout>
  )
}
