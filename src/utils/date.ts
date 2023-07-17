export function getDaysInMonthCount(date: Date): number {
  const dateCopy = new Date(date)
  // берем следующий месяц, и сдвигаемся на день раньше, получая последний день нужного нам месяца
  dateCopy.setMonth(dateCopy.getMonth() + 1, 0)
  return dateCopy.getDate()
}

export function oneMonthAgo(date: Date): Date {
  date = new Date(date)
  const month = date.getMonth()
  date.setMonth(month - 1)
  // Handle when days in month are different
  if (date.getMonth() === month) {
    date.setDate(0)
  }
  return date
}

export function oneMonthAhead(date: Date): Date {
  date = new Date(date)
  const month = date.getMonth()
  date.setMonth(month + 1)
  // Handle when days in month are different
  if (date.getMonth() === (month + 2) % 12) {
    date.setDate(0)
  }
  return date
}

export function addYears(date: Date, numberOfYears: number): Date {
  date = new Date(date)
  const month = date.getMonth()
  date.setFullYear(date.getFullYear() + numberOfYears)
  // Handle Feb 29th for leap years
  if (date.getMonth() !== month) {
    date.setDate(0)
  }
  return date
}

export function oneYearAgo(date: Date): Date {
  return addYears(date, -1)
}

export function oneYearAhead(date: Date): Date {
  return addYears(date, 1)
}

export interface DayMatrixInfo {
  day?: number
  date: Date
  disabled?: boolean
}
// Получить по дате массив, состоящий из подмассивов с неделями, где элементами являются конкретные дни
export function getDaysMatrix(date: Date): DayMatrixInfo[][] {
  const activeYear = date.getFullYear()
  const activeMonth = date.getMonth()
  const firstDayInMonth = new Date(activeYear, activeMonth, 1)

  const daysInMonthCount = getDaysInMonthCount(date)
  const startIndex = firstDayInMonth.getDay() || 7
  let currentDay = 1 - startIndex
  const matrix = []
  for (let week = 0; week < 6 && currentDay < daysInMonthCount; week++) {
    matrix[week] = [] as any[]
    for (let day = 0; day < 7; day++) {
      currentDay++

      const date = new Date(activeYear, activeMonth, currentDay)
      if (currentDay < 1 || currentDay > daysInMonthCount) {
        matrix[week].push({
          disabled: true,
          date
        })

        continue
      }

      const day = date.getDate()

      matrix[week].push({
        day,
        date
      })
    }
  }

  return matrix
}

export function getMonthsList(): Array<{ name: string; number: number }> {
  const months = []
  for (let i = 0; i < 12; i++) {
    const date = new Date(0, i)
    months.push({
      name: date.toLocaleDateString('ru-Ru', { month: 'long' }),
      number: date.getMonth()
    })
  }

  return months
}

export function getYearsList(from = 1900, to = 2099): number[] {
  const matrix = []
  for (let i = from; i < to; i++) {
    matrix.push(i)
  }

  return matrix
}

export function parseLocalDateString(value: string): Date | undefined {
  const dateParts = value.split('.')
  if (dateParts.length !== 3) {
    return undefined
  }

  const [day, month, year] = dateParts.map(Number)

  return new Date(year, month - 1, day)
}

export function parseDate(value?: Date | string): string {
  if (value instanceof Date) {
    return value.toLocaleDateString()
  }

  return value || ''
}
