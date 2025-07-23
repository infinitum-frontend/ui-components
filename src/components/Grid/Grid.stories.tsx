// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { Box } from 'Components/Box'
import Grid from './Grid'

const ComponentMeta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    docs: {
      source: {
        excludeDecorators: true
      }
    }
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Grid> = ({ ...args }) => (
  <Grid {...args}>
    {[1, 2, 3, 4, 5].map((item, index) => (
      <Box
        key={index}
        background="secondary"
        borderWidth="default"
        borderColor="default"
        padding="medium"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, esse.
      </Box>
    ))}
  </Grid>
)

export const Playground = {
  render: Template
}

export const WithTemplateAreas: StoryObj<typeof Grid> = {
  render: (args) => {
    return (
      <Grid
        templateAreas={`
          "header  header"
          "sidebar content"
          "footer  footer"
        `}
        templateColumns="1fr 3fr"
        templateRows="80px 1fr 60px"
        gap="small"
        style={{
          width: '100%',
          height: '400px'
        }}
      >
        <Grid.Item
          area="header"
          style={{
            backgroundColor: 'teal',
            color: 'white'
          }}
        >
          Шапка (строка 1)
        </Grid.Item>

        <Grid.Item
          area="sidebar"
          style={{
            backgroundColor: 'orange'
          }}
        >
          Сайдбар (строка 2)
        </Grid.Item>

        <Grid.Item
          area="content"
          style={{
            backgroundColor: 'blue',
            color: 'white'
          }}
        >
          Контент (строка 2)
        </Grid.Item>

        <Grid.Item
          area="footer"
          style={{
            backgroundColor: 'purple',
            color: 'white'
          }}
        >
          Подвал (строка 3)
        </Grid.Item>
      </Grid>
    )
  }
}

export const WithGridItemsPlacement: StoryObj<typeof Grid> = {
  render: (args) => {
    return (
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(3, 100px)"
        gap="small"
      >
        <Grid.Item
          placement={{
            columnStart: 2,
            columnEnd: 4,
            rowStart: 1,
            rowEnd: 3
          }}
          style={{
            backgroundColor: 'teal',
            color: 'white'
          }}
        >
          Элемент с явным позиционированием Блок 1 (колонка 2-4 × строка 1-3)
        </Grid.Item>

        <Grid.Item
          placement={{
            columnStart: 1,
            rowStart: 2,
            rowEnd: 'span 2'
          }}
          style={{
            backgroundColor: 'orange'
          }}
        >
          Элемент с комбинированным позиционированием Блок 2 (авто ширина × 2
          строки)
        </Grid.Item>

        <Grid.Item
          placement={{
            columnStart: 'span 2',
            rowStart: 3
          }}
          style={{
            backgroundColor: 'purple',
            color: 'white'
          }}
        >
          Элемент с относительным позиционированием Блок 3 (2 колонки × 1
          строка)
        </Grid.Item>
      </Grid>
    )
  }
}

export const WithGridItemsAlignment: StoryObj<typeof Grid> = {
  render: (args) => {
    return (
      <Grid
        templateColumns="repeat(3, 150px)"
        templateRows="repeat(3, 100px)"
        gap="small"
      >
        <Grid.Item
          style={{ backgroundColor: 'teal' }}
          alignSelf="center"
          justifySelf="center"
        >
          Центр
        </Grid.Item>

        <Grid.Item
          style={{ backgroundColor: 'orange' }}
          justifySelf="end"
          alignSelf="end"
        >
          Правый низ
        </Grid.Item>

        <Grid.Item
          style={{ backgroundColor: 'purple', color: 'white' }}
          justifySelf="stretch"
        >
          Растянут по ширине
        </Grid.Item>

        <Grid.Item
          style={{ backgroundColor: 'red', color: 'white' }}
          justifySelf="start"
          alignSelf="start"
        >
          Левый верх
        </Grid.Item>

        <Grid.Item style={{ backgroundColor: 'crimson', color: 'white' }}>
          Авто, по умолчанию
        </Grid.Item>
      </Grid>
    )
  }
}
