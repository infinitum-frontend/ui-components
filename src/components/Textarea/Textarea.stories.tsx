import { Meta, StoryFn } from '@storybook/react'
import { Button } from 'Components/Button'
import { Form } from 'Components/Form'
import { Icon } from 'Components/Icon'
import { Space } from 'Components/Space'
import StarIcon from 'Icons/star.svg?react'
import { useRef, useState } from 'react'
import { Textarea } from './index'

const LONG_TEXT =
  'Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании новых предложений. Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности в значительной степени обуславливает создание направлений прогрессивного развития. Идейные соображения высшего порядка, а также дальнейшее развитие различных форм деятельности требуют определения и уточнения дальнейших направлений развития. С другой стороны постоянный количественный рост и сфера нашей активности позволяет выполнять важные задания по разработке существенных финансовых и административных условий. С другой стороны консультация с широким активом требуют от нас анализа соответствующий условий активизации. Разнообразный и богатый опыт постоянный количественный рост и сфера нашей активности играет важную роль в формировании системы обучения кадров, соответствует насущным потребностям.'

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
  component: Textarea,
  args: {
    disabled: false
  },
  argTypes: {
    cols: {
      type: 'number'
    },
    rows: {
      type: 'number'
    },
    onBlur: {
      control: false
    }
  }
}

export default meta

const Template: StoryFn<typeof Textarea> = (args) => {
  const [value, setValue] = useState(args.value || '')

  return (
    <div style={{ maxWidth: '500px' }}>
      <Textarea
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </div>
  )
}

export const Playground = {
  render: Template
}

export const Disabled = {
  render: Template,
  args: { disabled: true }
}

export const ReadOnly = {
  render: Template,
  args: { readOnly: true, value: LONG_TEXT }
}

export const Error = {
  render: Template,
  args: { status: 'error' }
}

export const Rows = {
  render: Template,
  args: {
    rows: 5,
    value: LONG_TEXT
  }
}

export const Resizable = {
  render: Template,
  args: {
    resize: true,
    value: LONG_TEXT
  }
}

export const WithPrefix = {
  render: Template,
  args: {
    prefix: (
      <Icon color="primary" size="medium">
        <StarIcon />
      </Icon>
    ),
    value: LONG_TEXT
  }
}

export const Sizes = {
  render: () => {
    const [value1, setValue1] = useState('medium')
    const [value2, setValue2] = useState('small')

    return (
      <Space>
        <Textarea
          size="medium"
          value={value1}
          onChange={setValue1}
          prefix={
            <Icon color="primary" size="medium">
              <StarIcon />
            </Icon>
          }
        />
        <Textarea
          size="small"
          value={value2}
          onChange={setValue2}
          prefix={
            <Icon color="primary" size="medium">
              <StarIcon />
            </Icon>
          }
        />
      </Space>
    )
  }
}

export const FocusByRef = {
  render: () => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    return (
      <Space style={{ maxWidth: '500px' }}>
        <Textarea ref={textareaRef} />
        <Button
          onClick={() => {
            textareaRef.current?.focus()
          }}
        >
          Focus textarea
        </Button>
      </Space>
    )
  }
}

export const InFormRequired = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <Form style={{ maxWidth: '500px' }}>
        <Form.Group required>
          <Form.Label>Поле</Form.Label>
          <Textarea value={value} onChange={setValue} />
          <Form.Hint>Подсказка</Form.Hint>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    )
  }
}

// TODO:
// export const WithPostfix = {
//   render: Template,
//   args: {
//     postfix: (
//       <Icon color="primary" size="medium">
//         <StarIcon />
//       </Icon>
//     ),
//     value: LONG_TEXT
//   }
// }

// TODO:
// export const Clearable = {
//   render: () => {
//     const [value1, setValue1] = useState(
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, voluptatem?'
//     )
//     const [value2, setValue2] = useState(
//       'Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, voluptatem?'
//     )

//     return (
//       <Space style={{ maxWidth: '500px' }}>
//         <Textarea clearable value={value1} onChange={setValue1} />
//         <Space gap="xsmall">
//           Передан проп onClear
//           <Textarea
//             clearable
//             value={value2}
//             onChange={setValue2}
//             onClear={() => {
//               alert('Будет вызван onClear, но не onChange')
//             }}
//           />
//         </Space>
//       </Space>
//     )
//   }
// }
