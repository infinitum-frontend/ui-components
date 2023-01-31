import { StoryFn, Meta } from '@storybook/react'
import { List } from './index'
import ListItem from './components/ListItem'
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
  component: List
}

export default meta

const Template: StoryFn<typeof List> = (args) => {
  return (
    <List as={'ul'} {...args}>
      {ListBase.map((item, index) => (
        <ListItem key={index} as={'li'}>
          {item.text}
        </ListItem>
      ))}
    </List>
  )
}

export const Playground = Template.bind({})

export const WithActionButton: StoryFn<typeof List> = (args) => {
  return (
    <List style={{ width: '350px' }}>
      {ListBase.map((item) => (
        <ListItem key={item.text}>
          <ListItem.Content>
            <Text size={'small'}>{item.text}</Text>
          </ListItem.Content>
          <ListItem.Button>
            <ClearIcon style={{ color: '#F53A3A' }} />
          </ListItem.Button>
        </ListItem>
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
        <ListItem disabled={Boolean(item.disabled)} key={item.statusText}>
          <ListItem.Icon>
            <CaseIcon />
          </ListItem.Icon>
          <ListItem.Content>
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
          </ListItem.Content>
        </ListItem>
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
            <ListItem key={subitem.text}>
              <ListItem.Content>{subitem.text}</ListItem.Content>
              <ListItem.Button>
                <Checkbox checked={subitem.selected} />
              </ListItem.Button>
            </ListItem>
          ))}
        </List>
      )
    )
  }
  return (
    <List style={{ width: '450px' }}>
      {ListWithNestedSelection.map((item, key) => (
        <ListItem
          key={key}
          collapsible={true}
          collapsedContent={getCollapsedContent(item)}
        >
          <ListItem.Content>{item.text}</ListItem.Content>
          <ListItem.Button>
            <Checkbox
              checked={item.selected}
              indeterminate={Boolean(
                item.subitems?.find((item) => item.selected)
              )}
            />
          </ListItem.Button>
        </ListItem>
      ))}
    </List>
  )
}

export const Scrollable: StoryFn<typeof List> = (args) => {
  return (
    <List maxHeight={150}>
      {BaseListLong.map((item) => (
        <ListItem key={item.text}>{item.text}</ListItem>
      ))}
    </List>
  )
}
