export const SelectBaseOptions = [
  { label: 'Депозитарные услуги', value: 'one' },
  { label: 'Очень длинные спецдепозитарные услуги', value: 'two' },
  { label: 'Консалтинг и аутсорсинг', value: 'three' }
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
  },
  { label: 'Другое', value: 'four' }
]
