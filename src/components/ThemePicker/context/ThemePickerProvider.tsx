// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  createContext,
  useState,
  ReactNode,
  ReactElement,
  useEffect
} from 'react'

export type ThemeVariant = 'light' | 'dark'

interface ThemePickerContextType {
  theme?: ThemeVariant
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
  const [theme, setTheme] = useState<ThemeVariant>(
    (localStorage.getItem('inf-ui-theme') as ThemeVariant) || 'light'
  )

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('inf-ui-theme-dark')
    } else {
      document.body.classList.remove('inf-ui-theme-dark')
    }
  }, [theme])

  const toggleTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light'
      localStorage.setItem('inf-ui-theme', newTheme)
      return newTheme
    })
  }

  return (
    <ThemePickerContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemePickerContext.Provider>
  )
}
