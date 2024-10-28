// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { createContext, useState, ReactNode, ReactElement } from 'react'

interface ThemePickerContextType {
  theme?: 'light' | 'dark'
  toggleTheme?: () => void
}

const defaultContext: ThemePickerContextType = {
  theme: 'light',
  toggleTheme: () => {}
}

export const ThemePickerContext =
  createContext<ThemePickerContextType>(defaultContext)

export const ThemePickerProvider = ({
  children
}: {
  children: ReactNode
}): ReactElement => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light') // Начальная тема

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemePickerContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemePickerContext.Provider>
  )
}
