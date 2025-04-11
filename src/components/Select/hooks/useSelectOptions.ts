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
  }, [filterValue, filterable, optionsProp, customFiltering])

  const filteredFlatten = React.useMemo(() => {
    return getFlattenOptions(filtered)
  }, [filtered])

  const flatten = React.useMemo(() => {
    return getFlattenOptions(optionsProp)
  }, [optionsProp])

  return {
    filteredFlattenOptions: filteredFlatten,
    filteredOptions: filtered,
    flattenOptions: flatten
  }
}

export default useSelectOptions
