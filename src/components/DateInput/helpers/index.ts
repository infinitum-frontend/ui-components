import { formatDateToISO, parseLocalDateString } from '@infinitum-ui/shared'

export function validate(value: string, min?: string, max?: string): boolean {
  if (value.length < 10) {
    return true
  }
  const date = parseLocalDateString(value)

  if (!date) {
    return false
  }

  const dateISO = formatDateToISO(date)

  if (min && dateISO < min) {
    return false
  }

  if (max && dateISO > max) {
    return false
  }

  return true
}
