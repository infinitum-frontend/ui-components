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
  totalCount: 100,
  pageSize: 10
}

export const FewPages = Template.bind({})
FewPages.args = {
  totalCount: 30,
  pageSize: 10
}

export const Disabled = Template.bind({})
Disabled.args = {
  totalCount: 50,
  pageSize: 10,
  disabled: true
}

export const PrevNextVariant = Template.bind({})
PrevNextVariant.args = {
  totalCount: 50,
  pageSize: 10,
  variant: 'prev-next'
}
