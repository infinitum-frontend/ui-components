// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Grid } from './index'
import { Meta, StoryFn } from '@storybook/react'
import { Box } from 'Components/Box'

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
