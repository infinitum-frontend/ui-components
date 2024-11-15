import { TableFilterSelectOption } from 'Components/Table/types'

export const TYPE_FILTER_ITEMS: TableFilterSelectOption[] = [
  {
    value: '-1',
    label: 'Все типы'
  },
  {
    value: '0',
    label: 'УВНР'
  },
  {
    value: '1',
    label: 'УВУН'
  },
  { value: '2', label: 'УВНУ' }
]

export interface Portfolio {
  portfolio: string
  mark: string
  type: string
  status: string
  date?: string
}

export const TABLE_DATA: Portfolio[] = [
  {
    portfolio: 'ОПИФ Открытие',
    mark: '2335',
    type: 'УВНР',
    status: 'Сформировано',
    date: '2024-10-31'
  },
  {
    portfolio:
      'ЗПИФ И Открытие — ИММВБ — высокая капитализация ОПИФ И Открытие — ИММВБ — высокая капитализация ОПИФ И Открытие — ИММВБ — высокая капитализация ОПИФ И Открытие — ИММВБ — высокая капитализация',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано'
  },
  {
    portfolio: 'Закрытие — Telecommunicaton Index',
    mark: '2206',
    type: 'УВУН',
    status: 'Сформировано',
    date: '2020-01-01'
  },
  {
    portfolio: 'ЯРА И Открытие — ИММВБ — машиностроение',
    mark: '2206',
    type: 'УВНУ',
    status: 'На согласовании'
  }
]

export interface NpfRule {
  id: number
  shortName: string
  type: string
  verificationAutomationDate: string | null
  portfoliosCount: number
  mandatoryAutoAssignmentSettings: any[]
}

export const NPF_RULES_TABLE_DATA: NpfRule[] = [
  {
    id: 1,
    shortName: 'Один',
    type: 'Контроль состава',
    portfoliosCount: 10,
    verificationAutomationDate: '2024-10-30',
    mandatoryAutoAssignmentSettings: []
  },
  {
    id: 2,
    shortName: 'Два',
    type: 'Контроль состава',
    portfoliosCount: 234,
    verificationAutomationDate: '2024-10-30',
    mandatoryAutoAssignmentSettings: []
  },
  {
    id: 3,
    shortName: 'Три',
    type: 'Контроль структуры',
    portfoliosCount: 0,
    verificationAutomationDate: '2024-10-30',
    mandatoryAutoAssignmentSettings: []
  },
  {
    id: 4,
    shortName: 'Четыре',
    type: 'Иной',
    portfoliosCount: 3,
    verificationAutomationDate: '2024-10-30',
    mandatoryAutoAssignmentSettings: []
  }
]
