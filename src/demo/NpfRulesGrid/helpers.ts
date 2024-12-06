import {
  TableColumnFiltersState,
  TableSelectOption,
  TableSortingState
} from '~/src/components/Table'
import { FundPurposeTypeEnum, NpfRule, PortfolioTypeEnum } from './types'

export function processIndicators({
  indicators,
  filters,
  sorting
}: {
  indicators: NpfRule[]
  filters: TableColumnFiltersState
  sorting: TableSortingState
}): NpfRule[] {
  const filteredIndicators = filterIndicators(indicators, filters)
  const sortedIndicators = sortIndicators(filteredIndicators, sorting)

  return sortedIndicators
}

type FilterKeys =
  | 'id'
  | 'shortName'
  | 'type'
  | 'mandatoryAutoAssignmentSettings'

function filterIndicators(
  rules: NpfRule[],
  filtersState: TableColumnFiltersState
): NpfRule[] {
  if (!filtersState?.length) {
    return rules
  }

  return rules.filter((rule) => {
    return filtersState.every((filter) => {
      const { filterType, value } = filter

      const filterId = filter.id as FilterKeys
      // Фильтр ID
      if (filterId === 'id' && filterType === 'search') {
        return filterById(rule, value)
      }
      // Фильтр Название
      if (filterId === 'shortName' && filterType === 'search') {
        return filterByShortName(rule, value)
      }
      // Фильтр Вид проверки
      if (filterId === 'type' && filterType === 'multiSelect') {
        return filterByType(rule, value)
      }
      // Фильтр Обязательное выполнение
      if (
        filterId === 'mandatoryAutoAssignmentSettings' &&
        filterType === 'multiSelect'
      ) {
        return filterByMandatorySettings(rule, value)
      }

      return true
    })
  })
}

function filterById(indicator: NpfRule, searchValue: string): boolean {
  return String(indicator.id).includes(String(searchValue))
}

function filterByShortName(indicator: NpfRule, searchValue: string): boolean {
  const searchString = [
    indicator.shortName,
    indicator.officialName,
    indicator.normativeAct
  ].join(' ')
  return searchString
    .toLocaleLowerCase()
    .includes(searchValue.toLocaleLowerCase())
}

function filterByType(
  indicator: NpfRule,
  selectedOptions: TableSelectOption[]
): boolean {
  return Boolean(
    selectedOptions.find((option) => option.value === indicator.type)
  )
}

function filterByMandatorySettings(
  indicator: NpfRule,
  selectedOptions: TableSelectOption[]
): boolean | undefined {
  const isUnmandatoryOptionSelected = Boolean(
    selectedOptions.find((option) => option.value === 'notMandatory')
  )

  const fundPurposeTypes = indicator.mandatoryAutoAssignmentSettings?.map(
    (setting) => setting.fundPurposeType
  )
  const portfolioTypes = indicator.mandatoryAutoAssignmentSettings?.map(
    (setting) => setting.portfolioType
  )

  const selectedFundPurposeTypes = selectedOptions
    .filter((option) =>
      Object.keys(FundPurposeTypeEnum).includes(String(option.value))
    )
    .map((option) => option.value)

  const selectedPortfolioTypes = selectedOptions
    .filter((option) =>
      Object.keys(PortfolioTypeEnum).includes(String(option.value))
    )
    .map((option) => option.value)

  const isMatchingFundPurpose = selectedFundPurposeTypes?.length
    ? fundPurposeTypes?.some((type) => selectedFundPurposeTypes.includes(type))
    : true

  const isMatchingPortfolioType = selectedPortfolioTypes?.length
    ? portfolioTypes?.some((type) => selectedPortfolioTypes.includes(type))
    : true

  const isMatchingUnmandatory =
    indicator.mandatoryAutoAssignmentSettings?.length === 0

  const isOnlyUnmandatoryOptionSelected =
    isUnmandatoryOptionSelected &&
    selectedFundPurposeTypes?.length === 0 &&
    selectedPortfolioTypes?.length === 0

  if (isOnlyUnmandatoryOptionSelected) {
    return isMatchingUnmandatory
  } else if (isUnmandatoryOptionSelected) {
    return (
      isMatchingUnmandatory ||
      (isMatchingFundPurpose && isMatchingPortfolioType)
    )
  } else {
    return isMatchingFundPurpose && isMatchingPortfolioType
  }
}

function sortIndicators(
  indicators: NpfRule[],
  sorting: TableSortingState
): NpfRule[] {
  if (!sorting?.length) {
    return indicators
  }

  let sortedIndicators = [...indicators]

  const sortingKey = sorting[0].id as keyof NpfRule
  const isDesc = sorting[0].desc
  const splittedByVerificationDateIndicators: {
    automated: NpfRule[]
    notAutomated: NpfRule[]
  } = {
    automated: [],
    notAutomated: []
  }

  switch (sortingKey) {
    case 'id':
    case 'portfoliosCount':
      sortedIndicators.sort((a, b) => {
        const result = Number(a[sortingKey]) - Number(b[sortingKey])
        return isDesc ? -result : result
      })
      break
    case 'shortName':
    case 'type':
      sortedIndicators.sort((a, b) => {
        const result = (a[sortingKey] || '').localeCompare(b[sortingKey] || '')
        return isDesc ? -result : result
      })
      break
    case 'verificationAutomationDate':
      sortedIndicators.forEach((indicator) => {
        if (indicator.verificationAutomationDate) {
          splittedByVerificationDateIndicators.automated.push(indicator)
        } else {
          splittedByVerificationDateIndicators.notAutomated.push(indicator)
        }
      })
      splittedByVerificationDateIndicators.automated.sort((a, b) => {
        const compareResult =
          new Date(a.verificationAutomationDate || '').getTime() -
          new Date(b.verificationAutomationDate || '').getTime()

        if (isDesc) {
          return compareResult ? 1 : -1
        } else {
          return compareResult ? -1 : 1
        }
      })
      sortedIndicators = [
        ...splittedByVerificationDateIndicators.automated,
        ...splittedByVerificationDateIndicators.notAutomated
      ]
      break
  }

  return sortedIndicators
}
