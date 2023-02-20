import React from 'react'
import { notSetSelect, notSetString } from '../../constants/domains.constants'

export interface ISelectDropdownOption {
  id: string
  value: string | React.ReactNode
}

export const stubOption: ISelectDropdownOption = {
  id: notSetSelect,
  value: notSetString
}

export function getOptionById(
  id: string,
  options: ISelectDropdownOption[]
): ISelectDropdownOption {
  const findIndex = options.findIndex((option) => option.id === id)
  return findIndex !== -1 ? options[findIndex] : stubOption
}
