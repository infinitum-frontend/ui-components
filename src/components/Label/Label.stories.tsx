// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Label, LabelProps } from './index'
import { Space } from '../Space'
import { Grid } from '../Grid'
import IconBxFilter from 'Icons/bx-filter.svg?react'
import { Tooltip } from '../Tooltip'
import { Card } from '../Card'

const variants = [
  'info',
  'error',
  'success',
  'warning',
  'neutral',
  'brand',
  'violet',
  'teal'
] as Array<LabelProps['variant']>

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label
}

export default meta

const Template: StoryFn<typeof Label> = (args) => <Label {...args} />

export const Playground = {
  render: Template,

  args: {
    children: 'Состояние контроля'
  }
}

export const Variants = {
  render: () => {
    return (
      <Grid templateColumns="150px 150px">
        <Space>
          {variants.map((variant, index) => (
            <Label variant={variant} key={index} tone="heavy">
              {variant}
            </Label>
          ))}
        </Space>
        <Space>
          {variants.map((variant, index) => (
            <Label variant={variant} key={index} tone="light">
              {variant}
            </Label>
          ))}
        </Space>
      </Grid>
    )
  }
}

export const VariantsWithInitialIcons = {
  render: () => {
    return (
      <Grid templateColumns="150px 150px">
        <Space>
          {variants.map((variant, index) => (
            <Label variant={variant} key={index} tone="heavy" withIcon>
              {variant}
            </Label>
          ))}
        </Space>
        <Space>
          {variants.map((variant, index) => (
            <Label variant={variant} key={index} tone="light" withIcon>
              {variant}
            </Label>
          ))}
        </Space>
      </Grid>
    )
  }
}

export const IconOnly = {
  render: Template,

  args: {
    before: <IconBxFilter />
  }
}

export const LabelWithTooltip = {
  render: () => {
    return (
      <Tooltip content="А это подсказка">
        <Label variant="success" withIcon>
          Это лейбл
        </Label>
      </Tooltip>
    )
  }
}

export const Overflow = {
  render: () => {
    return (
      <Space>
        <Card size="small" style={{ width: '400px' }}>
          <Label variant="success">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            aperiam deleniti eius quasi sint numquam cumque quos, in
            necessitatibus consequatur!
          </Label>
        </Card>

        <Label variant="success">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
          aperiam deleniti eius quasi sint numquam cumque quos, in
          necessitatibus consequatur!
        </Label>
      </Space>
    )
  }
}
