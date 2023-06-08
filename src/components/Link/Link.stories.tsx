// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Link } from './index'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

const ComponentMeta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  args: {
    children: 'Ссылка',
    as: 'a',
    href: 'javascript:void(0);'
  }
}

export default ComponentMeta

const Template: StoryFn<typeof Link> = ({ ...args }) => <Link {...args} />

export const Playground = {
  render: Template
}

export const InText: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div>
        Lorem ipsum dolor sit amet{' '}
        <Link as="a" href="javascript:void(0);">
          consectetur
        </Link>
        , adipisicing elit. Fugiat consectetur quisquam, perspiciatis asperiores
        iure assumenda! Nihil necessitatibus quo doloremque similique deserunt
        iure eligendi adipisci! Molestias iure aperiam pariatur voluptatibus,
        doloremque voluptatum rem provident quidem quis et libero reprehenderit
        delectus earum adipisci, tempore quod? Eligendi accusantium similique,
        asperiores eius rerum officiis blanditiis ipsa aut vel earum amet
        exercitationem soluta iusto adipisci, beatae doloremque, facilis
        consectetur? Temporibus itaque dolorum numquam quis commodi accusantium
        corporis! Nulla et eum libero perspiciatis. Vero aperiam, earum quis
        saepe delectus cupiditate fugit dolor aspernatur expedita sed itaque,
        totam illo, harum obcaecati. Modi optio iste porro commodi laboriosam!
      </div>
    )
  }
}
