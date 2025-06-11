// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { Link } from './index'
import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { IconAdd01 } from '@infinitum-ui/icons'
import { Space } from '../Space'

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

export const Long: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <div style={{ width: '100px' }}>
        <Link as="a" href="javascript:void(0);" multiline>
          Lorem ipsum dolor sit amet consectetur , adipisicing elit. Fugiat
          consectetur quisquam, perspiciatis asperiores iure assumenda! Nihil
          necessitatibus quo doloremque similique deserunt iure eligendi
          adipisci! Molestias iure aperiam pariatur voluptatibus, doloremque
          voluptatum rem provident quidem quis et libero reprehenderit delectus
          earum adipisci, tempore quod?
        </Link>
      </div>
    )
  }
}

export const PrefixSuffix: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <Space>
        <Link as="a" prefix>
          Prefix
        </Link>
        <Link as="a" suffix>
          Suffix
        </Link>
        <Link as="a" prefix={<IconAdd01 />}>
          Custom Prefix
        </Link>
        <Link as="a" suffix={<IconAdd01 />}>
          Custom Suffix
        </Link>
        <Link as="a" prefix suffix>
          Prefix+Suffix
        </Link>
      </Space>
    )
  }
}

export const LinkButton: StoryObj<typeof Link> = {
  render: (args) => {
    return (
      <Space>
        <Link as="button" onClick={() => alert('click')}>
          Link Button
        </Link>
        <Link as="button" type="submit" onClick={() => alert('submit')}>
          Link Button Submit
        </Link>
        <Link as="button" suffix={<IconAdd01 />} onClick={() => alert('click')}>
          Link Button Custom Icon
        </Link>
      </Space>
    )
  }
}
