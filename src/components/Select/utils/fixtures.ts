// export const SelectBaseOptions = [
//   { label: 'Депозитарные услуги', value: 'one' },
//   { label: 'Очень длинные спецдепозитарные услуги', value: 'two' },
//   { label: 'Консалтинг и аутсорсинг', value: 'three' }
// ]

export const SelectBaseOptions = [
  { label: 'Депозитарные услуги', value: 0 },
  { label: 'Спецдепозитарные услуги', value: 1 },
  { label: 'Консалтинг и аутсорсинг', value: 2 }
]

export const SelectBaseGroupedOptions = [
  { label: 'Депозитарные услуги', value: 'one' },
  {
    label: 'Спецдепозитарные услуги',
    options: [
      { label: 'Спецдепозитарные услуги 1', value: 'two-one' },
      { label: 'Очень длинные спецдепозитарные услуги 2', value: 'two-two' },
      { label: 'Спецдепозитарные услуги 3', value: 'two-three' }
    ]
  },
  {
    label: 'Консалтинг и аутсорсинг',
    options: [{ label: 'Консалтинг и аутсорсинг 1', value: 'three-one' }]
  }
]

export const SelectLongOptions = [
  { label: 'Депозитарные услуги', value: 'one' },
  { label: 'Очень длинные спецдепозитарные услуги', value: 'two' },
  { label: 'Консалтинг и аутсорсинг', value: 'three' },
  { label: 'Консалтинг и аутсорсинг 2', value: 'four' },
  { label: 'Консалтинг и аутсорсинг 3', value: 'five' },
  { label: 'Консалтинг и аутсорсинг 4', value: 'six' },
  { label: 'Консалтинг и аутсорсинг 5', value: 'sevent' },
  { label: 'Консалтинг и аутсорсинг 6', value: 'eight' },
  { label: 'Консалтинг и аутсорсинг 7', value: 'nine' },
  { label: 'Консалтинг и аутсорсинг 8', value: 'ten' }
]

export const SelectOptionsUnformatted = [
  { text: 'Депозитарные услуги', id: 0 },
  { text: 'Спецдепозитарные услуги', id: 1 },
  { text: 'Консалтинг и аутсорсинг', id: 2 }
]

export const SelectOptionsWithExtraKeys = [
  { text: 'Депозитарные услуги', id: 0, subtext: 'Subtext' },
  { text: 'Спецдепозитарные услуги', id: 1, subtext: 'Subtext' },
  { text: 'Консалтинг и аутсорсинг', id: 2, subtext: 'Subtext' }
]

export const SelectOptionsRawLong = [
  {
    id: '1',
    name: 'Ошибка доставки'
  },
  {
    id: '2',
    name: 'На отправке'
  },
  {
    id: '3',
    name: 'Доставлен'
  },
  {
    id: '4',
    name: 'Получен'
  },
  {
    id: '5',
    name: 'Ошибка в обработке'
  },
  {
    id: '6',
    name: 'Отправлен'
  },
  {
    id: '7',
    name: 'Отказано в обработке'
  },
  {
    id: '8',
    name: 'Сохранено'
  }
]
