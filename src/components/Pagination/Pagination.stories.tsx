// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Pagination } from './index'

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
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

export const Playground = {
  render: Template,

  args: {
    totalCount: 100,
    pageSize: 10
  }
}

export const FewPages = {
  render: Template,

  args: {
    totalCount: 30,
    pageSize: 10
  }
}

export const ShowFirstLast = {
  render: Template,

  args: {
    totalCount: 30,
    pageSize: 10,
    showFirstLast: true
  }
}

export const ManyPages = {
  render: Template,

  args: {
    totalCount: 1000,
    pageSize: 10,
    showFirstLast: true
  }
}

export const Disabled = {
  render: Template,

  args: {
    totalCount: 50,
    pageSize: 10,
    disabled: true
  }
}

export const ItemsRange = {
  render: Template,

  args: {
    totalCount: 1000,
    pageSize: 10,
    showFirstLast: true,
    showOverflowDots: true,
    showItemsRange: true
  }
}

export const CustomPageSizeOptions = {
  render: () => {
    const PAGE_SIZE = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [currentPageSize, setCurrentPageSize] = useState(PAGE_SIZE)

    return (
      <>
        <Pagination
          totalCount={1000}
          pageSize={currentPageSize}
          showFirstLast={true}
          showItemsRange={true}
          pageSizeOptions={[10, 20, 50, 100, 500]}
          onPageSizeChange={(newPageSize: number) => {
            setCurrentPage(1)
            setCurrentPageSize(newPageSize)
            console.log('Page size changed to:', newPageSize)
          }}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <div style={{ marginTop: '8px' }}>Page: {currentPage}</div>
      </>
    )
  }
}
