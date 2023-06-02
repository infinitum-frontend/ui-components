// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FormEventHandler, useState } from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Form } from './index'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Input, maskInput } from '../Input'
import { Select } from '../Select'
import { Radio, RadioGroup } from '../Radio'
import { Textarea } from '../Textarea'
import { Switch } from '../Switch'
import { Autocomplete } from '../Autocomplete'
import { AutocompleteBaseOptions } from '../Autocomplete/fixtures'

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

const Template: StoryFn<typeof Form> = (args) => {
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
      <Form.Group>
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

export const Playground = {
  render: Template
}

export const WithNativeValidation: StoryObj<typeof Form> = {
  render: (args) => {
    const [comment, setComment] = useState<string>('')
    const [restrictionType, setRestrictionType] = useState<string>('')
    const [fullName, setFullName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [entityType, setEntityType] = useState<string>('')
    const [serviceType, setServiceType] = useState<string | number>('')
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
          <Form.Group
            direction={'horizontal'}
            required
            invalidMessage={'5 цифр без пробелов'}
          >
            <Form.Label>ФИО</Form.Label>
            <Form.Item>
              <Input
                value={fullName}
                title={'5 цифр без пробелов'}
                pattern="[0-9]{5}"
                onInput={(value) => setFullName(value)}
              />
            </Form.Item>
            <Form.Hint>5 цифр без пробелов</Form.Hint>
          </Form.Group>

          <Form.Group direction={'horizontal'} required>
            <Form.Label>Номер телефона</Form.Label>
            <Form.Item>
              <Input
                name="phone"
                placeholder="+7(999) 999-99-99"
                type="tel"
                formatter={(value) => maskInput(value, 'phone')}
                minLength={18}
                value={phone}
                onInput={(value) => setPhone(value)}
              />
            </Form.Item>
          </Form.Group>

          <Form.Group direction={'horizontal'} required>
            <Form.Label>Вид сущности</Form.Label>
            <Form.Item>
              <Select
                value={entityType}
                onChange={(option) => setEntityType(option.value as string)}
                options={[
                  { label: 'Акции', value: '1' },
                  { label: 'Облигации', value: '2' }
                ]}
              />
            </Form.Item>
          </Form.Group>

          <Form.Group direction={'horizontal'} required>
            <Form.Label>Вид услуги</Form.Label>
            <Form.Item>
              <Autocomplete
                onChange={(value) => setServiceType(value)}
                options={AutocompleteBaseOptions}
                selectedValue={serviceType}
              />
            </Form.Item>
          </Form.Group>

          <Form.Group direction={'horizontal'} required>
            <Form.Label>Комментарий в ТЗ</Form.Label>
            <Form.Item>
              <Textarea
                resize={'vertical'}
                maxLength={10}
                value={comment}
                onInput={(value) => setComment(value)}
              />
            </Form.Item>
            <Form.Hint>Комментарий виден только сотрудникам</Form.Hint>
          </Form.Group>

          <Form.Group direction={'horizontal'} required>
            <Form.Label>Счёт депо</Form.Label>
            <Form.Item>
              <Checkbox>Использовать для отбора счёт депо</Checkbox>
            </Form.Item>
          </Form.Group>

          <Form.Group direction={'horizontal'} required>
            <Form.Label>Ограничение в обороте</Form.Label>
            <Form.Item>
              <RadioGroup
                name={'restrictions'}
                value={restrictionType}
                onChange={(value) => setRestrictionType(value)}
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
}
