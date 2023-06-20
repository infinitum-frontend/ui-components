// Сначала экспортируем наши типы, чтобы они были в приоритете над танстаковскими
export * from './types'
// @ts-expect-error
export * from '@tanstack/react-table'

export { default as Table } from './Table'
