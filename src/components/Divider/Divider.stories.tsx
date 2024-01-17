// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Divider } from './index'
import { Space } from 'Components/Space'
import { Grid } from 'Components/Grid'
import { Text } from 'Components/Text'

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider
}

export default meta

const Template: StoryFn<typeof Divider> = (args) => {
  return (
    <Space>
      <Text>Lorem ipsum dolor sit amet.</Text>
      <Divider {...args} />
      <Text>Lorem ipsum dolor, sit amet consectetur adipisicing.</Text>
    </Space>
  )
}

export const Playground = {
  render: Template
}

export const WithText: StoryObj<typeof Divider> = {
  render: Template,
  args: {
    children: 'Это текст'
  }
}

export const Vertical: StoryObj<typeof Divider> = {
  render: () => {
    return (
      <Grid
        templateColumns="1fr auto 1fr auto 1fr"
        gap="medium"
        alignItems="start"
      >
        <Grid templateColumns="1fr 1fr" gap="small">
          <Text color="secondary">Дата составления протокола</Text>
          <Text>20.04.1997</Text>
          <Text color="secondary">
            Форма проведения Инвестиционного комитета
          </Text>
          <Text>Заседние с дистанционным участием</Text>
          <Text color="secondary">
            Дата принятия решения о созыве Инвестиционного комитета
          </Text>
          <Text>25.06.2023</Text>
        </Grid>

        <Divider orientation="vertical" />

        <Grid templateColumns="1fr 1fr" gap="small">
          <Text color="secondary">Название фонда</Text>
          <Text>Альфа инвестици</Text>
          <Text color="secondary">Наименование управляющей компании Фонда</Text>
          <Text>Альфа капитал</Text>
          <Text color="secondary">
            Наименование специализированного депозитария Фонда
          </Text>
          <Text>Инфинитум</Text>
        </Grid>

        <Divider orientation="vertical" />

        <Grid templateColumns="1fr 1fr" gap="small">
          <Text color="secondary">
            Общее количество голосов, принадлежащих владельцам инвестиционных
            паев, имеющим право на участие в голосовании
          </Text>
          <Text>10000</Text>
          <Text color="secondary">
            Общее количество голосов, которыми обладали владельцы инвестиционных
            паев, принявшие участие в голосовании
          </Text>
          <Text>500</Text>
          <Text color="secondary">Кворум</Text>
          <Text>60%</Text>
        </Grid>
      </Grid>
    )
  }
}

export const VerticalWithText: StoryObj<typeof Divider> = {
  render: () => {
    return (
      <Grid
        templateColumns="1fr auto 1fr auto 1fr"
        gap="medium"
        alignItems="start"
      >
        <Grid templateColumns="1fr 1fr" gap="small">
          <Text color="secondary">Дата составления протокола</Text>
          <Text>20.04.1997</Text>
          <Text color="secondary">
            Форма проведения Инвестиционного комитета
          </Text>
          <Text>Заседние с дистанционным участием</Text>
          <Text color="secondary">
            Дата принятия решения о созыве Инвестиционного комитета
          </Text>
          <Text>25.06.2023</Text>
        </Grid>

        <Divider orientation="vertical">Это один</Divider>

        <Grid templateColumns="1fr 1fr" gap="small">
          <Text color="secondary">Название фонда</Text>
          <Text>Альфа инвестици</Text>
          <Text color="secondary">Наименование управляющей компании Фонда</Text>
          <Text>Альфа капитал</Text>
          <Text color="secondary">
            Наименование специализированного депозитария Фонда
          </Text>
          <Text>Инфинитум</Text>
        </Grid>

        <Divider orientation="vertical">Это два</Divider>

        <Grid templateColumns="1fr 1fr" gap="small">
          <Text color="secondary">
            Общее количество голосов, принадлежащих владельцам инвестиционных
            паев, имеющим право на участие в голосовании
          </Text>
          <Text>10000</Text>
          <Text color="secondary">
            Общее количество голосов, которыми обладали владельцы инвестиционных
            паев, принявшие участие в голосовании
          </Text>
          <Text>500</Text>
          <Text color="secondary">Кворум</Text>
          <Text>60%</Text>
        </Grid>
      </Grid>
    )
  }
}
