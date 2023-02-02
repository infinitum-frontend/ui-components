import { StoryFn, Meta } from '@storybook/react'
import { List } from './index'
import { Checkbox } from '../Checkbox'
// @ts-expect-error
import { ReactComponent as CaseIcon } from 'Icons/case.svg'
// @ts-expect-error
import { ReactComponent as ClearIcon } from 'Icons/clear-button.svg'
import { Space } from '../Space'
import { Text } from '../Text'
import {
  BaseListLong,
  ListBase,
  ListWithNestedSelection,
  ListWithStatuses
} from './example'
import { TextProps } from '../Text/Text'
import { ReactNode } from 'react'

const meta: Meta<typeof List> = {
  title: 'List',
  component: List,
  subcomponents: {
    'List.Item': List.Item,
    'List.Item.Icon': List.Item.Icon,
    'List.Item.Content': List.Item.Content,
    'List.Item.Button': List.Item.Button
  }
  // parameters: {
  //   docs: {
  //     page: Docs
  //   }
  // }
}

export default meta

const Template: StoryFn<typeof List> = (args) => {
  return (
    <List {...args}>
      {ListBase.map((item, index) => (
        <List.Item key={index}>{item.text}</List.Item>
      ))}
    </List>
  )
}

export const Playground = Template.bind({})

export const RawList = Template.bind({})
RawList.args = { raw: true }

export const WithActionButton: StoryFn<typeof List> = (args) => {
  return (
    <List style={{ width: '350px' }}>
      {ListBase.map((item) => (
        <List.Item key={item.text}>
          <List.Item.Content>
            <Text size={'small'}>{item.text}</Text>
          </List.Item.Content>
          <List.Item.Button>
            <ClearIcon style={{ color: '#F53A3A' }} />
          </List.Item.Button>
        </List.Item>
      ))}
    </List>
  )
}

export const WithIcon: StoryFn<typeof List> = (args) => {
  const getTextToneByStatus = (status: string): TextProps['tone'] => {
    switch (status) {
      case 'error':
        return 'danger'
      case 'success':
        return 'success'
      default:
        return 'quaternary'
    }
  }
  return (
    <List>
      {ListWithStatuses.map((item) => (
        <List.Item disabled={Boolean(item.disabled)} key={item.statusText}>
          <List.Item.Icon>
            <CaseIcon />
          </List.Item.Icon>
          <List.Item.Content>
            <Space gap={'xxsmall'}>
              <Text size={'small'}>{item.name}</Text>
              <Space gap={'xxsmall'} direction={'horizontal'}>
                <Text tone={getTextToneByStatus(item.status)}>
                  {item.statusText}
                </Text>
                {item.additionalInfo && (
                  <Text tone={'secondary'}>{item.additionalInfo}</Text>
                )}
              </Space>
            </Space>
          </List.Item.Content>
        </List.Item>
      ))}
    </List>
  )
}

export const Nested: StoryFn<typeof List> = (args) => {
  const getCollapsedContent = (
    item: (typeof ListWithNestedSelection)[0]
  ): ReactNode => {
    return (
      Boolean(item.subitems) && (
        <List nested={true}>
          {item.subitems?.map((subitem) => (
            <List.Item key={subitem.text}>
              <List.Item.Content>{subitem.text}</List.Item.Content>
              <List.Item.Button>
                <Checkbox checked={subitem.selected} />
              </List.Item.Button>
            </List.Item>
          ))}
        </List>
      )
    )
  }
  return (
    <List style={{ width: '450px' }}>
      {ListWithNestedSelection.map((item, key) => (
        <List.Item
          key={key}
          collapsible={true}
          collapsedContent={getCollapsedContent(item)}
        >
          <List.Item.Content>{item.text}</List.Item.Content>
          <List.Item.Button>
            <Checkbox
              checked={item.selected}
              indeterminate={Boolean(
                item.subitems?.find((item) => item.selected)
              )}
            />
          </List.Item.Button>
        </List.Item>
      ))}
    </List>
  )
}

export const Scrollable: StoryFn<typeof List> = (args) => {
  return (
    <List maxHeight={150}>
      {BaseListLong.map((item) => (
        <List.Item key={item.text}>{item.text}</List.Item>
      ))}
    </List>
  )
}
