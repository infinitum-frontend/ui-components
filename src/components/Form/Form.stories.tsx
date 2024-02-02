// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FormEventHandler, useState } from 'react'
import { StoryObj, StoryFn, Meta } from '@storybook/react'
import { Form } from './index'
import { Button } from '../Button'
import { Checkbox } from '../Checkbox'
import { Input, MaskedInput } from '../Input'
import { Select } from '../Select'
import { Radio } from '../Radio'
import { Textarea } from '../Textarea'
import { Switch } from '../Switch'
import { Space } from '../Space'
import { Autocomplete } from '../Autocomplete'
import { AutocompleteBaseOptions } from '../Autocomplete/fixtures'
import { Combobox } from '../Combobox'

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
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleInput = (value: string): void => {
    setName(value)

    if (value) {
      setError('')
    }
  }

  const handleSubmit: FormEventHandler = (e): void => {
    alert('Форма успешно отправлена')
  }

  const handleSubmitWithCustomValidation = (): void => {
    if (!name.length) {
      setError('Поле email должно быть заполнено!')
      return
    } else if (name.length < 5) {
      setError('Поле email должно содержать не менее 5 символов!')
      return
    }

    alert('Форма успешно отправлена')
  }

  return (
    <Space gap="xxlarge">
      <div>
        <code style={{ display: 'block', marginBottom: '12px' }}>
          Базовый случай - валидация отсутствует
        </code>
        <Form {...args} onSubmit={handleSubmit} labelWidth="150px">
          <Form.Group>
            <Form.Label>Имя</Form.Label>
            <Input value={name} onInput={handleInput} />
          </Form.Group>
          <Button type={'submit'}>Отправить</Button>
        </Form>
      </div>

      <div>
        <code style={{ display: 'block', marginBottom: '12px' }}>
          Валидируемая форма. В качестве сообщения об ошибке используется
          нативное сообщение. Для установки обязательности используется проп{' '}
          <i>required</i> на компоненте Form.Group. Он сделает инпут
          обязательным, добавит индикатор для лейбла, а также автоматически
          будет отображать сообщения об ошибках, возникших отправке некорректно
          заполненной формы. Для установки правил используются нативные способы,
          такие как minlength, pattern и так далее.
        </code>
        <Form {...args} onSubmit={handleSubmit} labelWidth="150px">
          <Form.Group required>
            <Form.Label>Имя</Form.Label>
            <Input minLength={5} value={name} onInput={handleInput} />
          </Form.Group>
          <Button type={'submit'}>Отправить</Button>
        </Form>
      </div>

      <div>
        <code style={{ display: 'block', marginBottom: '12px' }}>
          Форма, валидируемая вручную - допустим, нативные возможности нас не
          устраивают и хотим сделать все сами. Для этого добавляем лейблу
          свойства <i>showRequiredIndicator</i> для отображения индикатора.
          Создаем стейт с ошибками, заполняем его при попытке отправить форму и
          отображаем ошибки с помощью компонента Form.ErrorMessage
        </code>
        <Form
          {...args}
          onSubmit={handleSubmitWithCustomValidation}
          labelWidth="150px"
        >
          <Form.Group>
            <Form.Label showRequiredIndicator>Имя</Form.Label>
            <Input value={name} onInput={handleInput} />
            {error && <Form.ErrorMessage>{error}</Form.ErrorMessage>}
          </Form.Group>
          <Button type={'submit'}>Отправить</Button>
        </Form>
      </div>
    </Space>
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
    const [comboboxState, setComboboxState] = useState<string[]>([])

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
        <Form {...args} onSubmit={handleSubmit} labelWidth="200px">
          <Form.Group
            direction={'horizontal'}
            required
            customValidationMessage={'5 цифр без пробелов'}
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
          </Form.Group>

          <Form.Group direction={'horizontal'} required>
            <Form.Label>Номер телефона</Form.Label>
            <Form.Item>
              <MaskedInput mask="phone" value={phone} onComplete={setPhone} />
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

          <Form.Group required direction="horizontal">
            <Form.Label>Вид услуги 2</Form.Label>
            <Combobox
              checkedList={comboboxState}
              // @ts-expect-error
              onChange={setComboboxState}
              options={AutocompleteBaseOptions}
            />
          </Form.Group>

          <Form.Group direction={'horizontal'} required>
            <Form.Label>Комментарий в ТЗ</Form.Label>
            <Textarea
              resize={'vertical'}
              minLength={5}
              maxLength={10}
              value={comment}
              onInput={(value) => setComment(value)}
            />
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
              <Radio.Group
                name={'restrictions'}
                value={restrictionType}
                onChange={(value) => setRestrictionType(value)}
              >
                <Radio value={'1'}>Ограничено</Radio>
                <Radio value={'2'}>Не ограничено</Radio>
                <Radio value={'3'}>Не указано</Radio>
              </Radio.Group>
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
