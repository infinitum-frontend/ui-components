import {
  TableColumnFiltersState,
  TableSortingState
} from '~/src/components/Table'
import { FundPurposeTypeEnum, NpfRule, PortfolioTypeEnum } from './types'
import dayjs from 'dayjs'

export function processIndicators({
  indicators,
  filters,
  sorting
}: {
  indicators: NpfRule[]
  filters: TableColumnFiltersState
  sorting: TableSortingState
}): NpfRule[] {
  console.log('process', filters, sorting)
  const filteredIndicators = filterIndicators(indicators, filters)
  const sortedIndicators = sortIndicators(filteredIndicators, sorting)

  return sortedIndicators
}

function filterIndicators(
  indicators: NpfRule[],
  filters: TableColumnFiltersState // по-хорошему тут не должно быть типа который относится к таблице
): NpfRule[] {
  if (!filters?.length) {
    return indicators
  }

  // @ts-expect-error
  const mandatoryAutoAssignmentSettings: string[] =
    filters.find((f) => f.id === 'mandatoryAutoAssignmentSettings')?.value || []

  const filtersObj = {
    id: filters.find((f) => f.id === 'id')?.value,
    shortName: filters.find((f) => f.id === 'shortName')?.value,
    isNotMandatory: mandatoryAutoAssignmentSettings.includes('notMandatory'),
    fundPurposeTypes: mandatoryAutoAssignmentSettings.filter((value) => {
      return [
        FundPurposeTypeEnum.PensionReserves,
        FundPurposeTypeEnum.PensionSavings,
        FundPurposeTypeEnum.OwnFunds
      ].includes(value as FundPurposeTypeEnum) // TODO: объединить со списком filterOptions в IndicatorsTable
    }),
    portfolioTypes: mandatoryAutoAssignmentSettings.filter((value) => {
      return [
        PortfolioTypeEnum.Aggregate,
        PortfolioTypeEnum.SelfManagement,
        PortfolioTypeEnum.TrustManagement
      ].includes(value as PortfolioTypeEnum) // TODO: объединить со списком filterOptions в IndicatorsTable
    })
  }

  console.log('filtersObj', filtersObj)

  const filteredIndicators: NpfRule[] = indicators.filter((indicator) => {
    const isMathchingId = filtersObj.id
      ? filterById(indicator, filtersObj.id as string)
      : true

    const isMatchingShortName = filtersObj.shortName
      ? filterByShortName(indicator, filtersObj.shortName as string)
      : true

    // const isMatchingFundPurpose = filtersObj.fundPurposeTypes?.length
    //   ? filterByFundPurposeType(indicator, filtersObj.fundPurposeTypes || [])
    //   : false

    return isMathchingId && isMatchingShortName

    // const isMatchingPortfolioType = filters.portfolioType?.length
    //   ? filterByPortfolioType(indicator, filters.portfolioType)
    //   : false

    // const isMatchingNotSetMandatory = filters.isUnmandatory
    //   ? !indicator.mandatoryAutoAssignmentSettings?.length
    //   : false
    // if (
    //   !filters.portfolioType?.length &&
    //   !filters.fundPurposeType?.length &&
    //   !filters.isUnmandatory
    // ) {
    //   return isMatchingShortName
    // }
    // return (
    //   isMatchingShortName &&
    //   (isMatchingFundPurpose ||
    //     isMatchingPortfolioType ||
    //     isMatchingNotSetMandatory)
    // )
  })

  return filteredIndicators
}

function filterByShortName(indicator: NpfRule, searchValue: string): boolean {
  return (indicator.shortName || '')
    .toLocaleLowerCase()
    .includes(searchValue.toLocaleLowerCase())
}

function filterById(indicator: NpfRule, searchValue: string): boolean {
  return String(indicator.id || '').includes(String(searchValue))
}

// function filterByFundPurposeType(
//   indicator: NpfRule,
//   fundPurposeFilter: FundPurposeTypeEnum[]
// ): boolean {
//   const getAvailableFundPurposeTypes = (
//     indicator: NpfRule
//   ): Record<FundPurposeTypeEnum, boolean> => {
//     const resultHash: Record<FundPurposeTypeEnum, boolean> = {
//       [FundPurposeTypeEnum.Unknown]: false,
//       [FundPurposeTypeEnum.PensionReserves]: false,
//       [FundPurposeTypeEnum.PensionSavings]: false,
//       [FundPurposeTypeEnum.Oef]: false,
//       [FundPurposeTypeEnum.OwnFunds]: false
//     }
//     indicator.mandatoryAutoAssignmentSettings?.forEach((i) => {
//       if (!resultHash[i.fundPurposeType]) {
//         resultHash[i.fundPurposeType] = true
//       }
//     })
//     return resultHash
//   }
//   const availableFundPurposeTypes = getAvailableFundPurposeTypes(indicator)
//   return Boolean(fundPurposeFilter.some((t) => availableFundPurposeTypes[t]))
// }

// function filterByPortfolioType(
//   indicator: NpfRule,
//   portfolioTypeFilter: PortfolioTypeEnum[]
// ): boolean {
//   const getAvailablePortfolioTypes = (
//     indicator: NpfRule
//   ): Record<PortfolioTypeEnum, boolean> => {
//     const resultHash: Record<PortfolioTypeEnum, boolean> = {
//       [PortfolioTypeEnum.Unknown]: false,
//       [PortfolioTypeEnum.TrustManagement]: false,
//       [PortfolioTypeEnum.SelfManagement]: false,
//       [PortfolioTypeEnum.Aggregate]: false
//     }
//     indicator.mandatoryAutoAssignmentSettings?.forEach((i) => {
//       if (!resultHash[i.portfolioType]) {
//         resultHash[i.portfolioType] = true
//       }
//     })
//     return resultHash
//   }
//   const availablePortfolioTypes = getAvailablePortfolioTypes(indicator)
//   return Boolean(portfolioTypeFilter.some((t) => availablePortfolioTypes[t]))
// }

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
        const compareResult = dayjs(a.verificationAutomationDate).isAfter(
          dayjs(b.verificationAutomationDate)
        )
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
