import React from 'react'
import { getFilteredGroupedOptions, getFlattenOptions } from '../utils/helpers'
import { UseSelectOptionsProps, UseSelectOptionsResult } from '../utils/types'

const useSelectOptions = ({
  options: optionsProp,
  filterable,
  filterValue,
  customFiltering
}: UseSelectOptionsProps): UseSelectOptionsResult => {
  const filtered = React.useMemo(() => {
    return filterable && filterValue && !customFiltering
      ? getFilteredGroupedOptions(optionsProp, filterValue)
      : optionsProp
  }, [filterValue, filterable, optionsProp])

  const filteredFlatten = React.useMemo(() => {
    return getFlattenOptions(filtered)
  }, [filterValue, filterable, filtered])

  const flatten = React.useMemo(() => {
    return getFlattenOptions(optionsProp)
  }, [filterValue, filterable, optionsProp])

  return {
    filteredFlattenOptions: filteredFlatten,
    filteredOptions: filtered,
    flattenOptions: flatten
  }
}

export default useSelectOptions
