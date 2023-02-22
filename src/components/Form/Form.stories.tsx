// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FormEventHandler, useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Form } from './index'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Input } from '../Input'
import { Select } from '../Select'
import { Radio, RadioGroup } from '../Radio'
import { Textarea } from '../Textarea'
import { Switch } from '../Switch'

const meta: Meta<typeof Form> = {
  title: 'Form/Form',
  component: Form,
  subcomponents: {
    'Form.Group': Form.Group,
    'Form.Label': Form.Label,
    'Form.Hint': Form.Hint,
    'Form.Item': Form.Item,
    'Form.ErrorMessage': Form.ErrorMessage
  }
}

export default meta

const Template: StoryFn<typeof Form> = (args, subArgs) => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState<boolean>(true)

  const handleInput = (value: string): void => {
    setEmail(value)
    setEmailError(false)
  }

  const handleSubmit: FormEventHandler = (e): void => {
    if (!email.length) {
      setEmailError(true)
    } else {
      alert('submit')
    }
  }

  return (
    <Form {...args} onSubmit={handleSubmit} labelWidth={'150px'}>
      <Form.Group gap={'xsmall'} isRequired={true}>
        <Form.Label>Email</Form.Label>
        <Form.Item>
          <Input
            value={email}
            onInput={handleInput}
            status={emailError ? 'error' : undefined}
          />
        </Form.Item>

        {emailError ? (
          <Form.ErrorMessage>
            Введен невалидный почтовый адрес
          </Form.ErrorMessage>
        ) : (
          <Form.Hint>Обязательное поле</Form.Hint>
        )}
      </Form.Group>
      <Button type={'submit'}>Отправить</Button>
    </Form>
  )
}

export const Playground = Template.bind({})

export const WithNativeValidation: StoryFn<typeof Form> = (args) => {
  const [comment, setComment] = useState<string>('')
  const [restrictionType, setRestrictionType] = useState<string>('')
  const [fullName, setFullName] = useState<string>('')
  const [entityType, setEntityType] = useState<string>('')
  const [subscription, setSubscription] = useState<boolean>(false)

  const handleSubmit: FormEventHandler = (e): void => {
    alert('submit')
  }

  return (
    <>
      <code style={{ display: 'block', marginBottom: '12px' }}>
        Есть возможность использовать нативную валидацию. Работает для
        компонентов Input, Textarea, Switch, Select, Radio(для RadioGroup есть
        также проп required, обрабатывающий вложенные радиокнопки), Checkbox
      </code>
      <Form {...args} onSubmit={handleSubmit} labelWidth={'200px'}>
        <Form.Group direction={'horizontal'}>
          <Form.Label>ФИО</Form.Label>
          <Form.Item>
            <Input
              required={true}
              value={fullName}
              onInput={(value) => setFullName(value)}
              minLength={6}
            />
          </Form.Item>
        </Form.Group>

        <Form.Group direction={'horizontal'}>
          <Form.Label>Вид сущности</Form.Label>
          <Form.Item>
            <Select
              required={true}
              value={entityType}
              onChange={(option) => setEntityType(option.value as string)}
              options={[
                { label: 'Акции', value: '1' },
                { label: 'Облигации', value: '2' }
              ]}
            />
          </Form.Item>
        </Form.Group>

        <Form.Group direction={'horizontal'}>
          <Form.Label>Комментарий в ТЗ</Form.Label>
          <Form.Item>
            <Textarea
              resize={'vertical'}
              required={true}
              maxLength={10}
              value={comment}
              onInput={(value) => setComment(value)}
            />
          </Form.Item>
          <Form.Hint>Комментарий виден только сотрудникам</Form.Hint>
        </Form.Group>

        <Form.Group direction={'horizontal'}>
          <Form.Label>Счёт депо</Form.Label>
          <Form.Item>
            <Checkbox required={true}>
              Использовать для отбора счёт депо
            </Checkbox>
          </Form.Item>
        </Form.Group>

        <Form.Group direction={'horizontal'}>
          <Form.Label>Ограничение в обороте</Form.Label>
          <Form.Item>
            <RadioGroup
              name={'restrictions'}
              value={restrictionType}
              onChange={(value) => setRestrictionType(value)}
              required={true}
            >
              <Radio value={'1'}>Ограничено</Radio>
              <Radio value={'2'}>Не ограничено</Radio>
              <Radio value={'3'}>Не указано</Radio>
            </RadioGroup>
          </Form.Item>
        </Form.Group>

        <Form.Group direction={'horizontal'}>
          <Form.Label>Получать уведомления на почту</Form.Label>
          <Form.Item>
            <Switch
              checked={subscription}
              onChange={(checked) => setSubscription(Boolean(checked))}
            />
          </Form.Item>
        </Form.Group>

        <Button type={'submit'}>Подтвердить</Button>
      </Form>
    </>
  )
}
