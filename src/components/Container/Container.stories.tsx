// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Container } from './index'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container
}

export default meta

const Template: StoryFn<typeof Container> = (args) => {
  return (
    <Container {...args}>
      <div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea maiores
        fugit neque exercitationem, doloribus eius quod dolores placeat sit
        perferendis sint! Autem maiores labore magni voluptatum, quidem tempore
        dolorum aliquam ipsam laboriosam esse, consequuntur, porro obcaecati
        possimus doloribus deleniti atque minus quia fugit a quisquam laudantium
        officiis cumque! Nemo maxime nam aut obcaecati. Quisquam culpa ducimus
        perferendis dolore tempora. Tempore eius laudantium mollitia aliquid
        omnis, temporibus similique repellat. Quo necessitatibus dolore eligendi
        aperiam sint quos minima facilis ex eum vel earum magnam qui mollitia
        harum commodi, voluptatem, a, voluptate quod hic illo libero! Alias
        similique expedita fuga magnam reiciendis rem ratione magni fugit. Sequi
        sed sit, placeat consequuntur tempore in quibusdam, itaque minus autem
        assumenda cupiditate quae provident impedit pariatur sapiente ab, vitae
        excepturi ipsa. Facilis, aut accusantium. Distinctio, harum dolor?
        Accusamus molestiae eligendi modi optio dolores perferendis saepe,
        consequuntur, hic repellat perspiciatis ullam, fugit non inventore
        cupiditate mollitia possimus? Harum eius deserunt pariatur nisi odit
        soluta dolorum doloribus. Minima officia praesentium mollitia maxime rem
        alias suscipit dolore quos illum exercitationem pariatur esse eaque
        voluptate maiores, laborum vitae, fuga voluptas. Optio maxime tempore
        blanditiis perspiciatis, dolor nulla ad ea facere aliquam voluptate
        veniam, at earum quas minima culpa officia distinctio itaque ullam autem
        quaerat rem praesentium eligendi velit temporibus? Ad autem consectetur
        delectus officia inventore nisi vero ducimus architecto asperiores.
        Rerum laboriosam similique saepe blanditiis provident ipsam, doloremque
        sed odio. Quos iure dolor architecto voluptatem a fugit temporibus,
        veniam atque porro aliquid asperiores similique, exercitationem
        molestiae earum aperiam at doloremque! Minus rerum explicabo, hic cum
        accusamus sunt unde tempora aliquid? Nemo natus dolorem, quibusdam
        necessitatibus omnis ea hic. Magnam expedita dignissimos at minus et
        voluptatum totam dicta, itaque culpa doloribus aut sed maiores optio
        aperiam tempora impedit facilis repudiandae eaque illo rerum distinctio
        quo hic accusantium! Voluptatum corporis atque quis neque qui assumenda
        consequuntur, iusto veritatis animi commodi, esse soluta veniam quae
        nulla odit suscipit provident minus ad modi hic. Vel quis nisi numquam?
        Excepturi nam ex doloribus ipsum rem totam ducimus quos, impedit ratione
        explicabo provident molestias corrupti officiis dolorum blanditiis
        tempora voluptates esse laborum, sint nihil aliquam iusto iste.
        Inventore enim culpa exercitationem, placeat alias totam ipsa est,
        veniam repellendus ad qui quaerat deserunt illum dolores modi labore
        minima architecto consectetur eligendi dicta! Tempora optio pariatur cum
        vero, expedita placeat similique quam porro dolor exercitationem modi
        minima, quisquam quod voluptatem et sequi accusamus at maiores facere
        facilis, consequuntur mollitia doloremque maxime temporibus? Corrupti
        architecto itaque accusantium aut accusamus enim amet quibusdam impedit
        nulla velit magnam eaque eius ipsa quis, dolor nesciunt aliquam iusto
        dolorum labore voluptatibus quisquam. Repellendus officiis ipsam quod
        eveniet eos quasi, consequatur aspernatur veritatis quidem reiciendis
        facere eaque sit quo molestiae nobis ullam deserunt neque nam aperiam
        aliquam rem? Totam praesentium vero temporibus debitis harum id fuga
        ipsa quia. Ad maxime numquam distinctio ut id omnis accusamus quis ullam
        debitis obcaecati voluptas harum aliquam, nostrum voluptates iusto qui
        aliquid quam illum iste velit quidem? Expedita odit praesentium iure
        dolore eligendi, ad assumenda quas veritatis dolores.
      </div>
    </Container>
  )
}
export const Playground = Template.bind({})
Playground.parameters = {
  layout: 'fullscreen'
}

export const Fluid = Template.bind({})
Fluid.args = {
  fluid: true
}
Fluid.parameters = {
  layout: 'fullscreen'
}
