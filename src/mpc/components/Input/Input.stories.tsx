import { StoryFn, Meta } from '@storybook/react'
// @ts-expect-error
import styles from './Input.module.css'
import cn from 'classnames'

const meta: Meta<any> = {
  title: 'MPC/Input'
}

export default meta

const Template: StoryFn<any> = (args) => {
  return <input className={cn(styles.inputReset, styles.textInput)} />
}

export const Playground = Template.bind({})
