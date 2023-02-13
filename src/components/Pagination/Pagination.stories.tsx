// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Pagination } from './index'

const meta: Meta<typeof Pagination> = {
  title: 'Pagination',
  component: Pagination
}

export default meta

const Template: StoryFn<typeof Pagination> = (args) => {
  const [currentPage, setCurrentPage] = useState(1)
  return (
    <>
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <div style={{ marginTop: '8px' }}>Page: {currentPage}</div>
    </>
  )
}
export const Playground = Template.bind({})
Playground.args = {
  totalCount: 50,
  pageSize: 10
}

export const OnlyOnePage = Template.bind({})
OnlyOnePage.args = {
  totalCount: 10,
  pageSize: 10
}

export const Disabled = Template.bind({})
Disabled.args = {
  totalCount: 50,
  pageSize: 10,
  disabled: true
}
