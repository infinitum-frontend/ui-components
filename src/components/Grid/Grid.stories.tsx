// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Grid } from './Grid/index'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { Box } from 'Components/Box'
import { GridItem } from './GridItem'

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
        <GridItem
          area="header"
          style={{
            backgroundColor: 'teal',
            color: 'white'
          }}
        >
          Шапка (строка 1)
        </GridItem>

        <GridItem
          area="sidebar"
          style={{
            backgroundColor: 'orange'
          }}
        >
          Сайдбар (строка 2)
        </GridItem>

        <GridItem
          area="content"
          style={{
            backgroundColor: 'blue',
            color: 'white'
          }}
        >
          Контент (строка 2)
        </GridItem>

        <GridItem
          area="footer"
          style={{
            backgroundColor: 'purple',
            color: 'white'
          }}
        >
          Подвал (строка 3)
        </GridItem>
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
        <GridItem
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
        </GridItem>

        <GridItem
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
        </GridItem>

        <GridItem
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
        </GridItem>
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
        <GridItem
          style={{ backgroundColor: 'teal' }}
          alignSelf="center"
          justifySelf="center"
        >
          Центр
        </GridItem>

        <GridItem
          style={{ backgroundColor: 'orange' }}
          justifySelf="end"
          alignSelf="end"
        >
          Правый низ
        </GridItem>

        <GridItem
          style={{ backgroundColor: 'purple', color: 'white' }}
          justifySelf="stretch"
        >
          Растянут по ширине
        </GridItem>

        <GridItem
          style={{ backgroundColor: 'red', color: 'white' }}
          justifySelf="start"
          alignSelf="start"
        >
          Левый верх
        </GridItem>

        <GridItem style={{ backgroundColor: 'crimson', color: 'white' }}>
          Авто, по умолчанию
        </GridItem>
      </Grid>
    )
  }
}
