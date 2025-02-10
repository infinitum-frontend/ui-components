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
      { label: 'Спецдепозитарные услуги 2', value: 'two-two' },
      { label: 'Спецдепозитарные услуги 3', value: 'two-three' }
    ]
  },
  {
    label: 'Консалтинг и аутсорсин',
    options: [{ label: 'Консалтинг и аутсорсин 1', value: 'three-one' }]
  },
  { label: 'Другое', value: 'four' }
]
