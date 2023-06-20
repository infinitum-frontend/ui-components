// Сначала экспортируем наши типы, чтобы они были в приоритете над танстаковскими
export type { OnChangeFn } from 'Utils/types'
export * from './types'
export * from '@tanstack/react-table'

export { default as Table } from './Table'
