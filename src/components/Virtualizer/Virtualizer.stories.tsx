// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { StoryObj, Meta } from '@storybook/react'
import { Text } from '../Text'
import Virtualizer from './Virtualizer'

const ComponentMeta: Meta<typeof Virtualizer> = {
  title: 'components/Virtualizer',
  component: Virtualizer,
  parameters: {
    layout: 'fullscreen'
  }
}

export default ComponentMeta

const elements = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  name:
    i % 2 === 0
      ? ` Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi
            doloribus, excepturi cupiditate quos porro recusandae sed iure ut
            nam nulla modi beatae nobis distinctio, tenetur, pariatur eos
            adipisci odit vitae veniam delectus quidem reiciendis voluptates
            exercitationem voluptatum. Obcaecati itaque libero in ipsum alias
            dolores praesentium soluta eum vitae tenetur impedit voluptatem
            earum doloremque, fugit eos quia cum quo necessitatibus voluptatibus
            et asperiores? Maiores, nisi! Magnam, dolores vitae? Unde deleniti
            autem consequatur dolore voluptatum quisquam, magni quia vel
            reiciendis pariatur quod aliquam iusto tenetur incidunt fugit
            exercitationem quos sed eius itaque laboriosam? Dolor nihil itaque
            iusto eum ad sapiente eligendi eos. ${i}`
      : `fugit eos quia cum quo necessitatibus voluptatibus ${i}`,
  color: i % 2 === 0 ? 'success' : 'error'
}))

export const Playground: StoryObj<typeof Virtualizer> = {
  render: ({ ...args }) => {
    return (
      <Virtualizer
        count={elements.length}
        estimateSize={() => 100}
        overscan={5}
        maxHeight="300px"
        renderRow={(virtualItem) => {
          const { index } = virtualItem
          return (
            <Text
              style={{
                backgroundColor:
                  elements[index].color === 'success'
                    ? 'var(--inf-color-background-tertiary)'
                    : 'var(--inf-color-background-primary)'
              }}
            >
              {elements[index].name}
            </Text>
          )
        }}
      />
    )
  }
}
