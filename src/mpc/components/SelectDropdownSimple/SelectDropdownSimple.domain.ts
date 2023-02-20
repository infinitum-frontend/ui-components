import { notSetSelect } from '../../constants/domains.constants'

export interface ISelectDropdownOption {
  id: string
  value: string
}
export const resetId = notSetSelect // default,empty, not selected option id
export const stubOption: ISelectDropdownOption = { id: notSetSelect, value: '' }

export function getOptionById(
  id: string,
  options: ISelectDropdownOption[]
): ISelectDropdownOption {
  const findIndex = options.findIndex((option) => option.id === id)
  return findIndex !== -1 ? options[findIndex] : stubOption
}
